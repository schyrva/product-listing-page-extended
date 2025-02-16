"use client"

import type React from "react"

import { useDispatch } from "react-redux"
import { setSearchTerm } from "../store/productsSlice"
import { Input } from "@/components/ui/input"

export default function SearchBar() {
  const dispatch = useDispatch()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value))
  }

  return <Input type="text" placeholder="Search products..." onChange={handleSearch} className="w-full" />
}
