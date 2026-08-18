import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  ArrowLeft,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import { useAuth } from "../context/authContext";

const API_URL = "https://freshmart-departmental-store.onrender.com";

function Orders() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("freshmart_token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `${API_URL}/api/orders/my-orders`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch orders.");
        }

        setOrders(data.orders || []);
      } catch (error) {
        console.error("Fetch Orders Error:", error);
        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className="min-h-screen bg-[#fafafa] px-6 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-green-600 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-green-100">
              <Package className="h-6 w-6 text-green-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-neutral-900">
                My Orders
              </h1>

              <p className="mt-1 text-sm text-neutral-500">
                Welcome back, {user?.name || "User"}
              </p>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex items-center gap-3 text-neutral-500">
              <Loader2 className="h-5 w-5 animate-spin text-green-600" />
              Loading your orders...
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-semibold text-red-700">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && orders.length === 0 && (
          <div className="rounded-3xl border border-neutral-200 bg-white px-6 py-16 text-center shadow-sm">
            <ShoppingBag className="mx-auto h-16 w-16 text-neutral-300" />

            <h2 className="mt-6 text-2xl font-bold text-neutral-900">
              No orders yet
            </h2>

            <p className="mt-2 text-neutral-500">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-flex rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Start Shopping
            </Link>
          </div>
        )}

        {/* Orders */}
        {!loading && !error && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}
                className="block overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Order Header */}
                <div className="flex flex-col gap-4 border-b border-neutral-100 bg-neutral-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Order ID
                    </p>

                    <p className="mt-1 font-semibold text-neutral-900">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Date
                    </p>

                    <p className="mt-1 text-sm font-medium text-neutral-800">
                      {new Date(order.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <div>
                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Products */}
                <div className="divide-y divide-neutral-100">
                  {order.items.map((item, index) => (
                    <div
                      key={`${order._id}-${index}`}
                      className="flex items-center gap-4 p-5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-neutral-900">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-sm text-neutral-500">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>

                      <p className="font-bold text-neutral-900">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-4 border-t border-neutral-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-neutral-500">
                      Payment
                    </p>

                    <p className="mt-1 font-semibold text-neutral-800">
                      {order.paymentMethod}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-sm text-neutral-500">
                      Total Amount
                    </p>

                    <p className="mt-1 text-xl font-bold text-green-600">
                      ₹{order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Orders;