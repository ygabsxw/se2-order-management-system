"use client";

import { useState } from "react";
import Link from "next/link";

type ProductType = "eletronico" | "perecivel" | "comum";

interface Product {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  tipo: ProductType;
  voltagem?: string;
  dataValidade?: string;
}

const mockProducts: Product[] = [
  { id: 1, nome: "Notebook Dell", preco: 3499.9, estoque: 5, tipo: "eletronico", voltagem: "110V/220V" },
  { id: 2, nome: "Smartphone Samsung", preco: 1899.9, estoque: 12, tipo: "eletronico", voltagem: "5V" },
  { id: 3, nome: "Leite Integral", preco: 5.49, estoque: 100, tipo: "perecivel", dataValidade: "2026-04-10" },
  { id: 4, nome: "Queijo Mussarela", preco: 32.9, estoque: 40, tipo: "perecivel", dataValidade: "2026-04-05" },
  { id: 5, nome: "Caderno Universitário", preco: 18.9, estoque: 60, tipo: "comum" },
  { id: 6, nome: "Caneta Esferográfica", preco: 3.5, estoque: 200, tipo: "comum" },
];

const typeConfig: Record<ProductType, { label: string; color: string; bg: string }> = {
  eletronico: { label: "Eletrônico", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  perecivel:  { label: "Perecível",  color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  comum:      { label: "Comum",      color: "text-stone-600", bg: "bg-stone-50 border-stone-200" },
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<ProductType | "todos">("todos");
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);

  const filtered = mockProducts.filter((p) => {
    const matchSearch = p.nome.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "todos" || p.tipo === filterType;
    return matchSearch && matchType;
  });

  const cartCount = cart.reduce((acc, i) => acc + i.qty, 0);

  // Retorna quantos itens do produto ainda estão disponíveis (estoque - quantidade no carrinho)
  function estoqueDisponivel(product: Product) {
    const inCart = cart.find((i) => i.product.id === product.id);
    return product.estoque - (inCart?.qty ?? 0);
  }

  function addToCart(product: Product) {
    // Bloqueia se não há estoque disponível
    if (estoqueDisponivel(product) <= 0) return;

    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
  }

  function removeFromCart(productId: number) {
    setCart((prev) =>
      prev
        .map((i) => i.product.id === productId ? { ...i, qty: i.qty - 1 } : i)
        .filter((i) => i.qty > 0) // remove do carrinho se qty chegar a 0
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-stone-800 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">O</span>
            </div>
            <span className="text-stone-800 font-semibold text-lg tracking-tight">OrderSystem</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-stone-800 font-medium text-sm border-b-2 border-stone-800 pb-0.5">Produtos</Link>
            <Link href="/orders" className="text-stone-500 hover:text-stone-800 text-sm transition-colors">Pedidos</Link>
            <Link href="/cart" className="relative flex items-center gap-2 bg-stone-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Carrinho
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight">Produtos</h1>
            <p className="text-stone-500 mt-1 text-sm">
              {filtered.length} produto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/products/new"
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Produto
          </Link>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="Buscar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300"
          />
          <div className="flex gap-2">
            {(["todos", "eletronico", "perecivel", "comum"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                  filterType === t
                    ? "bg-stone-800 text-white border-stone-800"
                    : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                }`}
              >
                {t === "todos" ? "Todos" : typeConfig[t].label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de produtos */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-stone-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-sm">Nenhum produto encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((product) => {
              const cfg = typeConfig[product.tipo];
              const inCart = cart.find((i) => i.product.id === product.id);
              const disponivelAgora = estoqueDisponivel(product);
              const semEstoque = disponivelAgora <= 0;

              return (
                <div key={product.id} className="bg-white rounded-xl border border-stone-200 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color} mb-2`}>
                        {cfg.label}
                      </span>
                      <h2 className="text-stone-800 font-semibold text-base leading-tight">{product.nome}</h2>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Link href={`/products/${product.id}/edit`} className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Detalhes */}
                  <div className="flex flex-col gap-1 text-xs text-stone-500">
                    {product.voltagem && <span>⚡ Voltagem: {product.voltagem}</span>}
                    {product.dataValidade && (
                      <span>📅 Validade: {new Date(product.dataValidade).toLocaleDateString("pt-BR")}</span>
                    )}
                    {/* Estoque disponível (desconta o que está no carrinho) */}
                    <span className={`font-medium ${disponivelAgora <= 0 ? "text-red-500" : disponivelAgora <= 5 ? "text-amber-500" : "text-emerald-600"}`}>
                      {disponivelAgora <= 0
                        ? "Sem estoque disponível"
                        : `${disponivelAgora} disponíve${disponivelAgora === 1 ? "l" : "is"} em estoque`}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-stone-100">
                    <span className="text-stone-800 font-bold text-lg">
                      {product.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                    <div className="flex items-center gap-2">
                      {/* Botão adicionar */}
                      <button
                        onClick={() => addToCart(product)}
                        disabled={semEstoque}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          semEstoque
                            ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                            : inCart
                            ? "bg-amber-100 text-amber-700 border border-amber-300 hover:bg-amber-200"
                            : "bg-stone-800 text-white hover:bg-stone-700"
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        {semEstoque ? "Esgotado" : inCart ? `No carrinho (${inCart.qty})` : "Adicionar"}
                      </button>
                      {/* Botão remover — só aparece se tiver no carrinho */}
                      {inCart && (
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                          {inCart.qty}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}