"use client";

import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSort } from "../store/productsSlice";
import type { RootState } from "../store/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const MAX_PRICE = 1000;

export default function FilterSort() {
  const dispatch = useDispatch();
  const { filter, sort } = useSelector((state: RootState) => state.products);

  const handleCategoryChange = (value: string) => {
    dispatch(setFilter({ ...filter, category: value }));
  };

  const handlePriceRangeChange = (value: number[]) => {
    dispatch(setFilter({ ...filter, priceRange: [value[0], value[1]] }));
  };

  const handleSortChange = (value: string) => {
    const [by, order] = value.split("-");
    dispatch(
      setSort({
        by: by as "price" | "title" | "rating",
        order: order as "asc" | "desc",
      })
    );
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <Label
          htmlFor="category"
          className="text-sm font-medium text-gray-700 mb-1 block"
        >
          Category
        </Label>
        <Select onValueChange={handleCategoryChange} value={filter.category}>
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="jewelery">Jewelery</SelectItem>
            <SelectItem value="men&#39;s clothing">
              Men&#39;s Clothing
            </SelectItem>
            <SelectItem value="women&#39;s clothing">
              Women&#39;s Clothing
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-1 block">
          Price Range
        </Label>
        <Slider
          min={0}
          max={MAX_PRICE}
          step={10}
          value={[filter.priceRange[0], filter.priceRange[1]]}
          onValueChange={handlePriceRangeChange}
          className="mt-2"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>${filter.priceRange[0]}</span>
          <span>
            $
            {filter.priceRange[1] === MAX_PRICE
              ? `${MAX_PRICE}+`
              : filter.priceRange[1]}
          </span>
        </div>
      </div>

      <div>
        <Label
          htmlFor="sort"
          className="text-sm font-medium text-gray-700 mb-1 block"
        >
          Sort by
        </Label>
        <Select
          onValueChange={handleSortChange}
          value={`${sort.by}-${sort.order}`}
        >
          <SelectTrigger id="sort" className="w-full">
            <SelectValue placeholder="Sort products" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="title-asc">Title: A to Z</SelectItem>
            <SelectItem value="title-desc">Title: Z to A</SelectItem>
            <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
            <SelectItem value="rating-asc">Rating: Low to High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
