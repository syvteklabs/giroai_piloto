# Setup Giro AÍ - Supabase

## 1. Criar Projeto Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Clique em **+ New Project**
3. Preencha os dados do projeto
4. Aguarde a criação do projeto
5. Copie a **Project URL** e a **Anon Key** (em Settings > API)

## 2. Configurar Variáveis de Ambiente

### Local Development

Copie o arquivo de exemplo e edite com suas credenciais:
```bash
cp .env.local.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais Supabase:
```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

Você pode encontrar essas valores em:
- Supabase Dashboard > Settings > API
- Project URL: copie o valor de "Project URL"
- Anon Key: copie o valor de "anon" em "Project API keys"

### Vercel Deployment

No dashboard do Vercel:
1. Vá para o projeto
2. Clique em **Settings** > **Environment Variables**
3. Adicione as mesmas variáveis:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 3. Executar Migrations

Na Dashboard do Supabase:
1. Vá em **SQL Editor**
2. Clique em **+ New Query**
3. Cole o conteúdo de `supabase/migrations/001_initial_schema.sql`
4. Clique em **Run**

Ou execute localmente com:
```bash
supabase db push
```

## 4. Testar Localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000/cadastrar-estoque para testar o formulário de cadastro.

## Estrutura de Dados

### Empresas
- `id` (UUID)
- `nome` (texto)
- `email` (protegido, não apareça em queries públicas)
- `telefone` (protegido)
- `cidade` (pública, para mapa)
- `setor` (moda, outros)
- `created_at`

### Produtos Moda
- `id` (UUID)
- `empresa_id` (FK)
- `titulo`, `descricao`, `categoria`
- `quantidade`, `preco_minimo`, `preco_maximo`
- `imagem_url`
- `aprovado` (boolean)
- `created_at`

### Interesses
- `id` (UUID)
- `email` (protegido)
- `produto_id` (FK)
- `created_at`

### Registros Outros Setores
- `id` (UUID)
- `setor`, `tipo_estoque`, `quantidade_aproximada`, `faixa_valor`
- `cidade` (pública, para mapa)
- `dificuldade_principal`
- `interesse_expansao`
- `email_protegido`
- `created_at`
