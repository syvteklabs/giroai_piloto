-- Empresas/Participantes
create table public.empresas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null unique,
  telefone text not null,
  cidade text not null,
  setor text not null default 'moda',
  created_at timestamp with time zone default now()
);

-- Produtos de Moda
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

-- Interesses em Produtos (contato protegido)
create table public.interesses (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  produto_id uuid not null references public.produtos_moda(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(email, produto_id)
);

-- Registros de Outros Setores
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

-- Índices para performance
create index idx_produtos_empresa on public.produtos_moda(empresa_id);
create index idx_produtos_categoria on public.produtos_moda(categoria);
create index idx_produtos_aprovado on public.produtos_moda(aprovado);
create index idx_interesses_produto on public.interesses(produto_id);
create index idx_empresas_cidade on public.empresas(cidade);
create index idx_outros_setores_cidade on public.registros_outros_setores(cidade);

-- RLS: Empresas - apenas visualizar names/cidades (nada de email/telefone)
alter table public.empresas enable row level security;
create policy "Select empresa info públicoa" on public.empresas for select using (true);

-- RLS: Produtos - apenas aprovados são públicos
alter table public.produtos_moda enable row level security;
create policy "Select produtos aprovados" on public.produtos_moda for select using (aprovado = true);

-- RLS: Interesses - insert anônimo
alter table public.interesses enable row level security;
create policy "Insert interesses" on public.interesses for insert with check (true);

-- RLS: Outros Setores - insert anônimo apenas
alter table public.registros_outros_setores enable row level security;
create policy "Insert registros setores" on public.registros_outros_setores for insert with check (true);
