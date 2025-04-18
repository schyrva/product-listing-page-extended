import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface FavoritesState {
  items: number[];
}

const initialState: FavoritesState = {
  items: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const index = state.items.indexOf(productId);

      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(productId);
      }
    },
    addToFavorites: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (!state.items.includes(productId)) {
        state.items.push(productId);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const index = state.items.indexOf(productId);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const selectFavoriteItems = (state: RootState) => state.favorites.items;
export const selectFavoriteItemCount = (state: RootState) =>
  state.favorites.items.length;
export const selectIsFavorite = (productId: number) => (state: RootState) =>
  state.favorites.items.includes(productId);

export const {
  toggleFavorite,
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
