"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import type { Product } from "../types/product"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { toggleFavorite, addToBasket } from "../store/productsSlice"
import type { RootState } from "../store/store"

interface ProductDetailsProps {
  id: string
}

export default function ProductDetails({ id }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.products.favorites)
  const isFavorite = product ? favorites.includes(product.id) : false

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error("Failed to fetch product:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (isLoading) {
    return <div>Loading product details...</div>
  }

  if (!product) {
    return <div>Product not found</div>
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product.id))
  }

  const handleAddToBasket = () => {
    dispatch(addToBasket(product.id))
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          width={500}
          height={500}
          layout="responsive"
          objectFit="contain"
        />
      </div>
      <div className="w-full md:w-1/2 space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(product.rating.rate) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">({product.rating.count} reviews)</span>
          </div>
        </div>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-sm text-gray-500">Category: {product.category}</p>
        <div className="flex space-x-4">
          <Button onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Products
          </Button>
          <Button variant="outline" onClick={handleToggleFavorite}>
            <Heart className={`w-5 h-5 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          <Button onClick={handleAddToBasket} className="flex items-center gap-2">
            <ShoppingCart size={16} />
            Add to Basket
          </Button>
        </div>
      </div>
    </div>
  )
}
