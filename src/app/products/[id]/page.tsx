import { API } from '@/lib/api';
import type { Product } from '@/types/product';
import ProductDetails from '@/components/products/ProductDetails';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  if (!resolvedParams?.id) {
    return notFound();
  }

  try {
    const productId = decodeURIComponent(resolvedParams.id);

    const response = await fetch(API.getProduct(productId));

    if (!response.ok) {
      console.error(`Failed to fetch product ${productId}: ${response.statusText}`);
      return notFound();
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error(`Received non-JSON response for product ${productId}`);
      return notFound();
    }

    const product: Product = await response.json();

    if (!product) {
      return notFound();
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <ProductDetails initialProduct={product} />
      </main>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return notFound();
  }
}
