import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import AuthProvider from "@/utils/sessionProvider";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/utils/cartContext";
import TanstackProvider from "../../provider/tanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopiard",
  description: "An Ecommerce Website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const session = getServerSession();
  return (
    <html lang="en">
      <body className={`${inter.className}`} suppressHydrationWarning={true}>
        <TanstackProvider>
          <AuthProvider session={session}>
            <CartProvider>
              <Navbar />
              {children}
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
