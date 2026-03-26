"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../../components/Navbar";
import { mockProducts } from "../../../../context/mockData";
import { ProductType } from "../../../../context/CartContext";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const product = mockProducts.find((p) => p.id === Number(id));

  const [tipo, setTipo] = useState<ProductType>(product?.tipo ?? "comum");
  const [form, setForm] = useState({
    nome: product?.nome ?? "",
    preco: String(product?.preco ?? ""),
    estoque: String(product?.estoque ?? ""),
    voltagem: product?.voltagem ?? "",
    dataValidade: product?.dataValidade ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <main className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p className="text-stone-400 text-5xl mb-4">🔍</p>
          <h1 className="text-xl font-bold text-stone-800 mb-2">Produto não encontrado</h1>
          <Link href="/" className="text-stone-500 hover:text-stone-800 text-sm underline">Voltar</Link>
        </main>
      </div>
    );
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = "Nome é obrigatório";
    if (!form.preco || Number(form.preco) <= 0) e.preco = "Preço inválido";
    if (!form.estoque || Number(form.estoque) < 0) e.estoque = "Estoque inválido";
    if (tipo === "eletronico" && !form.voltagem.trim()) e.voltagem = "Voltagem é obrigatória";
    if (tipo === "perecivel" && !form.dataValidade) e.dataValidade = "Data de validade é obrigatória";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSaving(true);
    // TODO: chamar productService.update() quando o backend estiver pronto
    setTimeout(() => { setSaving(false); router.push("/"); }, 800);
  }

  function handleDelete() {
    // TODO: chamar productService.delete() quando o backend estiver pronto
    router.push("/");
  }

  function field(label: string, key: string, props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
        <input
          {...props}
          value={form[key as keyof typeof form]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className={`w-full border rounded-lg px-4 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300 transition-all ${
            errors[key] ? "border-red-400 bg-red-50" : "border-stone-200 bg-white"
          }`}
        />
        {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-stone-800">Editar Produto</h1>
              <p className="text-stone-500 text-sm">#{product.id} — {product.nome}</p>
            </div>
          </div>
          <button
            onClick={() => setShowConfirmDelete(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Excluir
          </button>
        </div>

        {/* Confirm delete modal */}
        {showConfirmDelete && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
              <h2 className="font-bold text-stone-800 mb-2">Excluir produto?</h2>
              <p className="text-stone-500 text-sm mb-5">Esta ação não pode ser desfeita. O produto <strong>{product.nome}</strong> será removido permanentemente.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowConfirmDelete(false)} className="flex-1 py-2 border border-stone-200 rounded-lg text-sm text-stone-600 hover:bg-stone-50 transition-colors">
                  Cancelar
                </button>
                <button onClick={handleDelete} className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors">
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col gap-5">
          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Tipo do Produto</label>
            <div className="grid grid-cols-3 gap-2">
              {(["comum", "eletronico", "perecivel"] as ProductType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTipo(t); setErrors({}); }}
                  className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${
                    tipo === t
                      ? "bg-stone-800 text-white border-stone-800"
                      : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                  }`}
                >
                  {t === "comum" ? "📦 Comum" : t === "eletronico" ? "⚡ Eletrônico" : "🌿 Perecível"}
                </button>
              ))}
            </div>
          </div>

          {field("Nome", "nome", { placeholder: "Ex: Notebook Dell Inspiron" })}
          <div className="grid grid-cols-2 gap-4">
            {field("Preço (R$)", "preco", { type: "number", min: "0", step: "0.01" })}
            {field("Estoque", "estoque", { type: "number", min: "0" })}
          </div>
          {tipo === "eletronico" && field("Voltagem", "voltagem", { placeholder: "Ex: 110V/220V ou 5V" })}
          {tipo === "perecivel" && field("Data de Validade", "dataValidade", { type: "date" })}

          <div className="flex gap-3 pt-2 border-t border-stone-100">
            <Link href="/" className="flex-1 text-center py-2.5 rounded-lg border border-stone-200 text-stone-600 text-sm font-medium hover:bg-stone-50 transition-colors">
              Cancelar
            </Link>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex-1 py-2.5 rounded-lg bg-stone-800 text-white text-sm font-semibold hover:bg-stone-700 disabled:opacity-60 transition-colors"
            >
              {saving ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}