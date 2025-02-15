import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: {
    id: number
    name: string
    image: string
  }
  images: string[]
}

interface ProductsState {
  items: Product[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  filteredItems: Product[]
  sortBy: "price" | "name" | null
  sortOrder: "asc" | "desc"
  filterCategory: string | null
  filterPriceRange: [number, number] | null
  searchQuery: string
  currentPage: number
  itemsPerPage: number
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
  filteredItems: [],
  sortBy: null,
  sortOrder: "asc",
  filterCategory: null,
  filterPriceRange: null,
  searchQuery: "",
  currentPage: 1,
  itemsPerPage: 12,
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("https://api.escuelajs.co/api/v1/products")
  const data = await response.json()
  return data
})

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<"price" | "name" | null>) => {
      state.sortBy = action.payload
      state.filteredItems = sortProducts(state.filteredItems, state.sortBy, state.sortOrder)
    },
    setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortOrder = action.payload
      state.filteredItems = sortProducts(state.filteredItems, state.sortBy, state.sortOrder)
    },
    setFilterCategory: (state, action: PayloadAction<string | null>) => {
      state.filterCategory = action.payload
      state.filteredItems = filterProducts(state.items, state.filterCategory, state.filterPriceRange, state.searchQuery)
    },
    setFilterPriceRange: (state, action: PayloadAction<[number, number] | null>) => {
      state.filterPriceRange = action.payload
      state.filteredItems = filterProducts(state.items, state.filterCategory, state.filterPriceRange, state.searchQuery)
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.filteredItems = filterProducts(state.items, state.filterCategory, state.filterPriceRange, state.searchQuery)
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.items = action.payload
        state.filteredItems = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || null
      })
  },
})

const sortProducts = (products: Product[], sortBy: "price" | "name" | null, sortOrder: "asc" | "desc"): Product[] => {
  if (!sortBy) return products

  return [...products].sort((a, b) => {
    if (sortBy === "price") {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price
    } else {
      return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    }
  })
}

const filterProducts = (
  products: Product[],
  category: string | null,
  priceRange: [number, number] | null,
  searchQuery: string,
): Product[] => {
  return products.filter((product) => {
    const matchesCategory = !category || product.category.name === category
    const matchesPriceRange = !priceRange || (product.price >= priceRange[0] && product.price <= priceRange[1])
    const matchesSearchQuery =
      !searchQuery ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesPriceRange && matchesSearchQuery
  })
}

export const { setSortBy, setSortOrder, setFilterCategory, setFilterPriceRange, setSearchQuery, setCurrentPage } =
  productsSlice.actions

export default productsSlice.reducer