export const API = {
  BASE_URL: 'https://fakestoreapi.com',
  PRODUCTS: '/products',
  getProduct: (id: string) => `${API.BASE_URL}/products/${id}`,
  getProducts: () => `${API.BASE_URL}/products`,
} as const;
