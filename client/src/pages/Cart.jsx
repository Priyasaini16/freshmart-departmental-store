import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Tag,
  CheckCircle,
} from "lucide-react";

import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } =
    useContext(CartContext);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const delivery = cartItems.length ? (subtotal >= 499 ? 0 : 40) : 0;

  const savings = cartItems.reduce((total, item) => {
    const old = item.oldPrice || Math.round(item.price * 1.25);
    return total + (old - item.price) * (item.quantity || 1);
  }, 0);

  const total = subtotal + delivery;

  if (cartItems.length === 0) {
    return (
      <section className="min-h-[80vh] bg-[#fafafa] flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full rounded-3xl bg-white shadow-xl border border-neutral-200 p-10 text-center">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-inner">
            <ShoppingBag className="h-10 w-10" />
          </div>

          <h1 className="text-3xl font-bold text-neutral-900">
            Your cart is empty
          </h1>

          <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
            Looks like you haven&apos;t added any groceries yet.
            Discover our fresh produce and everyday essentials.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-8 py-3.5 text-white font-bold hover:bg-green-700 transition shadow-lg shadow-green-600/20"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#fafafa] min-h-screen py-12 lg:py-16">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-neutral-200/80 pb-6">

          <div>
            <p className="text-xs uppercase tracking-widest text-green-600 font-bold">
              Shopping Cart
            </p>

            <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-neutral-900">
              Your Grocery Bag
            </h1>

            <p className="mt-1 text-sm text-neutral-500">
              {cartItems.length} product line(s) ready for checkout.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-green-600 font-bold hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">

          {/* LEFT */}

          <div className="space-y-4">

            {cartItems.map((item) => {

              const oldPrice =
                item.oldPrice || Math.round(item.price * 1.25);

              return (

                <div
                  key={item.id}
                  className="rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-sm transition hover:shadow-md"
                >

                  <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-28 w-28 shrink-0 rounded-2xl object-cover border border-neutral-100"
                    />

                    <div className="flex flex-1 flex-col w-full">

                      <div className="flex justify-between items-start gap-4">

                        <div>
                          <span className="text-[11px] text-green-600 font-bold uppercase tracking-wider">
                            {item.category}
                          </span>

                          <h2 className="text-lg font-bold text-neutral-900 leading-snug">
                            {item.name}
                          </h2>

                          <p className="mt-1 text-xs text-neutral-500 line-clamp-1">
                            {item.description || "Fresh and premium quality grocery product."}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                          className="p-1 text-neutral-400 hover:text-red-500 transition"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>

                      </div>

                      <div className="mt-4 flex items-center justify-between pt-3 border-t border-neutral-100">

                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-extrabold text-neutral-900">
                            ₹{(item.price * (item.quantity || 1)).toLocaleString("en-IN")}
                          </span>
                          {oldPrice > item.price && (
                            <span className="text-xs text-neutral-400 line-through">
                              ₹{(oldPrice * (item.quantity || 1)).toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center rounded-xl border border-neutral-300 bg-neutral-50">

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                (item.quantity || 1) - 1
                              )
                            }
                            aria-label="Decrease quantity"
                            className="p-2 text-neutral-600 hover:bg-neutral-200 rounded-l-xl transition"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="px-3.5 text-sm font-bold text-neutral-800">
                            {item.quantity || 1}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                (item.quantity || 1) + 1
                              )
                            }
                            aria-label="Increase quantity"
                            className="p-2 text-neutral-600 hover:bg-neutral-200 rounded-r-xl transition"
                          >
                            <Plus size={16} />
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

          {/* RIGHT */}

          <div>

            <div className="sticky top-24 rounded-3xl bg-white border border-neutral-200 p-6 shadow-xl shadow-neutral-200/50">

              <h2 className="text-xl font-bold text-neutral-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-3.5 text-sm">

                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between text-neutral-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-neutral-900">
                    {delivery === 0 ? <span className="text-green-600 uppercase text-xs font-bold">FREE</span> : `₹${delivery}`}
                  </span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Discount Savings</span>
                    <span>- ₹{savings.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="border-t border-neutral-200 pt-4 flex justify-between text-xl font-bold text-neutral-900">
                  <span>Total</span>
                  <span className="text-green-600">₹{total.toLocaleString("en-IN")}</span>
                </div>

              </div>

              <Link
                to="/checkout"
                className="mt-6 block w-full text-center rounded-2xl bg-green-600 py-3.5 text-base font-bold text-white hover:bg-green-700 transition shadow-lg shadow-green-600/25"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-8 space-y-3 border-t border-neutral-100 pt-6 text-xs font-medium text-neutral-600">

                <div className="flex items-center gap-2.5">
                  <Truck className="text-green-600 h-4 w-4 shrink-0" />
                  <span>Delivery within 10–20 minutes</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="text-green-600 h-4 w-4 shrink-0" />
                  <span>100% Encrypted & Secure Payments</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Tag className="text-green-600 h-4 w-4 shrink-0" />
                  <span>Member discounts applied</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <CheckCircle className="text-green-600 h-4 w-4 shrink-0" />
                  <span>Freshness & Quality Guaranteed</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Cart;