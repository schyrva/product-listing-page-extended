import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { fetchProducts } from "@/store/productsSlice";

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (state.status === "idle") {
      dispatch(fetchProducts());
    }
  }, [state.status, dispatch]);

  return {
    products: state.items,
    filter: state.filter,
    sort: state.sort,
    searchTerm: state.searchTerm,
    isLoading: state.status === "loading",
    error: state.error,
  };
};
