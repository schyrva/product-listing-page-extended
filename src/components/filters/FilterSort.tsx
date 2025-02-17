"use client"
import { useDispatch, useSelector } from "react-redux"
import { setFilter, setSort, type SortBy, type SortOrder } from "@/store/productsSlice"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from "@/constants/categories"
import type { RootState } from "@/store/store"

const MAX_PRICE = 1000

export default function FilterSort() {
  const dispatch = useDispatch()
  const { filter, sort } = useSelector((state: RootState) => state.products)

  const handlePriceRangeChange = (values: number[]) => {
    if (values.length === 2) {
      dispatch(setFilter({ 
        ...filter, 
        priceRange: [values[0], values[1]]
      }))
    }
  }

  return (
    <div className="space-y-8 bg-white p-8 rounded-lg shadow-md">
      {/* Category Filter */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-medium">Category</Label>
        <Select
          value={filter.category}
          onValueChange={(value) => dispatch(setFilter({ ...filter, category: value }))}
        >
          <SelectTrigger className="h-12 px-4">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {PRODUCT_CATEGORIES.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-medium">Price Range</Label>
        <Slider
          min={0}
          max={MAX_PRICE}
          step={10}
          value={filter.priceRange}
          onValueChange={handlePriceRangeChange}
          className="mt-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${filter.priceRange[0]}</span>
          <span>${filter.priceRange[1] === MAX_PRICE ? `${MAX_PRICE}+` : filter.priceRange[1]}</span>
        </div>
      </div>

      {/* Sort By Filter */}
      <div className="space-y-3">
        <Label className="text-gray-700 font-medium">Sort By</Label>
        <Select
          value={`${sort.by}-${sort.order}`}
          onValueChange={(value) => {
            const [by, order] = value.split("-") as [SortBy, SortOrder]
            dispatch(setSort({ by, order }))
          }}
        >
          <SelectTrigger className="h-12 px-4">
            <SelectValue placeholder="Sort products" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
