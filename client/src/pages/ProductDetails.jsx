function ProductDetails() {
  return (
    <section className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Product Image */}
          <div>
            <img
              src="https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg"
              alt="Fresh Apples"
              className="w-full h-[500px] object-cover rounded-3xl shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              Fruits
            </span>

            <h1 className="text-5xl font-bold text-gray-900 mt-6">
              Fresh Apples
            </h1>

            <p className="text-yellow-500 text-xl mt-4">
              ⭐⭐⭐⭐⭐ (4.8)
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-6">
              ₹120 / kg
            </h2>

            <p className="text-gray-600 mt-6 leading-8">
              Fresh, juicy and organically grown apples delivered
              directly from farms. Rich in vitamins and perfect for
              healthy daily nutrition.
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-5 mt-10">

              <button className="w-12 h-12 rounded-lg bg-gray-200 text-2xl">
                -
              </button>

              <span className="text-2xl font-semibold">
                1
              </span>

              <button className="w-12 h-12 rounded-lg bg-gray-200 text-2xl">
                +
              </button>

            </div>

            {/* Buttons */}
            <div className="flex gap-5 mt-10">

              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold">
                Add to Cart
              </button>

              <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-xl font-semibold">
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ProductDetails;