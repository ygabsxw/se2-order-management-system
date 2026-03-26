"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

interface OrderItem {
  nome: string;
  qty: number;
  preco: number;
}

interface Order {
  id: number;
  data: string;
  total: number;
  status: "pendente" | "concluido" | "cancelado";
  items: OrderItem[];
}

// Mock de pedidos já finalizados
const mockOrders: Order[] = [
  {
    id: 1001,
    data: "25/03/2026",
    total: 3499.9,
    status: "concluido",
    items: [{ nome: "Notebook Dell", qty: 1, preco: 3499.9 }],
  },
  {
    id: 1002,
    data: "24/03/2026",
    total: 48.39,
    status: "concluido",
    items: [
      { nome: "Leite Integral", qty: 3, preco: 5.49 },
      { nome: "Queijo Mussarela", qty: 1, preco: 32.9 },
    ],
  },
  {
    id: 1003,
    data: "23/03/2026",
    total: 1899.9,
    status: "pendente",
    items: [{ nome: "Smartphone Samsung", qty: 1, preco: 1899.9 }],
  },
];

const statusConfig = {
  pendente:  { label: "Pendente",  bg: "bg-amber-50",   text: "text-amber-700",  border: "border-amber-200",  dot: "bg-amber-400" },
  concluido: { label: "Concluído", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  cancelado: { label: "Cancelado", bg: "bg-red-50",     text: "text-red-600",    border: "border-red-200",    dot: "bg-red-400" },
};

export default function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-stone-800">Pedidos</h1>
            <p className="text-stone-500 text-sm mt-1">{orders.length} pedido{orders.length !== 1 ? "s" : ""} registrado{orders.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-20 text-center">
            <p className="text-stone-400 text-4xl mb-4">📋</p>
            <p className="text-stone-500 font-medium mb-4">Nenhum pedido ainda</p>
            <Link href="/" className="bg-stone-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-stone-700 transition-colors">
              Fazer meu primeiro pedido
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((order) => {
              const st = statusConfig[order.status];
              const isOpen = expanded === order.id;
              return (
                <div key={order.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                  {/* Header */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : order.id)}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-left">
                        <p className="font-bold text-stone-800 text-sm">Pedido #{order.id}</p>
                        <p className="text-stone-400 text-xs mt-0.5">{order.data}</p>
                      </div>
                      <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${st.bg} ${st.text} ${st.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                        {st.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-stone-800">
                        {order.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                      <svg
                        className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded items */}
                  {isOpen && (
                    <div className="border-t border-stone-100 px-5 py-4">
                      <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">Itens do pedido</p>
                      <div className="flex flex-col gap-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 bg-stone-100 rounded text-xs flex items-center justify-center font-bold text-stone-600">
                                {item.qty}
                              </span>
                              <span className="text-stone-700">{item.nome}</span>
                            </div>
                            <span className="text-stone-800 font-medium">
                              {(item.preco * item.qty).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-4 pt-3 border-t border-stone-100">
                        <span className="font-bold text-stone-800 text-sm">Total</span>
                        <span className="font-bold text-stone-800">
                          {order.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}