"use client";
import { useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "./ProductCard";
import { useProducts } from "@/app/hooks/useProducts";
import type { Product } from "@/types/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export default function ProductList({ products }: { products?: Product[] }) {
  const { products: allProducts, filter, sort, searchTerm } = useProducts();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;

  const filteredProducts = useMemo(() => {
    const baseProducts = products || allProducts;
    return baseProducts.filter((product) => {
      const matchesCategory =
        filter.category === "all" || product.category === filter.category;
      const matchesPrice =
        product.price >= filter.priceRange[0] &&
        product.price <= filter.priceRange[1];
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [products, allProducts, filter, searchTerm]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sort.by === "price") {
        return sort.order === "asc" ? a.price - b.price : b.price - a.price;
      }
      if (sort.by === "title") {
        return sort.order === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      if (sort.by === "rating") {
        return sort.order === "asc"
          ? a.rating.rate - b.rating.rate
          : b.rating.rate - a.rating.rate;
      }
      return 0;
    });
  }, [filteredProducts, sort]);

  const pageCount = Math.ceil(sortedProducts.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = sortedProducts.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <ReactPaginate
        previousLabel={
          <Button variant="outline" size="icon" className="h-10 w-10">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        }
        nextLabel={
          <Button variant="outline" size="icon" className="h-10 w-10">
            <ChevronRight className="w-5 h-5" />
          </Button>
        }
        pageCount={pageCount}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName="flex justify-center items-center mt-8 gap-2"
        previousClassName="rounded-md"
        nextClassName="rounded-md"
        disabledClassName="opacity-50 cursor-not-allowed"
        renderOnZeroPageCount={null}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        breakLabel="..."
        pageLabelBuilder={(page) => (
          <Button
            variant={currentPage + 1 === page ? "default" : "outline"}
            className={`h-10 w-10 flex items-center justify-center ${
              currentPage + 1 === page
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
          >
            {page}
          </Button>
        )}
      />
    </div>
  );
}
