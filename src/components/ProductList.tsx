"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { fetchProducts } from "../store/productsSlice"
import ProductCard from "./ProductCard"
import type { Product } from "../types/product"
import ReactPaginate from "react-paginate"

const MAX_PRICE = 1000

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, status, error, filter, sort, searchTerm } = useSelector((state: RootState) => state.products)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 9

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  if (status === "loading") {
    return <div>Loading products...</div>
  }

  if (status === "failed") {
    return <div>Error: {error}</div>
  }

  const filteredProducts = items.filter((product: Product) => {
    const matchesCategory = filter.category === "all" || product.category === filter.category
    const matchesPriceRange =
      product.price >= filter.priceRange[0] &&
      (product.price <= filter.priceRange[1] || filter.priceRange[1] === MAX_PRICE)
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesPriceRange && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort.by === "price") {
      return sort.order === "asc" ? a.price - b.price : b.price - a.price
    } else if (sort.by === "title") {
      return sort.order === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    } else if (sort.by === "rating") {
      return sort.order === "asc" ? a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate
    }
    return 0
  })

  const pageCount = Math.ceil(sortedProducts.length / itemsPerPage)
  const offset = currentPage * itemsPerPage
  const currentProducts = sortedProducts.slice(offset, offset + itemsPerPage)

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected)
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center items-center mt-8 space-x-2"}
        pageClassName={"px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300"}
        activeClassName={"bg-blue-500 text-white"}
        previousClassName={"px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300"}
        nextClassName={"px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
      />
    </div>
  )
}
