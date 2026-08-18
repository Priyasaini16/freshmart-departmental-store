import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../context/authContext";

const API_URL = "https://freshmart-departmental-store.onrender.com";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("freshmart_token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${API_URL}/api/orders/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch order.");
        }

        setOrder(data.order);
      } catch (error) {
        console.error("Fetch Order Error:", error);
        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-[#fafafa] px-6 py-16">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex items-center gap-3 text-neutral-500">
            <Loader2 className="h-5 w-5 animate-spin text-green-600" />
            Loading order details...
          </div>
        </div>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="min-h-screen bg-[#fafafa] px-6 py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-red-200 bg-white p-10 text-center shadow-sm">
          <Package className="mx-auto h-16 w-16 text-red-400" />

          <h1 className="mt-5 text-2xl font-bold text-neutral-900">
            Order Not Found
          </h1>

          <p className="mt-2 text-sm text-red-600">
            {error || "We couldn't find this order."}
          </p>

          <Link
            to="/orders"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Orders
          </Link>
        </div>
      </section>
    );
  }

  const orderDate = new Date(order.createdAt);

  return (
    <section className="min-h-screen bg-[#fafafa] px-6 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 transition hover:text-green-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Orders
        </Link>

        {/* Header */}
        <div className="mt-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                    Order Details
                  </h1>

                  <p className="mt-1 text-sm text-neutral-500">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                </div>
              </div>
            </div>

            <span className="inline-flex w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
              {order.orderStatus}
            </span>
          </div>

          <div className="mt-6 grid gap-4 border-t border-neutral-100 pt-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Order Date
              </p>

              <p className="mt-1 font-semibold text-neutral-900">
                {orderDate.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Order Time
              </p>

              <p className="mt-1 font-semibold text-neutral-900">
                {orderDate.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Order Status Tracker */}
        <div className="mt-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-neutral-900">
            Order Status
        </h2>

        {(() => {
            const statuses = [
            "Placed",
            "Confirmed",
            "Preparing",
            "Out for Delivery",
            "Delivered",
            ];

            const currentIndex = statuses.indexOf(order.orderStatus);

            return (
            <div className="mt-8">
                <div className="relative">

                {/* Progress Line */}
                <div className="absolute left-0 right-0 top-4 hidden h-1 bg-neutral-200 sm:block" />

                <div
                    className="absolute left-0 top-4 hidden h-1 bg-green-600 transition-all duration-500 sm:block"
                    style={{
                    width:
                        currentIndex <= 0
                        ? "0%"
                        : `${(currentIndex / (statuses.length - 1)) * 100}%`,
                    }}
                />

                <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-5 sm:gap-2">
                    {statuses.map((status, index) => {
                    const completed = index <= currentIndex;

                    return (
                        <div
                        key={status}
                        className="flex items-center gap-3 sm:flex-col sm:gap-2 sm:text-center"
                        >
                        <div
                            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-4 border-white text-xs font-bold shadow-sm ${
                            completed
                                ? "bg-green-600 text-white"
                                : "bg-neutral-200 text-neutral-500"
                            }`}
                        >
                            {completed ? "✓" : index + 1}
                        </div>

                        <span
                            className={`text-sm font-semibold ${
                            completed
                                ? "text-green-700"
                                : "text-neutral-400"
                            }`}
                        >
                            {status}
                        </span>
                        </div>
                    );
                    })}
                </div>
                </div>
            </div>
            );
        })()}
        </div>
        
        {/* Order Items */}
        <div className="mt-6 rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-100 p-6">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-green-600" />

              <h2 className="text-xl font-bold text-neutral-900">
                Items Ordered
              </h2>
            </div>
          </div>

          <div className="divide-y divide-neutral-100">
            {order.items.map((item, index) => (
              <div
                key={`${order._id}-${index}`}
                className="flex items-center gap-4 p-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-2xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-neutral-900">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-neutral-500">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                <p className="font-bold text-neutral-900">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t border-neutral-100 bg-neutral-50/60 p-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-neutral-700">
                Total Amount
              </span>

              <span className="text-2xl font-bold text-green-600">
                ₹{order.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Address + Payment */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {/* Shipping Address */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-green-600" />

              <h2 className="text-xl font-bold text-neutral-900">
                Delivery Address
              </h2>
            </div>

            <div className="mt-5 space-y-2 text-sm text-neutral-600">
              <p className="font-semibold text-neutral-900">
                {order.shippingAddress.fullName}
              </p>

              <p>{order.shippingAddress.phone}</p>

              <p>{order.shippingAddress.address}</p>

              <p>
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.state}
              </p>

              <p className="font-medium">
                PIN: {order.shippingAddress.pincode}
              </p>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-green-600" />

              <h2 className="text-xl font-bold text-neutral-900">
                Payment
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Method
                </p>

                <p className="mt-1 font-semibold text-neutral-900">
                  {order.paymentMethod === "COD"
                    ? "Cash on Delivery"
                    : "Online Payment"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Payment Status
                </p>

                <span className="mt-1 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-7 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </section>
  );
}

export default OrderDetails;