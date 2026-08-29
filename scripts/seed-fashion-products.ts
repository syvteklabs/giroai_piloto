import { createClient } from '@supabase/supabase-js';
import { fashionProducts } from '../lib/seed-fashion-products';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function seedFashionProducts() {
  console.log('🚀 Iniciando seed de produtos de moda...');

  try {
    // 1. Criar ou obter empresa padrão
    console.log('📦 Criando empresa padrão...');

    const { data: empresaExistente } = await supabase
      .from('empresas')
      .select('id')
      .eq('email', 'loja@fashioncatalog.com')
      .single();

    let empresaId: string;

    if (empresaExistente) {
      empresaId = empresaExistente.id;
      console.log('✅ Empresa padrão encontrada:', empresaId);
    } else {
      const { data: novaEmpresa, error: empresaError } = await supabase
        .from('empresas')
        .insert({
          nome: 'Fashion Catalog Store',
          email: 'loja@fashioncatalog.com',
          telefone: '(11) 98765-4321',
          cidade: 'São Paulo',
          setor: 'moda'
        })
        .select()
        .single();

      if (empresaError) throw empresaError;
      empresaId = novaEmpresa.id;
      console.log('✅ Empresa criada com sucesso:', empresaId);
    }

    // 2. Limpar produtos antigos (opcional)
    console.log('🗑️  Removendo produtos antigos da loja...');
    const { error: deleteError } = await supabase
      .from('produtos_moda')
      .delete()
      .eq('empresa_id', empresaId);

    if (deleteError) throw deleteError;

    // 3. Inserir novos produtos
    console.log('📝 Inserindo 12 produtos de moda...');

    const produtosComEmpresa = fashionProducts.map(produto => ({
      ...produto,
      empresa_id: empresaId,
      aprovado: true
    }));

    const { data: produtosInseridos, error: insertError } = await supabase
      .from('produtos_moda')
      .insert(produtosComEmpresa)
      .select();

    if (insertError) throw insertError;

    console.log(`✅ ${produtosInseridos.length} produtos inseridos com sucesso!`);
    console.log('\n📋 Produtos inseridos:');
    produtosInseridos.forEach((p, i) => {
      console.log(`${i + 1}. ${p.titulo} - ${p.quantidade} peças - R$ ${p.preco_minimo}-${p.preco_maximo}`);
    });

    console.log('\n✨ Seed concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao fazer seed:', error);
    process.exit(1);
  }
}

seedFashionProducts();
