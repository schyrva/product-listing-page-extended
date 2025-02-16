import Image from "next/image"
import Link from "next/link"
import type { Product } from "../types/product"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { toggleFavorite, addToBasket } from "../store/productsSlice"
import type { RootState } from "../store/store"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.products.favorites)
  const isFavorite = favorites.includes(product.id)

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product.id))
  }

  const handleAddToBasket = () => {
    dispatch(addToBasket(product.id))
  }

  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardContent className="p-4">
        <div className="aspect-square relative mb-4 overflow-hidden group">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            layout="fill"
            objectFit="contain"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h2 className="text-lg font-semibold mb-2 truncate hover:text-primary transition-colors">{product.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-600 font-medium">${product.price.toFixed(2)}</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(product.rating.rate) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-1 text-sm text-gray-600">({product.rating.count})</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Link href={`/product/${product.id}`} passHref className="flex-grow mr-2">
          <Button variant="outline" className="w-full hover:bg-primary hover:text-white transition-colors">
            View Details
          </Button>
        </Link>
        <Button variant="outline" onClick={handleToggleFavorite} className="mr-2 hover:bg-red-100 transition-colors">
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
        <Button
          variant="outline"
          onClick={handleAddToBasket}
          className="hover:bg-primary hover:text-white transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

