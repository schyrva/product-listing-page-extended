import ProductDetails from "@/components/ProductDetails"

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <ProductDetails id={params.id} />
    </main>
  )
}
