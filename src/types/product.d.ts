export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filter: {
    category: string;
    priceRange: [number, number];
  };
  sort: {
    by: "price" | "title" | "rating";
    order: "asc" | "desc";
  };
  searchTerm: string;
  favorites: number[];
  basket: { [key: number]: number };
}

export type SortBy = "price" | "title" | "rating";
export type SortOrder = "asc" | "desc";
