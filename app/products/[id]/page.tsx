"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/slices.ts/productsSlice"

export default function ProductDetailsPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch product")
        }
        const data = await response.json()
        setProduct(data)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError("Error fetching product details")
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error || !product) {
    return <div>{error || "Product not found"}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Image
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.title}
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <Image
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${product.title} - Image ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-auto object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <Button size="lg">Add to Cart</Button>
        </div>
      </div>
    </div>
  )
}