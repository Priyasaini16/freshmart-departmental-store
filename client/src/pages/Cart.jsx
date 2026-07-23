function Cart() {
  return (
    <section className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-10">
          🛒 Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">

            {/* Item 1 */}
            <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-6">

              <img
                src="https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg"
                alt="Apple"
                className="w-28 h-28 rounded-xl object-cover"
              />

              <div className="flex-1">

                <h2 className="text-xl font-semibold">
                  Fresh Apples
                </h2>

                <p className="text-green-600 font-bold mt-2">
                  ₹120 / kg
                </p>

                <div className="flex items-center gap-4 mt-5">

                  <button className="bg-gray-200 w-9 h-9 rounded-lg">
                    -
                  </button>

                  <span className="font-semibold">
                    1
                  </span>

                  <button className="bg-gray-200 w-9 h-9 rounded-lg">
                    +
                  </button>

                </div>

              </div>

              <button className="text-red-500 font-semibold">
                Remove
              </button>

            </div>

            {/* Item 2 */}
            <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-6">

              <img
                src="https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg"
                alt="Milk"
                className="w-28 h-28 rounded-xl object-cover"
              />

              <div className="flex-1">

                <h2 className="text-xl font-semibold">
                  Fresh Milk
                </h2>

                <p className="text-green-600 font-bold mt-2">
                  ₹65
                </p>

                <div className="flex items-center gap-4 mt-5">

                  <button className="bg-gray-200 w-9 h-9 rounded-lg">
                    -
                  </button>

                  <span className="font-semibold">
                    2
                  </span>

                  <button className="bg-gray-200 w-9 h-9 rounded-lg">
                    +
                  </button>

                </div>

              </div>

              <button className="text-red-500 font-semibold">
                Remove
              </button>

            </div>

          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-md p-8 h-fit">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>₹250</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Delivery</span>
              <span>₹40</span>
            </div>

            <hr className="my-5" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹290</span>
            </div>

            <button className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition">
              Proceed to Checkout
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Cart;