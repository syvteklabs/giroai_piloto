-- ============================================================
-- GIRO AÍ - Schema Seguro com RLS e Dados Protegidos
-- ============================================================

-- Tabela de Empresas (dados públicos apenas)
create table public.empresas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  cidade text not null,
  setor text not null default 'moda',
  created_at timestamp with time zone default now()
);

-- Tabela de Contatos (dados privados)
create table public.contatos_empresas (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null unique references public.empresas(id) on delete cascade,
  email text not null unique,
  telefone text not null,
  created_at timestamp with time zone default now()
);

-- Tabela de Produtos (com aprovação)
create table public.produtos_moda (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  titulo text not null,
  descricao text,
  categoria text not null,
  quantidade integer not null,
  preco_minimo numeric,
  preco_maximo numeric,
  imagem_url text,
  aprovado boolean default false,
  created_at timestamp with time zone default now()
);

-- Tabela de Interesses (contatos protegidos)
create table public.interesses (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  produto_id uuid not null references public.produtos_moda(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(email, produto_id)
);

-- Tabela de Outros Setores (pesquisa de expansão)
create table public.registros_outros_setores (
  id uuid primary key default gen_random_uuid(),
  setor text not null,
  tipo_estoque text not null,
  quantidade_aproximada text,
  faixa_valor text,
  cidade text not null,
  dificuldade_principal text,
  interesse_expansao boolean default false,
  email_protegido text not null,
  created_at timestamp with time zone default now()
);

-- ============================================================
-- ÍNDICES
-- ============================================================

create index idx_produtos_empresa on public.produtos_moda(empresa_id);
create index idx_produtos_categoria on public.produtos_moda(categoria);
create index idx_produtos_aprovado on public.produtos_moda(aprovado);
create index idx_interesses_produto on public.interesses(produto_id);
create index idx_empresas_cidade on public.empresas(cidade);
create index idx_outros_setores_cidade on public.registros_outros_setores(cidade);
create index idx_contatos_empresa on public.contatos_empresas(empresa_id);
create index idx_contatos_email on public.contatos_empresas(email);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Empresas: SELECT público (dados não sensíveis)
alter table public.empresas enable row level security;
create policy "SELECT público empresas" on public.empresas
  for select using (true);

-- Contatos: NÃO permitir SELECT público
alter table public.contatos_empresas enable row level security;
-- Nenhuma política de SELECT pública (padrão: DENY)
-- INSERT será feito via RPC apenas

-- Produtos: SELECT público apenas aprovados
alter table public.produtos_moda enable row level security;
create policy "SELECT produtos aprovados" on public.produtos_moda
  for select using (aprovado = true);
-- INSERT será feito via RPC apenas

-- Interesses: INSERT público, nenhum SELECT público
alter table public.interesses enable row level security;
create policy "INSERT interesse público" on public.interesses
  for insert with check (true);
-- Nenhuma política de SELECT pública

-- Outros Setores: INSERT público, nenhum SELECT público
alter table public.registros_outros_setores enable row level security;
create policy "INSERT outros setores público" on public.registros_outros_setores
  for insert with check (true);
-- Nenhuma política de SELECT pública

-- ============================================================
-- FUNÇÃO RPC: Cadastro Seguro de Empresa + Produto
-- ============================================================

create or replace function cadastrar_empresa_com_produto(
  p_nome_empresa text,
  p_email text,
  p_telefone text,
  p_cidade text,
  p_titulo text,
  p_descricao text,
  p_categoria text,
  p_quantidade integer,
  p_preco_minimo numeric,
  p_preco_maximo numeric
)
returns jsonb as $$
declare
  v_empresa_id uuid;
  v_produto_id uuid;
  v_email_exists boolean;
begin
  -- Validar campos obrigatórios
  if p_nome_empresa is null or p_nome_empresa = '' then
    return jsonb_build_object('sucesso', false, 'erro', 'Nome da empresa obrigatório');
  end if;

  if p_email is null or p_email = '' then
    return jsonb_build_object('sucesso', false, 'erro', 'Email obrigatório');
  end if;

  if p_telefone is null or p_telefone = '' then
    return jsonb_build_object('sucesso', false, 'erro', 'Telefone obrigatório');
  end if;

  if p_cidade is null or p_cidade = '' then
    return jsonb_build_object('sucesso', false, 'erro', 'Cidade obrigatória');
  end if;

  if p_titulo is null or p_titulo = '' then
    return jsonb_build_object('sucesso', false, 'erro', 'Título do produto obrigatório');
  end if;

  if p_categoria is null or p_categoria = '' then
    return jsonb_build_object('sucesso', false, 'erro', 'Categoria obrigatória');
  end if;

  if p_quantidade <= 0 then
    return jsonb_build_object('sucesso', false, 'erro', 'Quantidade deve ser maior que 0');
  end if;

  -- Verificar email duplicado
  select exists(
    select 1 from public.contatos_empresas where email = p_email
  ) into v_email_exists;

  if v_email_exists then
    return jsonb_build_object('sucesso', false, 'erro', 'Email já cadastrado');
  end if;

  -- Iniciar transação
  begin
    -- 1. Criar empresa
    insert into public.empresas (nome, cidade, setor)
    values (p_nome_empresa, p_cidade, 'moda')
    returning id into v_empresa_id;

    -- 2. Criar contato (protegido)
    insert into public.contatos_empresas (empresa_id, email, telefone)
    values (v_empresa_id, p_email, p_telefone);

    -- 3. Criar produto (aprovado = false por padrão)
    insert into public.produtos_moda (
      empresa_id,
      titulo,
      descricao,
      categoria,
      quantidade,
      preco_minimo,
      preco_maximo,
      aprovado
    )
    values (
      v_empresa_id,
      p_titulo,
      p_descricao,
      p_categoria,
      p_quantidade,
      p_preco_minimo,
      p_preco_maximo,
      false
    )
    returning id into v_produto_id;

    -- Retornar sucesso (sem email ou telefone)
    return jsonb_build_object(
      'sucesso', true,
      'empresa_id', v_empresa_id,
      'produto_id', v_produto_id,
      'mensagem', 'Cadastro recebido! Analisaremos em breve.'
    );

  exception when unique_violation then
    return jsonb_build_object('sucesso', false, 'erro', 'Email já cadastrado');
  exception when others then
    return jsonb_build_object(
      'sucesso', false,
      'erro', 'Erro ao processar cadastro. Tente novamente.'
    );
  end;
end;
$$ language plpgsql security definer;

-- ============================================================
-- FUNÇÃO RPC: Registrar Interesse em Produto
-- ============================================================

create or replace function registrar_interesse_produto(
  p_email text,
  p_produto_id uuid
)
returns jsonb as $$
declare
  v_produto_existe boolean;
begin
  -- Validar email
  if p_email is null or p_email = '' then
    return jsonb_build_object('sucesso', false, 'erro', 'Email obrigatório');
  end if;

  -- Validar produto existe e está aprovado
  select exists(
    select 1 from public.produtos_moda
    where id = p_produto_id and aprovado = true
  ) into v_produto_existe;

  if not v_produto_existe then
    return jsonb_build_object('sucesso', false, 'erro', 'Produto não encontrado');
  end if;

  begin
    insert into public.interesses (email, produto_id)
    values (p_email, p_produto_id);

    return jsonb_build_object(
      'sucesso', true,
      'mensagem', 'Interesse registrado! Você receberá contato em breve.'
    );
  exception when unique_violation then
    return jsonb_build_object(
      'sucesso', true,
      'mensagem', 'Interesse já registrado anteriormente.'
    );
  exception when others then
    return jsonb_build_object(
      'sucesso', false,
      'erro', 'Erro ao registrar interesse. Tente novamente.'
    );
  end;
end;
$$ language plpgsql security definer;
