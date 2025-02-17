"use client";

import { useProducts } from "@/app/hooks/useProducts";
import ProductList from "@/components/products/ProductList";
import FilterSort from "@/components/filters/FilterSort";
import SearchBar from "@/components/search/SearchBar";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
import { useState, useEffect } from "react";

export default function ProductsPage() {
  const { products, isLoading } = useProducts();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return <ProductSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="mb-6">
        <SearchBar />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <FilterSort />
        </aside>

        <div className="w-full md:w-3/4">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}
