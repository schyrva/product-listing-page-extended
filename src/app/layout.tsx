import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/common/Providers";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopNest - Your One-Stop Shop",
  description: "Discover amazing products at unbeatable prices",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
