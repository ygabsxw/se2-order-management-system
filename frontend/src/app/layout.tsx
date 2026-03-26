import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
 
export const metadata: Metadata = {
  title: "OrderSystem",
  description: "Sistema de Gerenciamento de Pedidos",
};
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}