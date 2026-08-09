import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { products } from "../data/products";
import {
  Star,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
  ArrowLeft,
} from "lucide-react";
import ProductCard from "../components/product/ProductCard";
import { useToast } from "../context/ToastContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  const { showToast } = useToast();

  const product = products.find(
  (item) => item._id === id || item.id === id
  );

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product?.category &&
        item.id !== product?.id
    )
    .slice(0, 4);

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold text-neutral-900">
          Product Not Found
        </h1>

        <p className="mt-4 text-neutral-600">
          The product you are looking for does not exist or has been removed.
        </p>

        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Products
        </Link>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  return (
    <section className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Back Button */}
        <Link
          to="/products"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-green-600 transition hover:text-green-700"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to All Products
        </Link>

        {/* Product Details */}
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left - Product Image */}
          <div>
            <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-xl">
              <img
                src={product.image}
                alt={product.name}
                className="h-[520px] w-full object-cover"
              />
            </div>
          </div>

          {/* Right - Product Information */}
          <div>

            {/* Category + Discount */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                {product.category}
              </span>

              {product.oldPrice && (
                <span className="rounded-full bg-red-100 px-3 py-2 text-sm font-semibold text-red-600">
                  Save ₹{product.oldPrice - product.price}
                </span>
              )}
            </div>

            {/* Product Name */}
            <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                <span className="font-semibold">
                  {product.rating}
                </span>
              </div>

              <span className="text-gray-500">
                ({product.reviews} Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-8 flex items-end gap-4">
              <h2 className="text-4xl font-bold text-green-600 sm:text-5xl">
                ₹{product.price}
              </h2>

              {product.oldPrice && (
                <span className="text-2xl text-gray-400 line-through">
                  ₹{product.oldPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-8 text-lg leading-8 text-gray-600">
              {product.description}
            </p>

            {/* Product Information */}
            <div className="mt-10 space-y-4 text-neutral-700">

              {/* Delivery */}
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-green-600" />

                <span>
                  Delivery in {product.delivery || "25 mins"}
                </span>
              </div>

              {/* Fresh Guarantee */}
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-green-600" />

                <span>100% Fresh Guarantee</span>
              </div>

              {/* Origin */}
              {product.origin && (
                <div>
                  <span className="font-semibold">
                    Origin:
                  </span>{" "}
                  {product.origin}
                </div>
              )}

              {/* Stock */}
              <div>
                <span className="font-semibold">
                  Stock:
                </span>{" "}

                <span className="font-semibold text-green-600">
                  {product.stock || "In Stock"}
                </span>
              </div>

              {/* Unit */}
              {product.unit && (
                <div>
                  <span className="font-semibold">
                    Unit:
                  </span>{" "}
                  {product.unit}
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="mt-10 flex items-center gap-5">

              {/* Decrease */}
              <button
                type="button"
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(quantity - 1)
                }
                aria-label="Decrease quantity"
                className="rounded-xl bg-gray-200 p-3 transition hover:bg-gray-300"
              >
                <Minus className="h-5 w-5" />
              </button>

              {/* Quantity Number */}
              <span className="px-2 text-2xl font-bold">
                {quantity}
              </span>

              {/* Increase */}
              <button
                type="button"
                onClick={() =>
                  setQuantity(quantity + 1)
                }
                aria-label="Increase quantity"
                className="rounded-xl bg-gray-200 p-3 transition hover:bg-gray-300"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            {/* Buttons */}
            <div className="mt-12 flex flex-col gap-5 sm:flex-row">

              {/* Add To Cart */}
              <button
                type="button"
                onClick={() => {
                  addToCart(product, quantity);
                  showToast(
                    `${product.name} added to cart`
                  );
                }}
                className="flex-1 rounded-2xl bg-green-600 px-8 py-4 text-center text-lg font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
              >
                Add to Cart
              </button>

              {/* Buy Now */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 rounded-2xl border-2 border-green-600 px-8 py-4 text-center text-lg font-semibold text-green-600 transition hover:bg-green-600 hover:text-white"
              >
                Buy Now
              </button>

            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">

            <h2 className="mb-8 text-3xl font-bold text-neutral-900">
              You May Also Like
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onAddToCart={addToCart}
                />
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default ProductDetails;