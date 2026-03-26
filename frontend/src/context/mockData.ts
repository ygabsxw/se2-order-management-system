import { Product } from "./CartContext";

export const mockProducts: Product[] = [
  { id: 1, nome: "Notebook Dell", preco: 3499.9, estoque: 5, tipo: "eletronico", voltagem: "110V/220V" },
  { id: 2, nome: "Smartphone Samsung", preco: 1899.9, estoque: 12, tipo: "eletronico", voltagem: "5V" },
  { id: 3, nome: "Leite Integral", preco: 5.49, estoque: 100, tipo: "perecivel", dataValidade: "2026-04-10" },
  { id: 4, nome: "Queijo Mussarela", preco: 32.9, estoque: 40, tipo: "perecivel", dataValidade: "2026-04-05" },
  { id: 5, nome: "Caderno Universitário", preco: 18.9, estoque: 60, tipo: "comum" },
  { id: 6, nome: "Caneta Esferográfica", preco: 3.5, estoque: 200, tipo: "comum" },
];

export type { Product };