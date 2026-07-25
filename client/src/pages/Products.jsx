import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
function Products() {
  const products = [
    {
      id: 1,
      name: "Fresh Apples",
      price: "₹120/kg",
      category: "Fruits",
      image: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg",
    },
    {
      id: 2,
      name: "Fresh Milk",
      price: "₹65",
      category: "Dairy",
      image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg",
    },
    {
      id: 3,
      name: "Brown Bread",
      price: "₹45",
      category: "Bakery",
      image: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg",
    },
    {
      id: 4,
      name: "Orange Juice",
      price: "₹99",
      category: "Beverages",
      image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg",
    },
    {
      id: 5,
      name: "Tomatoes",
      price: "₹40/kg",
      category: "Vegetables",
      image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg",
    },
    {
      id: 6,
      name: "Bananas",
      price: "₹60/dozen",
      category: "Fruits",
      image: "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg",
    },
  ];

  const [search, setSearch] = useState("");
  const { cartItems, setCartItems } = useContext(CartContext);
  const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(search.toLowerCase())
);
function addToCart(product) {
  setCartItems([...cartItems, product]);

  alert(`${product.name} added to cart!`);
}

  return (
    <section className="py-16 bg-gray-50 min-h-screen">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center text-gray-900">
          Our Products
        </h1>

        <p className="text-center text-gray-500 mt-3 mb-10">
          Explore our fresh and quality supermarket products.
        </p>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-10">

          <input
            type="text"
            placeholder="Search fresh products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              flex-1
              bg-white
              border border-gray-300
              rounded-xl
              px-5
              py-3
              text-gray-700
              placeholder-gray-400
              shadow-sm
              focus:outline-none
              focus:ring-2
              focus:ring-green-500
              focus:border-green-500
              transition
             "
            />

          <select
            className="
              bg-white
              border
              border-gray-300
              rounded-xl
              px-5
              py-3
              shadow-sm
              focus:outline-none
              focus:ring-2
              focus:ring-green-500
             "
            >
            <option>All Categories</option>
            <option>Fruits</option>
            <option>Vegetables</option>
            <option>Dairy</option>
            <option>Bakery</option>
            <option>Beverages</option>
          </select>

        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {filteredProducts.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">

                <span className="text-sm text-green-600 font-medium">
                  {product.category}
                </span>

                <h3 className="text-lg font-semibold mt-2">
                  {product.name}
                </h3>

                <p className="text-green-600 font-bold mt-2">
                  {product.price}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
                >
                Add to Cart
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Products;