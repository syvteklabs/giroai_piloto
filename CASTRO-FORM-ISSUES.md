# Problemas Identificados - Formulário de Cadastro de Estoque

## 🔴 CRÍTICOS (Devem ser corrigidos antes do launch)

Nenhum problema crítico identificado.

---

## 🟡 ALERTA (Recomendado corrigir)

### 1. **Validação de Range de Preços** (Prioridade: MÉDIA)

**Problema:**
- Atual: Aceita `preco_minimo: 100` e `preco_maximo: 50`
- Esperado: Rejeitar quando mínimo > máximo

**Arquivo:** `/lib/validations.ts`

**Solução:**
```typescript
export const cadastroEstoqueSchema = z.object({
  // ... outros campos
  preco_minimo: z.number().min(0, 'Preço mínimo obrigatório'),
  preco_maximo: z.number().min(0, 'Preço máximo obrigatório'),
}).refine(
  (data) => data.preco_minimo <= data.preco_maximo,
  {
    message: 'Preço mínimo não pode ser maior que máximo',
    path: ['preco_maximo']
  }
)
```

**Impacto:** Médio - Lógica de negócio

---

### 2. **Validação de Telefone Melhorada** (Prioridade: BAIXA)

**Problema:**
- Atual: Aceita qualquer string com 10+ caracteres
- Esperado: Validar padrão brasileiro

**Arquivo:** `/lib/validations.ts`

**Teste Atual:**
```
"(89) 99999-9999" ✅ Válido
"abcdefghij1234" ✅ Válido (Deveria ser ❌)
```

**Solução Recomendada:**
```typescript
telefone: z.string()
  .min(10, 'Telefone deve ter pelo menos 10 dígitos')
  .regex(
    /^[\d\s()+-]*\d[\d\s()+-]*$/,
    'Telefone deve conter apenas dígitos, espaços, parênteses ou hífens'
  )
```

**Impacto:** Baixo - Será validado melhor no backend/DB

---

### 3. **Potencial Memory Leak no Timeout** (Prioridade: BAIXA)

**Problema:**
- Linha 106: `setTimeout(() => setSuccess(false), 5000)`
- Se componente desmontar antes do timeout, erro potencial

**Arquivo:** `/app/cadastrar-estoque/page.tsx`

**Solução:**
```typescript
useEffect(() => {
  if (!success) return

  const timer = setTimeout(() => setSuccess(false), 5000)
  return () => clearTimeout(timer)
}, [success])
```

**Impacto:** Baixo - Não causa bug visível, mas melhor prática

---

### 4. **Feedback Pós-Sucesso Melhorado** (Prioridade: BAIXA)

**Problema:**
- Mensagem desaparece após 5s
- Usuário pode não perceber que foi enviado
- Sem próximos passos

**Opções de Solução:**
1. Redirecionar para `/oportunidades`
2. Manter mensagem com botão "Novo Cadastro" / "Ver Oportunidades"
3. Ambos

**Recomendação:**
```typescript
// Após sucesso:
setTimeout(() => {
  router.push('/oportunidades')
}, 2000)
```

**Impacto:** Baixo - Melhor UX

---

## 🟢 INFORMAÇÕES (Está tudo bem, apenas FYI)

### ✅ Segurança de Dados
- Dados sensíveis (email, telefone) nunca expostos publicamente
- Apenas agregações no mapa
- RLS (Row Level Security) implementado

### ✅ Validação Robusta
- Zod valida todos os campos
- Erro mapeado aos campos específicos
- Mensagens descritivas

### ✅ UX Responsiva
- Funciona em mobile, tablet, desktop
- Feedback visual claro (loading, sucesso, erro)
- Acessibilidade básica OK

### ✅ Design Coerente
- Cores seguem identidade visual
- Ícones apropriados (CheckCircle, AlertCircle, Loader)
- Tipografia consistente

---

## 📊 Resumo de Ação

| Problema | Prioridade | Esforço | Status |
|----------|-----------|--------|--------|
| Validação preco_min ≤ preco_max | MÉDIA | 5min | 🔧 TODO |
| Validação telefone com regex | BAIXA | 10min | 🔧 TODO |
| Cleanup timeout (useEffect) | BAIXA | 10min | 🔧 TODO |
| Feedback pós-sucesso (redirect) | BAIXA | 15min | 🔧 TODO |

---

## 🚀 Recomendação Final

**O formulário está FUNCIONAL e pronto para teste em produção, mas recomenda-se:**

1. **Antes de Launch:**
   - ✅ Corrigir validação de preços (MÉDIA prioridade)
   - ⭕ Considerar melhorias de UX (BAIXA prioridade)

2. **Depois de Launch:**
   - Monitorar erros via logging
   - Coletar feedback de usuários
   - Implementar melhorias iterativamente

---

**Data:** 28 de Agosto de 2026  
**Testado por:** Claude Code  
**Ambiente:** Next.js 16 + Supabase + TypeScript

