"use client";
import ProductList from "@/components/products/ProductList";
import FilterSort from "@/components/filters/FilterSort";
import SearchBar from "@/components/search/SearchBar";
import { useProducts } from "../hooks/useProducts";

export default function ProductsPage() {
  const { products, isLoading } = useProducts();

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
          {isLoading ? (
            <div>Loading products...</div>
          ) : (
            <ProductList products={products} />
          )}
        </div>
      </div>
    </div>
  );
}
