import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Clock, Truck, CheckCircle, RefreshCw } from "lucide-react";
import { useAuth } from "../context/authContext";
import {
  getAllOrders,
  updateOrderStatus,
} from "../clservices/adminOrderServices";

const ORDER_STATUSES = [
  "Placed",
  "Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

function AdminDashboard() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("freshmart_token");

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const data = await getAllOrders(token);
      setOrders(data);
    } catch (error) {
      console.error("Admin Orders Error:", error);
      setError(error.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      const token = localStorage.getItem("freshmart_token");

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const updatedOrder = await updateOrderStatus(
        orderId,
        status,
        token
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error("Update Status Error:", error);
      alert(error.message || "Failed to update order status.");
    }
  };

  const totalOrders = orders.length;

  const placedOrders = orders.filter(
    (order) => order.orderStatus === "Placed"
  ).length;

  const preparingOrders = orders.filter(
    (order) =>
      order.orderStatus === "Confirmed" ||
      order.orderStatus === "Preparing"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;

  return (
    <section className="min-h-screen bg-[#fafafa] px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-green-600">
              Admin Panel
            </p>

            <h1 className="mt-1 text-3xl font-bold text-neutral-900">
              Welcome, {user?.name || "Admin"}
            </h1>

            <p className="mt-2 text-neutral-500">
              Manage FreshMart orders from here.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
                to="/admin/products"
                className="inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
                Manage Products
            </Link>

            <button
                type="button"
                onClick={fetchOrders}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50"
            >
                <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh Orders
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">
                  Total Orders
                </p>

                <p className="mt-2 text-3xl font-bold text-neutral-900">
                  {totalOrders}
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-3">
                <Package className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">
                  New Orders
                </p>

                <p className="mt-2 text-3xl font-bold text-neutral-900">
                  {placedOrders}
                </p>
              </div>

              <div className="rounded-xl bg-yellow-50 p-3">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">
                  Preparing
                </p>

                <p className="mt-2 text-3xl font-bold text-neutral-900">
                  {preparingOrders}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">
                  Delivered
                </p>

                <p className="mt-2 text-3xl font-bold text-neutral-900">
                  {deliveredOrders}
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

        </div>

        {/* Orders */}
        <div className="mt-8">

          <div className="mb-5">
            <h2 className="text-2xl font-bold text-neutral-900">
              All Orders
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              View and manage customer orders.
            </p>
          </div>

          {loading && (
            <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center">
              <p className="text-neutral-500">
                Loading orders...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && orders.length === 0 && (
            <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center">
              <Package className="mx-auto h-12 w-12 text-neutral-300" />

              <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                No orders yet
              </h3>

              <p className="mt-1 text-sm text-neutral-500">
                Customer orders will appear here.
              </p>
            </div>
          )}

          {!loading && !error && orders.length > 0 && (
            <div className="space-y-5">

              {orders.map((order) => (
                <div
                  key={order._id}
                  className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
                >

                  {/* Order header */}
                  <div className="flex flex-col gap-4 border-b border-neutral-100 bg-neutral-50/70 p-5 lg:flex-row lg:items-center lg:justify-between">

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Order ID
                      </p>

                      <p className="mt-1 font-bold text-neutral-900">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Customer
                      </p>

                      <p className="mt-1 font-semibold text-neutral-900">
                        {order.user?.name || "Unknown User"}
                      </p>

                      <p className="text-sm text-neutral-500">
                        {order.user?.email || ""}
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
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Total
                      </p>

                      <p className="mt-1 text-xl font-bold text-green-600">
                        ₹{Number(order.totalAmount || 0).toFixed(2)}
                      </p>
                    </div>

                  </div>

                  {/* Products */}
                  <div className="divide-y divide-neutral-100">

                    {order.items?.map((item, index) => (
                      <div
                        key={`${order._id}-${index}`}
                        className="flex items-center gap-4 p-5"
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-14 w-14 rounded-xl object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-neutral-900">
                            {item.name}
                          </p>

                          <p className="mt-1 text-sm text-neutral-500">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>

                        <p className="font-semibold text-neutral-900">
                          ₹
                          {(
                            Number(item.price) *
                            Number(item.quantity)
                          ).toFixed(2)}
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

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

                      <label
                        htmlFor={`status-${order._id}`}
                        className="text-sm font-semibold text-neutral-600"
                      >
                        Order Status
                      </label>

                      <select
                        id={`status-${order._id}`}
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value
                          )
                        }
                        className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;