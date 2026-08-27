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
git clone <repo>
cd giroai_piloto
npm install
```

### 2. Configurar Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Copie a URL e a chave anônima
4. Crie `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
   ```

### 3. Executar Migrations

Na Dashboard do Supabase:
1. Vá em **SQL Editor**
2. Crie uma nova query
3. Cole o conteúdo de `supabase/migrations/001_initial_schema.sql`
4. Execute

### 4. Iniciar Dev Server

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

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

### Build

```bash
npm run build
```

### Vercel

1. Conecte o repositório ao Vercel
2. Adicione as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy automático em cada push

```bash
git push origin claude/giro-ai-mvp-merco-ybd0tl
```

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
