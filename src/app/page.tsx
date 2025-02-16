import ProductList from "../components/ProductList"
import FilterSort from "../components/FilterSort"
import SearchBar from "../components/SearchBar"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Our Products</h1>
      <div className="mb-6">
        <SearchBar />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <FilterSort />
        </aside>
        <div className="w-full md:w-3/4">
          <ProductList />
        </div>
      </div>
    </div>
  )
}
