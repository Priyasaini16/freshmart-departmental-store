import { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";

import { CartContext } from "../context/CartContext";
import ProductCard from "../components/product/ProductCard";
import ProductSkeleton from "../components/product/ProductSkeleton";
import { getProducts } from "../clServices/productServices";

const categories = [
  "All",
  "Fresh Fruits",
  "Vegetables",
  "Dairy & Breakfast",
  "Bakery",
  "Atta, Rice & Dal",
  "Home & Cleaning",
  "Snacks & Drinks",
  "Personal Care",
  "Baby Care",
];

function Products() {
  const { addToCart } = useContext(CartContext);
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // Get search query from URL
  useEffect(() => {
    const query = searchParams.get("search");

    if (query) {
      setSearch(query);
    }
  }, [searchParams]);

  // Fetch products from MongoDB
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        console.log("PRODUCTS FROM MONGODB:", data);

        setProducts(data);
      } catch (error) {
       console.error("PRODUCT FETCH ERROR:", error);
       setError(error.message);
      } finally {
       setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter + Search + Sort
  const filteredProducts = useMemo(() => {
    let data = [...products];

    // CATEGORY
    if (category !== "All") {
      data = data.filter(
        (product) =>
          product.category?.trim().toLowerCase() ===
          category.trim().toLowerCase()
      );
    }

    // SEARCH
    if (search.trim()) {
      const searchText = search.trim().toLowerCase();

      data = data.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchText) ||
          product.category?.toLowerCase().includes(searchText) ||
          product.description?.toLowerCase().includes(searchText)
      );
    }

    // SORT
    switch (sort) {
      case "rating":
        data.sort(
          (a, b) => (b.rating || 0) - (a.rating || 0)
        );
        break;

      case "discount":
        data.sort((a, b) => {
          const discountA =
            ((a.oldPrice || a.price) - a.price) /
            (a.oldPrice || a.price);

          const discountB =
            ((b.oldPrice || b.price) - b.price) /
            (b.oldPrice || b.price);

          return discountB - discountA;
        });
        break;

      case "low":
        data.sort((a, b) => a.price - b.price);
        break;

      case "high":
        data.sort((a, b) => b.price - a.price);
        break;

      case "name":
        data.sort((a, b) =>
          (a.name || "").localeCompare(b.name || "")
        );
        break;

      default:
        break;
    }

    return data;
  }, [products, search, category, sort]);

  return (
    <section className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-green-600">
              Fresh Collection
            </span>

            <h1 className="mt-4 text-5xl font-semibold leading-tight text-neutral-900">
              Fresh groceries
              <br />
              for every kitchen
            </h1>

            <p className="mt-5 text-lg leading-8 text-neutral-500">
              Discover hand-picked fruits, vegetables, dairy, bakery and
              everyday essentials delivered fresh to your doorstep.
            </p>
          </div>

          <div className="text-right">
            <p className="text-5xl font-semibold text-neutral-900">
              {filteredProducts.length}
            </p>

            <p className="text-neutral-500">
              Products Available
            </p>
          </div>
        </div>

        {/* Search + Sort */}
        <div className="mb-10 flex flex-col gap-5 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

            <input
              type="text"
              placeholder="Search groceries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-14 w-full rounded-2xl border border-neutral-200 bg-white pl-14 pr-5 text-sm shadow-sm outline-none transition focus:border-green-600"
            />
          </div>

          <div className="relative">
            <SlidersHorizontal className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-14 cursor-pointer rounded-2xl border border-neutral-200 bg-white pl-14 pr-12 text-sm shadow-sm outline-none"
            >
              <option value="featured">Featured</option>
              <option value="low">Price : Low → High</option>
              <option value="high">Price : High → Low</option>
              <option value="name">A → Z</option>
              <option value="rating">Rating : High → Low</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-6 py-3 text-sm font-medium transition ${
                category === cat
                  ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                  : "border border-neutral-200 bg-white text-neutral-700 hover:border-green-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Clear Filters */}
        <div className="mb-10">
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("All");
              setSort("featured");
            }}
            className="rounded-xl border border-neutral-300 px-5 py-2 text-sm hover:bg-neutral-100"
          >
            Clear Filters
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Products */}
        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-neutral-200 bg-white p-12 py-20 text-center">
            <h3 className="text-2xl font-bold text-neutral-800">
              No matching products found
            </h3>

            <p className="mt-2 text-neutral-500">
              Try adjusting your search query or category filters.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-6 inline-flex items-center rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;