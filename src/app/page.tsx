import ProductList from "@/components/products/ProductList"
import { API } from "@/lib/api"

export default async function HomePage() {
  const response = await fetch(API.getProducts())
  const products = await response.json()

  return (
    <div className="min-h-screen">
      <section className="bg-blue-50 py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">ShopNest</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices
          </p>
        </div>
      </section>

      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <ProductList products={products.slice(0, 6)} />
      </section>
    </div>
  )
}
