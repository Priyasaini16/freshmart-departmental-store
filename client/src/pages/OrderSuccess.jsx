import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#fafafa] px-6">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-lg p-10 text-center">

        <CheckCircle className="mx-auto h-24 w-24 text-green-600" />

        <h1 className="mt-8 text-4xl font-bold text-neutral-900">
          Order Placed Successfully!
        </h1>

        <p className="mt-5 text-neutral-500 leading-7">
          Thank you for shopping with FreshMart.
          Your groceries are being prepared and will arrive shortly.
        </p>

        <div className="mt-8 rounded-2xl bg-green-50 p-6">
          <p className="text-sm text-neutral-500">
            Estimated Delivery
          </p>

          <p className="mt-2 text-3xl font-bold text-green-700">
            25 Minutes
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">

          <Link
            to="/products"
            className="flex-1 rounded-xl border border-green-600 py-4 text-center font-semibold text-green-600 hover:bg-green-50 transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="flex-1 rounded-xl bg-green-600 py-4 text-center font-semibold text-white hover:bg-green-700 transition"
          >
            Back to Home
          </Link>

        </div>

      </div>
    </section>
  );
}

export default OrderSuccess;