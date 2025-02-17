import { API } from "@/lib/api";
import type { Product } from "@/types/product";
import ProductDetails from "@/components/products/ProductDetails";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  if (!resolvedParams?.id) {
    return notFound();
  }

  try {
    const productId = decodeURIComponent(resolvedParams.id);

    const response = await fetch(API.getProduct(productId));

    if (!response.ok) throw new Error("Product not found");

    const product: Product = await response.json();

    return (
      <main className="container mx-auto px-4 py-8">
        <ProductDetails initialProduct={product} />
      </main>
    );
  } catch {
    return notFound();
  }
}
