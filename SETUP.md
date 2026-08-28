# Setup Giro AÍ - Supabase

## 1. Criar Projeto Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie novo projeto
3. Copie a URL do projeto e a chave anônima
4. Cole em `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
   ```

## 2. Executar Migrations

Na Dashboard do Supabase:
1. Vá em **SQL Editor**
2. Clique em **+ New Query**
3. Cole o conteúdo de `supabase/migrations/001_initial_schema.sql`
4. Clique em **Run**

Ou execute localmente com:
```bash
supabase db push
```

## 3. Variáveis de Ambiente

Após o setup, configure seu `.env.local`:
```bash
# Copie o arquivo de exemplo
cp .env.local.example .env.local

# Edite com suas credenciais Supabase
# Substitua os valores com sua URL e chave anônima
```

Se o arquivo `.env.local` não existir, você verá um erro:
```
Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.
```

Para resolver, crie o arquivo `.env.local` com as variáveis corretas.

## 4. Vercel Deploy

```bash
git push origin claude/giro-ai-mvp-merco-ybd0tl
```

No Vercel, configure as mesmas env vars do `.env.local`.

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
