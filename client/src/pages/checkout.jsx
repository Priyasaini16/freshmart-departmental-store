import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ArrowLeft, ShieldCheck, CreditCard, Banknote, Smartphone } from "lucide-react";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const delivery = subtotal >= 500 || subtotal === 0 ? 0 : 40;
  const discount = subtotal >= 1000 ? subtotal * 0.1 : 0;
  const total = subtotal + delivery - discount;

  function handlePlaceOrder(e) {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    clearCart();
    navigate("/order-success");
  }

  return (
    <section className="bg-[#fafafa] py-12 lg:py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-green-600 font-bold">
              Express Checkout
            </span>

            <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-neutral-900">
              Complete Your Order
            </h1>

            <p className="mt-1 text-sm text-neutral-500">
              Enter your delivery details and choose your preferred payment method.
            </p>
          </div>

          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm text-green-600 font-bold hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-[1.5fr_1fr] gap-8">

          {/* LEFT */}

          <div className="space-y-6">

            {/* Contact */}

            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-neutral-200/80">

              <h2 className="text-xl font-bold text-neutral-900 mb-5 flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-green-100 text-xs font-bold text-green-700">1</span>
                Contact Information
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">Full Name</label>
                  <input
                    required
                    placeholder="Abhishek Saini"
                    className="h-12 w-full rounded-xl border border-neutral-300 bg-neutral-50/50 px-4 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">Phone Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="h-12 w-full rounded-xl border border-neutral-300 bg-neutral-50/50 px-4 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/20"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="abhishek@example.com"
                    className="h-12 w-full rounded-xl border border-neutral-300 bg-neutral-50/50 px-4 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/20"
                  />
                </div>

              </div>

            </div>

            {/* Shipping */}

            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-neutral-200/80">

              <h2 className="text-xl font-bold text-neutral-900 mb-5 flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-green-100 text-xs font-bold text-green-700">2</span>
                Delivery Address
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">Flat / House No.</label>
                  <input
                    required
                    placeholder="House 42, Floor 2"
                    className="h-12 w-full rounded-xl border border-neutral-300 bg-neutral-50/50 px-4 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">Street / Area</label>
                  <input
                    required
                    placeholder="Sector 17"
                    className="h-12 w-full rounded-xl border border-neutral-300 bg-neutral-50/50 px-4 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">City</label>
                  <input
                    required
                    placeholder="Chandigarh"
                    className="h-12 w-full rounded-xl border border-neutral-300 bg-neutral-50/50 px-4 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">State</label>
                  <input
                    required
                    placeholder="Punjab"
                    className="h-12 w-full rounded-xl border border-neutral-300 bg-neutral-50/50 px-4 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/20"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">Pincode</label>
                  <input
                    required
                    placeholder="160017"
                    className="h-12 w-full rounded-xl border border-neutral-300 bg-neutral-50/50 px-4 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/20"
                  />
                </div>

              </div>

            </div>

            {/* Payment */}

            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-neutral-200/80">

              <h2 className="text-xl font-bold text-neutral-900 mb-5 flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-green-100 text-xs font-bold text-green-700">3</span>
                Payment Method
              </h2>

              <div className="space-y-3">

                <label className="flex items-center justify-between border rounded-2xl p-4 cursor-pointer hover:border-green-500 transition bg-neutral-50/30">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" defaultChecked className="accent-green-600 h-4 w-4" />
                    <span className="text-sm font-semibold text-neutral-900">Cash on Delivery</span>
                  </div>
                  <Banknote className="h-5 w-5 text-green-600" />
                </label>

                <label className="flex items-center justify-between border rounded-2xl p-4 cursor-pointer hover:border-green-500 transition bg-neutral-50/30">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" className="accent-green-600 h-4 w-4" />
                    <span className="text-sm font-semibold text-neutral-900">UPI (GPay / PhonePe / Paytm)</span>
                  </div>
                  <Smartphone className="h-5 w-5 text-green-600" />
                </label>

                <label className="flex items-center justify-between border rounded-2xl p-4 cursor-pointer hover:border-green-500 transition bg-neutral-50/30">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" className="accent-green-600 h-4 w-4" />
                    <span className="text-sm font-semibold text-neutral-900">Credit / Debit Card</span>
                  </div>
                  <CreditCard className="h-5 w-5 text-green-600" />
                </label>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-neutral-200/80">

              <div className="flex items-center justify-between mb-6 border-b border-neutral-100 pb-4">
                <h2 className="text-xl font-bold text-neutral-900">
                  Order Summary
                </h2>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  {cartItems.length} Items
                </span>
              </div>

              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm py-1"
                  >
                    <div>
                      <p className="font-semibold text-neutral-800 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        Qty: {item.quantity || 1}
                      </p>
                    </div>

                    <p className="font-bold text-neutral-900">
                      ₹{((item.price) * (item.quantity || 1)).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-neutral-200 pt-4 text-sm">

                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between text-neutral-600">
                  <span>Delivery</span>
                  <span className="font-semibold text-neutral-900">
                    {delivery === 0 ? <span className="text-green-600 font-bold uppercase text-xs">FREE</span> : `₹${delivery}`}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Special Discount (10%)</span>
                    <span>-₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="border-t border-neutral-200 pt-4 flex justify-between text-xl font-extrabold text-neutral-900">
                  <span>Total Payable</span>
                  <span className="text-green-600">₹{total.toLocaleString("en-IN")}</span>
                </div>

              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-2xl bg-green-600 py-4 text-base font-bold text-white hover:bg-green-700 transition shadow-lg shadow-green-600/25 cursor-pointer"
              >
                Place Order Now
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-neutral-500">
                <ShieldCheck className="h-4 w-4 text-green-600" /> Safe & Encrypted Checkout
              </div>

            </div>

          </div>

        </form>

      </div>
    </section>
  );
}

export default Checkout;