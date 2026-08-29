interface ProductCardProps {
  titulo: string;
  descricao: string;
  categoria: string;
  quantidade: number;
  preco_minimo: number;
  preco_maximo: number;
  imagem_url: string;
  onInterest?: () => void;
}

export default function ProductCard({
  titulo,
  descricao,
  categoria,
  quantidade,
  preco_minimo,
  preco_maximo,
  imagem_url,
  onInterest
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Imagem */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-100">
        <img
          src={imagem_url}
          alt={titulo}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {categoria}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          {titulo}
        </h3>

        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {descricao}
        </p>

        {/* Preço e Quantidade */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600">Quantidade:</span>
            <span className="font-semibold text-slate-900">
              {quantidade} peças
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600 text-sm">Faixa de Preço:</span>
            <span className="font-bold text-blue-600 text-lg">
              R$ {preco_minimo} - R$ {preco_maximo}
            </span>
          </div>
        </div>

        {/* Botão */}
        <button
          onClick={onInterest}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Tenho Interesse
        </button>
      </div>
    </div>
  );
}
