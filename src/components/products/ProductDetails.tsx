"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";
import { Product } from "@/types/product";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import FavouriteButton from "../common/FavouriteButton";
import CartButton from "../common/CartButton";

interface ProductDetailsProps {
  initialProduct: Product;
}

export default function ProductDetails({
  initialProduct,
}: ProductDetailsProps) {
  const router = useRouter();
  const [product] = useState<Product>(initialProduct);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2 max-w-2xl mx-auto">
        <div className="relative aspect-square rounded-lg overflow-hidden cursor-pointer">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={600}
            height={600}
            priority
            className="object-contain p-8 cursor-pointer"
            sizes="(max-width: 768px) 100vw, 50vw"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={[{ src: product.image, alt: product.title }]}
        />
      )}

      <div className="w-full md:w-1/2 space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(product.rating.rate)
                    ? "text-accent fill-current"
                    : "text-muted"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              ({product.rating.count} reviews)
            </span>
          </div>
        </div>
        <p className="text-muted-foreground text-justify">
          {product.description}
        </p>
        <p className="text-sm text-muted-foreground">
          Category: {product.category}
        </p>
        <div className="flex flex-wrap gap-4 justify-between sm:justify-start">
          <Button
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Button>

          <div className="flex items-center gap-2">
            <FavouriteButton />
            <CartButton />
          </div>
        </div>
      </div>
    </div>
  );
}
