"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import {
  fetchProducts,
  setCurrentPage,
  setFilterCategory,
  setFilterPriceRange,
  setSearchQuery,
  setSortBy,
  setSortOrder,
} from "@/lib/slices.ts/productsSlice"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export default function ProductListingPage() {
  const dispatch = useDispatch<AppDispatch>()
  const {
    items,
    filteredItems,
    status,
    error,
    sortBy,
    sortOrder,
    filterCategory,
    filterPriceRange,
    searchQuery,
    currentPage,
    itemsPerPage,
  } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  const handleSortChange = (value: string) => {
    if (value === "price_asc") {
      dispatch(setSortBy("price"))
      dispatch(setSortOrder("asc"))
    } else if (value === "price_desc") {
      dispatch(setSortBy("price"))
      dispatch(setSortOrder("desc"))
    } else if (value === "title_asc") {
      dispatch(setSortBy("title"))
      dispatch(setSortOrder("asc"))
    } else if (value === "title_desc") {
      dispatch(setSortBy("title"))
      dispatch(setSortOrder("desc"))
    }
  }

  const handleCategoryChange = (value: string) => {
    dispatch(setFilterCategory(value === "all" ? null : value))
  }

  const handlePriceRangeChange = (value: number[]) => {
    dispatch(setFilterPriceRange(value as [number, number]))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value))
  }

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "failed") {
    return <div>Error: {error}</div>
  }

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredItems.slice(startIndex, endIndex)

  const categories = Array.from(new Set(items.map((item) => item.category)))
  const maxPrice = Math.max(...items.map((item) => item.price))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="space-y-4">
            <Input type="text" placeholder="Search products" value={searchQuery} onChange={handleSearchChange} />
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div>
              <h3 className="font-semibold mb-2">Price Range</h3>
              <Slider
                min={0}
                max={maxPrice}
                step={1}
                value={filterPriceRange || [0, maxPrice]}
                onValueChange={handlePriceRangeChange}
              />
              <div className="flex justify-between mt-2">
                <span>${filterPriceRange ? filterPriceRange[0] : 0}</span>
                <span>${filterPriceRange ? filterPriceRange[1] : maxPrice}</span>
              </div>
            </div>
            <Select onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="title_asc">Title: A to Z</SelectItem>
                <SelectItem value="title_desc">Title: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <Image
                    src={product.thumbnail || "/placeholder.svg"}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                className="mx-1"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}