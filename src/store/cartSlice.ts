import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface CartState {
  items: { [productId: number]: number };
}

const initialState: CartState = {
  items: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items[productId] = (state.items[productId] || 0) + 1;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.items[productId]) {
        delete state.items[productId];
      }
    },
    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        delete state.items[productId];
      } else {
        state.items[productId] = quantity;
      }
    },
    clearCart: state => {
      state.items = {};
    },
  },
});

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartItemCount = (state: RootState) =>
  Object.values(state.cart.items).reduce((total, qty) => total + qty, 0);
export const selectIsInCart = (productId: number) => (state: RootState) =>
  Boolean(state.cart.items[productId]);

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
