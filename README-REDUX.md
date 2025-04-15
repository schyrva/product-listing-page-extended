# Redux Implementation for Cart and Favorites

This document provides an overview of the Redux implementation for handling cart and favorites functionality in the e-commerce application.

## Table of Contents

1. [Store Setup](#store-setup)
2. [Cart Functionality](#cart-functionality)
3. [Favorites Functionality](#favorites-functionality)
4. [UI Components](#ui-components)
5. [Usage Examples](#usage-examples)

## Store Setup

The Redux store is configured in `src/store/store.ts` with three main slices:

- `products`: Manages product data, filters, sorting, and search functionality
- `cart`: Manages cart items and quantities
- `favorites`: Manages user's favorite products

The store is wrapped around the application in `src/components/common/Providers.tsx` using the Redux `Provider` component.

## Cart Functionality

### State Structure

```typescript
interface CartState {
  items: { [productId: number]: number }; // productId -> quantity
}
```

### Available Actions

- `addToCart(productId: number)`: Add a product to the cart (increments quantity if already present)
- `removeFromCart(productId: number)`: Remove a product completely from the cart
- `updateQuantity({ productId, quantity })`: Update the quantity of a product in the cart
- `clearCart()`: Remove all items from the cart

### Selectors

- `selectCartItems`: Get all cart items with their quantities
- `selectCartItemCount`: Get the total count of items in the cart
- `selectIsInCart(productId)`: Check if a specific product is in the cart

## Favorites Functionality

### State Structure

```typescript
interface FavoritesState {
  items: number[]; // Array of product IDs
}
```

### Available Actions

- `toggleFavorite(productId: number)`: Toggle a product's favorite status
- `addToFavorites(productId: number)`: Add a product to favorites
- `removeFromFavorites(productId: number)`: Remove a product from favorites
- `clearFavorites()`: Remove all items from favorites

### Selectors

- `selectFavoriteItems`: Get all favorite product IDs
- `selectFavoriteItemCount`: Get the total count of favorite items
- `selectIsFavorite(productId)`: Check if a specific product is favorited

## UI Components

The following UI components have been updated to use the Redux store:

1. **CartButton**: Toggle a product in/out of the cart
2. **FavouriteButton**: Toggle a product in/out of favorites
3. **Header**: Displays cart and favorites count badges
4. **TrendingProducts**: Quick action buttons for cart and favorites
5. **ProductCard**: Product cards with cart and favorite buttons
6. **ProductDetails**: Product detail page with cart and favorite buttons

## Usage Examples

### Adding to Cart

```tsx
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

function AddToCartButton({ productId }) {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(addToCart(productId))}>Add to Cart</button>
  );
}
```

### Checking if Product is in Cart

```tsx
import { useSelector } from "react-redux";
import { selectIsInCart } from "@/store/cartSlice";

function CartStatus({ productId }) {
  const isInCart = useSelector(selectIsInCart(productId));

  return (
    <div>This product is {isInCart ? "in your cart" : "not in your cart"}</div>
  );
}
```

### Toggling Favorites

```tsx
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, selectIsFavorite } from "@/store/favoritesSlice";

function FavoriteToggle({ productId }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsFavorite(productId));

  return (
    <button
      onClick={() => dispatch(toggleFavorite(productId))}
      className={isFavorite ? "active" : ""}
    >
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
}
```

### Getting Cart Total

```tsx
import { useSelector } from "react-redux";
import { selectCartItems } from "@/store/cartSlice";

function CartSummary({ products }) {
  const cartItems = useSelector(selectCartItems);

  const total = products.reduce((sum, product) => {
    const quantity = cartItems[product.id] || 0;
    return sum + product.price * quantity;
  }, 0);

  return <div>Total: ${total.toFixed(2)}</div>;
}
```
