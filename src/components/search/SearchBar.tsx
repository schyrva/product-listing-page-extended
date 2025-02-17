"use client";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "@/store/productsSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const debouncedSearch = useDebouncedCallback((value: string) => {
    dispatch(setSearchTerm(value));
  }, 500);

  return (
    <Input
      type="text"
      placeholder="Search products..."
      onChange={(e) => debouncedSearch(e.target.value)}
      className="w-full"
    />
  );
}
