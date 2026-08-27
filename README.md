# Giro AÍ - MVP Merco Noroeste 2026

**Inteligência que faz o estoque girar.**

Transforme estoque parado em oportunidades comerciais. Plataforma de validação para a Merco Noroeste 2026.

## 🎯 Objetivo

Validar durante o piloto:
1. Quantas empresas possuem estoque parado
2. Quais categorias concentram esse problema
3. Em quais municípios o problema aparece
4. Quais lojistas de moda desejam publicar produtos
5. Quais outros setores querem participar de uma futura expansão
6. Se existem interesses comerciais entre participantes

## 🏗️ Stack

- **Frontend:** Next.js 15 + TypeScript + Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth)
- **Mapa:** Leaflet + OpenStreetMap
- **Validação:** Zod
- **Ícones:** Lucide React
- **Deploy:** Vercel

## 📋 Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Landing page |
| `/participar` | Escolha de jornada (Moda / Outros Setores) |
| `/cadastrar-estoque` | Cadastro de produtos (Moda) |
| `/outros-setores` | Pesquisa de interesse em expansão |
| `/oportunidades` | Vitrine de produtos aprovados |
| `/mapa` | Mapa agregado por município |
| `/privacidade` | Política de privacidade |

## 🚀 Setup Local

### 1. Clonar e Instalar

```bash
git clone https://github.com/syvteklabs/giroai_piloto
cd giroai_piloto
npm install
```

### 2. Configurar Supabase

**A. Criar Projeto**

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto (anote a senha postgres)
3. Após criado, vá em **Project Settings → API**
4. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**B. Configurar Variáveis Localmente**

Crie `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://seu-id-aqui.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

### 3. Executar Migrations

**No SQL Editor do Supabase:**

1. Vá em **SQL Editor** → **+ New Query**
2. **Primeira execução:** Cole todo o conteúdo de `supabase/migrations/001_initial_schema.sql`
3. Execute (clique no play ou Ctrl+Enter)
4. **Segunda execução:** Cole todo o conteúdo de `supabase/migrations/002_schema_seguro.sql`
5. Execute

**Resultado esperado:**
- ✓ 5 tabelas criadas (empresas, contatos_empresas, produtos_moda, interesses, registros_outros_setores)
- ✓ 2 funções RPC criadas (cadastrar_empresa_com_produto, registrar_interesse_produto)
- ✓ RLS ativado em todas as tabelas

### 4. Iniciar Dev Server

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

**Pronto!** Agora você pode testar os formulários localmente. Os dados serão salvos em seu projeto Supabase.

## 🔐 Segurança e Privacidade

- ✅ Dados de contato **nunca aparecem publicamente**
- ✅ Mapa exibe **apenas agregações por município**
- ✅ Validação de dados no servidor (Zod)
- ✅ RLS (Row Level Security) no Supabase
- ✅ Sem analytics de dados pessoais
- ✅ Consentimento para contato obrigatório

### O que é Público

- Número agregado de empresas por município
- Quantidade agregada de produtos por município
- Categorias de moda presentes
- Setores interessados em expansão

### O que é Privado

- Email, telefone, nome (nunca publicados)
- Registros de interesse em produtos (banco apenas)
- Formulários de outros setores (banco apenas)

## 📊 Estrutura de Dados

```
empresas
├── id, nome, email, telefone, cidade, setor

produtos_moda
├── id, empresa_id, titulo, descricao, categoria
├── quantidade, preco_minimo, preco_maximo
├── imagem_url, aprovado, created_at

interesses
├── id, email (protegido), produto_id, created_at

registros_outros_setores
├── id, setor, tipo_estoque, quantidade_aproximada
├── faixa_valor, cidade, dificuldade_principal
├── interesse_expansao, email_protegido, created_at
```

## 🎨 Design

- **Cores:**
  - Grafite: `#101418`
  - Vermelho: `#F51B2B`
  - Turquesa: `#10BFB5`
  - Fundo claro: `#F6F8F9`

- **Responsive:** Mobile-first
- **Idioma:** Português do Brasil
- **Acessibilidade:** Básica (labels, contraste, focus states)

## 📦 Build e Deploy

### Build Local

```bash
npm run build
```

**Resultado esperado:**
- ✓ Compila sem erros
- ✓ 8 rotas pré-renderizadas
- ✓ Pronto para produção

### Deploy em Vercel

**Passo 1: Conectar Repositório**

1. Acesse [vercel.com](https://vercel.com)
2. Clique **Add New → Project**
3. Selecione repositório: `syvteklabs/giroai_piloto`
4. Selecione branch: `main`

**Passo 2: Configurar Variáveis de Ambiente**

No Vercel, vá em **Settings → Environment Variables** e adicione:

```
NEXT_PUBLIC_SUPABASE_URL = https://seu-id-aqui.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = sua-chave-anonima-aqui
```

**Importante:** Configure em **todos os ambientes**:
- ✓ Production
- ✓ Preview
- ✓ Development

**Passo 3: Deploy**

```bash
git push origin main
```

Vercel faz deploy automático. Acesse seu projeto em `https://seu-projeto.vercel.app`

### Variáveis Necessárias

| Variável | Origem | Exemplo |
|----------|--------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API | `https://xyzabc123.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API | `eyJhbGc...` (chave pública) |

**⚠️ NUNCA use `SUPABASE_SERVICE_ROLE_KEY` no navegador!**

## 🧪 Teste

```bash
npm run build  # Validar build
npm run dev    # Testar localmente
```

## 📝 Notas

- Este é um piloto privado Merco Noroeste 2026
- Funcionalidade de aprovação de produtos ainda manual (via Supabase Dashboard)
- Analytics básica futura (sem dados pessoais)
- Expansão para outros setores depende da validação inicial de moda

## 📞 Contato

Durante o piloto, entre em contato com a equipe Merco para questões sobre dados e privacidade.
