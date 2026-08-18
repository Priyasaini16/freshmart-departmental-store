import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Package,
  RefreshCw,
} from "lucide-react";

import { useAuth } from "../context/authContext";

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../clservices/adminProductServices";

const CATEGORIES = [
  "Fresh Fruits",
  "Vegetables",
  "Dairy & Breakfast",
  "Bakery",
  "Atta, Rice & Dal",
  "Snacks & Drinks",
  "Personal Care",
  "Baby Care",
  "Home & Cleaning",
];

const EMPTY_FORM = {
  name: "",
  category: "Fresh Fruits",
  price: "",
  oldPrice: "",
  unit: "",
  rating: "0",
  reviews: "0",
  stock: "In Stock",
  delivery: "25 mins",
  origin: "",
  tag: "",
  image: "",
  description: "",
};

function AdminProducts() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Admin Products Error:", error);
      setError(error.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
    setError("");
  };

  const openEditForm = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name || "",
      category: product.category || "Fresh Fruits",
      price: product.price ?? "",
      oldPrice: product.oldPrice ?? "",
      unit: product.unit || "",
      rating: product.rating ?? "0",
      reviews: product.reviews ?? "0",
      stock: product.stock || "In Stock",
      delivery: product.delivery || "25 mins",
      origin: product.origin || "",
      tag: product.tag || "",
      image: product.image || "",
      description: product.description || "",
    });

    setShowForm(true);
    setError("");
  };

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const token = localStorage.getItem("freshmart_token");

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const productData = {
        name: form.name.trim(),
        category: form.category,
        price: Number(form.price),
        oldPrice:
          form.oldPrice === "" ? null : Number(form.oldPrice),
        unit: form.unit.trim(),
        rating: Number(form.rating) || 0,
        reviews: Number(form.reviews) || 0,
        stock: form.stock.trim(),
        delivery: form.delivery.trim(),
        origin: form.origin.trim(),
        tag: form.tag.trim(),
        image: form.image.trim(),
        description: form.description.trim(),
      };

      if (!productData.name) {
        throw new Error("Product name is required.");
      }

      if (!productData.price || productData.price <= 0) {
        throw new Error("Please enter a valid price.");
      }

      if (!productData.image) {
        throw new Error("Product image URL is required.");
      }

      if (editingId) {
        const updatedProduct = await updateProduct(
          editingId,
          productData,
          token
        );

        setProducts((prev) =>
          prev.map((product) =>
            product._id === editingId
              ? updatedProduct
              : product
          )
        );

        alert("Product updated successfully.");
      } else {
        const newProduct = await createProduct(
          productData,
          token
        );

        setProducts((prev) => [newProduct, ...prev]);

        alert("Product created successfully.");
      }

      closeForm();
    } catch (error) {
      console.error("Save Product Error:", error);
      setError(error.message || "Failed to save product.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      setError("");

      const token = localStorage.getItem("freshmart_token");

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      await deleteProduct(productId, token);

      setProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );

      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Delete Product Error:", error);
      setError(error.message || "Failed to delete product.");
    }
  };

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
              Product Management
            </h1>

            <p className="mt-2 text-neutral-500">
              Add, edit, and remove FreshMart products.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={fetchProducts}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50 disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  loading ? "animate-spin" : ""
                }`}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={openAddForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              <Plus className="h-5 w-5" />
              Add Product
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center">
            <p className="text-neutral-500">
              Loading products...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && products.length === 0 && (
          <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center">
            <Package className="mx-auto h-12 w-12 text-neutral-300" />

            <h2 className="mt-4 text-lg font-semibold text-neutral-900">
              No products found
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Add your first product to FreshMart.
            </p>
          </div>
        )}

        {/* Product list */}
        {!loading && products.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">

            {/* Desktop header */}
            <div className="hidden grid-cols-[80px_1.5fr_1fr_100px_120px_160px] gap-4 border-b border-neutral-100 bg-neutral-50 px-5 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500 md:grid">
              <span>Image</span>
              <span>Product</span>
              <span>Category</span>
              <span>Price</span>
              <span>Stock</span>
              <span>Actions</span>
            </div>

            <div className="divide-y divide-neutral-100">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="grid gap-4 p-5 md:grid-cols-[80px_1.5fr_1fr_100px_120px_160px] md:items-center"
                >
                  {/* Image */}
                  <div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                  </div>

                  {/* Product */}
                  <div className="min-w-0">
                    <h3 className="font-semibold text-neutral-900">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      {product.unit || "—"}
                    </p>
                  </div>

                  {/* Category */}
                  <div>
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      {product.category}
                    </span>
                  </div>

                  {/* Price */}
                  <div>
                    <p className="font-bold text-neutral-900">
                      ₹{product.price}
                    </p>

                    {product.oldPrice && (
                      <p className="text-xs text-neutral-400 line-through">
                        ₹{product.oldPrice}
                      </p>
                    )}
                  </div>

                  {/* Stock */}
                  <div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        product.stock === "In Stock"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEditForm(product)}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(product._id)}
                      className="inline-flex items-center justify-center rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                      aria-label={`Delete ${product.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-100 bg-white px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    {editingId
                      ? "Edit Product"
                      : "Add New Product"}
                  </h2>

                  <p className="mt-1 text-sm text-neutral-500">
                    Enter the product information below.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="rounded-xl p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-6 p-6"
              >
                <div className="grid gap-5 sm:grid-cols-2">

                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Product Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Fresh Apples"
                      required
                      className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Category *
                    </label>

                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none focus:border-green-600"
                    >
                      {CATEGORIES.map((category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Price *
                    </label>

                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="120"
                      min="0"
                      required
                      className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none focus:border-green-600"
                    />
                  </div>

                  {/* Old Price */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Old Price
                    </label>

                    <input
                      type="number"
                      name="oldPrice"
                      value={form.oldPrice}
                      onChange={handleChange}
                      placeholder="150"
                      min="0"
                      className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none focus:border-green-600"
                    />
                  </div>

                  {/* Unit */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Unit
                    </label>

                    <input
                      type="text"
                      name="unit"
                      value={form.unit}
                      onChange={handleChange}
                      placeholder="1 kg"
                      className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none focus:border-green-600"
                    />
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Stock
                    </label>

                    <input
                      type="text"
                      name="stock"
                      value={form.stock}
                      onChange={handleChange}
                      placeholder="In Stock"
                      className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none focus:border-green-600"
                    />
                  </div>

                  {/* Delivery */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Delivery
                    </label>

                    <input
                      type="text"
                      name="delivery"
                      value={form.delivery}
                      onChange={handleChange}
                      placeholder="25 mins"
                      className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none focus:border-green-600"
                    />
                  </div>

                  {/* Origin */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Origin
                    </label>

                    <input
                      type="text"
                      name="origin"
                      value={form.origin}
                      onChange={handleChange}
                      placeholder="Himachal Pradesh"
                      className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none focus:border-green-600"
                    />
                  </div>

                  {/* Tag */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Tag
                    </label>

                    <input
                      type="text"
                      name="tag"
                      value={form.tag}
                      onChange={handleChange}
                      placeholder="Fresh"
                      className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none focus:border-green-600"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Rating
                    </label>

                    <input
                      type="number"
                      name="rating"
                      value={form.rating}
                      onChange={handleChange}
                      min="0"
                      max="5"
                      step="0.1"
                      className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none focus:border-green-600"
                    />
                  </div>

                  {/* Reviews */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Reviews
                    </label>

                    <input
                      type="number"
                      name="reviews"
                      value={form.reviews}
                      onChange={handleChange}
                      min="0"
                      className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none focus:border-green-600"
                    />
                  </div>

                  {/* Image */}
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Image URL *
                    </label>

                    <input
                      type="url"
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      placeholder="https://example.com/product.jpg"
                      required
                      className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none focus:border-green-600"
                    />
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Describe the product..."
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-green-600"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col-reverse gap-3 border-t border-neutral-100 pt-5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeForm}
                    disabled={saving}
                    className="rounded-xl border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                  >
                    {saving
                      ? "Saving..."
                      : editingId
                      ? "Update Product"
                      : "Create Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminProducts;