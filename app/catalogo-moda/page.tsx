'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';

interface Produto {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  quantidade: number;
  preco_minimo: number;
  preco_maximo: number;
  imagem_url: string;
}

export default function CatalogoProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('');

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const fetchProdutos = async () => {
      try {
        let query = supabase
          .from('produtos_moda')
          .select('*')
          .eq('aprovado', true)
          .order('created_at', { ascending: false });

        if (filtroCategoria) {
          query = query.eq('categoria', filtroCategoria);
        }

        const { data, error } = await query;

        if (error) throw error;
        setProdutos(data || []);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, [filtroCategoria]);

  const categorias = [...new Set(produtos.map(p => p.categoria))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando catálogo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Catálogo de Moda</h1>
              <p className="text-slate-600 mt-1">Descubra nossa coleção exclusiva</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
            >
              Voltar
            </Link>
          </div>

          {/* Filtro por Categoria */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFiltroCategoria('')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filtroCategoria === ''
                  ? 'bg-primary text-white'
                  : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
              }`}
            >
              Todos ({produtos.length})
            </button>
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => setFiltroCategoria(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filtroCategoria === cat
                    ? 'bg-primary text-white'
                    : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de Produtos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {produtos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">Nenhum produto encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtos.map(produto => (
              <div
                key={produto.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Imagem */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                  <img
                    src={produto.imagem_url}
                    alt={produto.titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {produto.categoria}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {produto.titulo}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {produto.descricao}
                  </p>

                  {/* Preço e Quantidade */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Quantidade:</span>
                      <span className="font-semibold text-slate-900">
                        {produto.quantidade} peças
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm">Faixa de Preço:</span>
                      <span className="font-bold text-primary text-lg">
                        R$ {produto.preco_minimo} - R$ {produto.preco_maximo}
                      </span>
                    </div>
                  </div>

                  {/* Botão */}
                  <button className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition">
                    Tenho Interesse
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">{produtos.length}</div>
              <p className="text-slate-600 mt-2">Produtos Disponíveis</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">{categorias.length}</div>
              <p className="text-slate-600 mt-2">Categorias</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                {produtos.reduce((acc, p) => acc + p.quantidade, 0)}
              </div>
              <p className="text-slate-600 mt-2">Peças em Estoque</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
