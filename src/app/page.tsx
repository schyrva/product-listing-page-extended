import ProductList from "@/components/products/ProductList";
import { API } from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const response = await fetch(API.getProducts());
  const products = await response.json();

  return (
    <div className="min-h-screen">
      <section className="bg-background text-foreground py-20 px-4 transition-colors">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">BestShop</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Product Listing Page Test Task. Done with Next.js, Redux Toolkit,
            Shadcn UI, and Tailwind CSS.
          </p>

          <Link href="/products">
            <Button size="lg" className="text-lg px-6 py-3">
              Buy Now
            </Button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Products
        </h2>
        <ProductList products={products.slice(0, 6)} />
      </section>
    </div>
  );
}
