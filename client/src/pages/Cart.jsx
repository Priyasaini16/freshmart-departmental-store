import { useContext } from "react";
import { CartContext } from "../context/CartContext";
function Cart() {

  const { cartItems, setCartItems } = useContext(CartContext);
  function removeItem(indexToRemove) {
     const updatedCart = cartItems.filter(
      (_, index) => index !== indexToRemove
    );

    setCartItems(updatedCart);
  }
    const subtotal = cartItems.reduce((total, item) => {
      return total + parseInt(item.price.replace(/[^\d]/g, ""));
    }, 0);

    const delivery = cartItems.length > 0 ? 40 : 0;

     const total = subtotal + delivery;

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

            {cartItems.length === 0 ? (

             <div className="bg-white rounded-2xl shadow-md p-10 text-center">
              <h2 className="text-2xl font-semibold text-gray-700">
               🛒 Your cart is empty
              </h2>

              <p className="text-gray-500 mt-3">
                Add some fresh products to your cart.
              </p>
             </div>

          ) : (

            cartItems.map((item, index) => (

             <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-6"
             >

            <img
              src={item.image}
              alt={item.name}
              className="w-28 h-28 rounded-xl object-cover"
            />

            <div className="flex-1">

              <h2 className="text-xl font-semibold">
               {item.name}
              </h2>

              <p className="text-green-600 font-bold mt-2">
               {item.price}
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

           <button
              onClick={() => removeItem(index)}
              className="text-red-500 font-semibold hover:text-red-700"
           >
            Remove
          </button>

          </div>

         ))

        )}

       </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-md p-8 h-fit">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Delivery</span>
              <span>₹{delivery}</span>
            </div>

            <hr className="my-5" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{total}</span>
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