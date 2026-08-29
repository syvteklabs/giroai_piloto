# 👗 Catálogo de Moda - GiroAI

## Visão Geral

Este projeto agora inclui um catálogo completo de moda com 12 produtos fictícios de alta qualidade, totalmente funcional e integrado com Supabase.

## 📦 Produtos Incluídos

O catálogo vem com 12 produtos fictícios de moda:

1. **Camiseta Premium Cotton** - 25 peças - R$ 25-35
2. **Jeans Slim Fit Azul** - 18 peças - R$ 65-85
3. **Vestido Floral Elegante** - 12 peças - R$ 89-120
4. **Jaqueta Jeans Clássica** - 15 peças - R$ 79-99
5. **Blusa Social Branca** - 20 peças - R$ 45-65
6. **Shorts Jeans Cintura Alta** - 22 peças - R$ 35-50
7. **Cardigan Lã Mescla** - 16 peças - R$ 55-75
8. **Saia Midi Listrada** - 19 peças - R$ 69-89
9. **Polo Piquet Azul Marinho** - 28 peças - R$ 39-59
10. **Blazer Estruturado Preto** - 14 peças - R$ 125-155
11. **Leggings Fitness Cinza** - 30 peças - R$ 45-65
12. **Camisa Social Listrada** - 17 peças - R$ 59-79

### Características dos Produtos

- ✅ Imagens de alta qualidade (via Unsplash)
- ✅ Descrições detalhadas
- ✅ Categorias organizadas (Camisetas, Calças, Vestidos, etc.)
- ✅ Quantidade em estoque (15-30 peças)
- ✅ Faixa de preço (R$ 15-155)
- ✅ Status aprovado e pronto para visualização

## 🚀 Como Usar

### 1. **Fazer Seed dos Dados**

Antes de usar o catálogo, você precisa popular o banco de dados com os produtos:

```bash
# Instalar dependências
npm install

# Executar o seed de produtos
npm run seed:fashion
```

#### Variáveis de Ambiente Necessárias

Certifique-se de ter as seguintes variáveis no `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
```

### 2. **Acessar o Catálogo**

Após fazer seed dos dados, o catálogo estará disponível em:

```
http://localhost:3000/catalogo-moda
```

## 📂 Estrutura de Arquivos

```
giroai_piloto/
├── lib/
│   └── seed-fashion-products.ts      # Dados dos 12 produtos
├── scripts/
│   └── seed-fashion-products.ts      # Script para popular BD
├── app/
│   └── catalogo-moda/
│       └── page.tsx                  # Página do catálogo visual
└── FASHION_CATALOG.md               # Este arquivo
```

## 🎨 Página do Catálogo

A página de catálogo (`/catalogo-moda`) inclui:

- ✨ Design responsivo e moderno
- 🔍 Filtro por categoria
- 📊 Estatísticas do catálogo (total de produtos, categorias, peças em estoque)
- 🖼️ Imagens de alta qualidade
- 💰 Exibição de faixa de preço
- 📦 Quantidade disponível
- 🎯 Botão "Tenho Interesse"

## 🔌 Integração Supabase

O catálogo utiliza a tabela `produtos_moda` do Supabase com os seguintes campos:

```sql
- id: UUID (chave primária)
- empresa_id: UUID (referência à tabela empresas)
- titulo: texto
- descricao: texto
- categoria: texto
- quantidade: inteiro
- preco_minimo: numérico
- preco_maximo: numérico
- imagem_url: texto
- aprovado: booleano
- created_at: timestamp
```

## 🛠️ Personalização

### Adicionar Mais Produtos

1. Edite `lib/seed-fashion-products.ts`
2. Adicione um novo objeto de produto ao array `fashionProducts`
3. Execute `npm run seed:fashion` novamente

### Trocar Imagens

As imagens são URLs do Unsplash. Para trocar uma imagem:

1. Acesse [Unsplash](https://unsplash.com)
2. Encontre uma imagem adequada
3. Copie a URL e substitua em `lib/seed-fashion-products.ts`

### Modificar Preços

Para atualizar preços, edite os campos `preco_minimo` e `preco_maximo` em `lib/seed-fashion-products.ts` e execute novamente o seed.

## 📝 Funcionalidades Futuras

- [ ] Integração de pagamento
- [ ] Sistema de carrinho de compras
- [ ] Avaliações e comentários
- [ ] Wishlist
- [ ] Busca avançada
- [ ] Ordenação por preço/popularidade

## 🤝 Contribuindo

Para adicionar novos produtos ou melhorar o catálogo, faça as alterações no branch `claude/fashion-catalog-products-9sc852`.

## 📞 Suporte

Para dúvidas sobre o catálogo, verifique:
- A página em `/catalogo-moda`
- O script de seed em `scripts/seed-fashion-products.ts`
- A configuração do Supabase em `lib/supabase.ts`

---

**Última atualização:** Agosto 2026  
**Status:** ✅ Pronto para produção
