"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  selectFavoriteItems,
  clearFavorites,
  removeFromFavorites,
} from "@/store/favoritesSlice";
import { Product } from "@/types/product";
import CartButton from "@/components/common/CartButton";

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(selectFavoriteItems);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        setIsLoading(true);

        if (favoriteIds.length === 0) {
          setProducts([]);
          setIsLoading(false);
          return;
        }

        const productsData = await Promise.all(
          favoriteIds.map((id) =>
            fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
              res.json()
            )
          )
        );

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, [favoriteIds]);

  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromFavorites(productId));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (favoriteIds.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Heart className="h-16 w-16 text-muted-foreground" />
            <h2 className="text-2xl font-semibold">No favorites yet</h2>
            <p className="text-muted-foreground">
              Items you favorite will appear here.
            </p>
            <Link href="/products">
              <Button className="mt-4">Browse Products</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="aspect-square relative overflow-hidden">
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-4 transition-transform duration-300 hover:scale-105"
                />
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
                onClick={() => handleRemoveItem(product.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4">
              <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold hover:text-primary line-clamp-1">
                  {product.title}
                </h3>
              </Link>

              <div className="flex justify-between items-center mt-2">
                <p className="font-medium">${product.price.toFixed(2)}</p>
                <div className="flex gap-2">
                  <CartButton productId={product.id} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <Link href="/products">
          <Button variant="outline" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Shopping
          </Button>
        </Link>

        {favoriteIds.length > 0 && (
          <Button
            variant="outline"
            className="text-red-500"
            onClick={() => dispatch(clearFavorites())}
          >
            Clear All Favorites
          </Button>
        )}
      </div>
    </div>
  );
}
