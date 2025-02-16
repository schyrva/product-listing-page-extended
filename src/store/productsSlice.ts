import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "../types/product"

const MAX_PRICE = 1000

interface ProductsState {
  items: Product[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  filter: {
    category: string
    priceRange: [number, number]
  }
  sort: {
    by: "price" | "title" | "rating"
    order: "asc" | "desc"
  }
  searchTerm: string
  favorites: number[]
  basket: { [key: number]: number }
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
  filter: {
    category: "all",
    priceRange: [0, MAX_PRICE],
  },
  sort: {
    by: "price",
    order: "asc",
  },
  searchTerm: "",
  favorites: [],
  basket: {},
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("https://fakestoreapi.com/products")
  return (await response.json()) as Product[]
})

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ category: string; priceRange: [number, number] }>) => {
      state.filter = action.payload
    },
    setSort: (state, action: PayloadAction<{ by: "price" | "title" | "rating"; order: "asc" | "desc" }>) => {
      state.sort = action.payload
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const index = state.favorites.indexOf(action.payload)
      if (index > -1) {
        state.favorites.splice(index, 1)
      } else {
        state.favorites.push(action.payload)
      }
    },
    addToBasket: (state, action: PayloadAction<number>) => {
      state.basket[action.payload] = (state.basket[action.payload] || 0) + 1
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
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch products"
      })
  },
})

export const { setFilter, setSort, setSearchTerm, toggleFavorite, addToBasket } = productsSlice.actions
export default productsSlice.reducer
