import Image from "next/image";
import Link from "next/link";
import { RatingStars } from "@/components/common/RatingStars";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Product } from "@/types/product";
import CartButton from "../common/CartButton";
import FavouriteButton from "../common/FavouriteButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardContent className="p-4">
        <div className="aspect-square relative mb-4 overflow-hidden group">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h2
          className="text-lg font-semibold mb-2 truncate hover:text-primary"
          title={product.title}
        >
          {product.title}
        </h2>
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-600 font-medium">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex items-center">
            <RatingStars rating={product.rating.rate} />
            <span className="ml-1 text-sm text-gray-600">
              ({product.rating.count})
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Link href={`/products/${product.id}`} passHref>
          <Button variant="outline" className="flex-grow mr-2">
            View Details
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <FavouriteButton />
          <CartButton />
        </div>
      </CardFooter>
    </Card>
  );
}
