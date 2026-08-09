import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, Plus, Check } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useToast } from "../../context/ToastContext";

function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);
  const timerRef = useRef(null);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const wished = isInWishlist(product.id);

  const oldPrice =
    product.oldPrice || Math.round(product.price * 1.25);

  const discount =
    oldPrice > product.price
      ? Math.round(((oldPrice - product.price) / oldPrice) * 100)
      : 0;

  const handleAdd = () => {
    onAddToCart(product);

    showToast(`${product.name} added to cart`);
    setAdded(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-green-200 hover:shadow-xl">

      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-50 p-2">

        <Link to={`/product/${product.id}`} className="block h-full w-full overflow-hidden rounded-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {discount > 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-green-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
            {discount}% OFF
          </span>
        )}

        <button
          type="button"
          onClick={() => {
            toggleWishlist(product);

            showToast(
            wished
              ? "Removed from Wishlist"
              : `${product.name} added to Wishlist`
            );
          }}
          aria-label="Add to wishlist"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:scale-110 hover:text-red-500"
        >
          <Heart
            className={`h-4.5 w-4.5 ${
              wished ? "fill-red-500 text-red-500" : "text-neutral-500"
            }`}
          />
        </button>

        {product.tag && (
          <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-700 backdrop-blur border border-neutral-100 shadow-sm">
            {product.tag}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 pt-3">

        {/* Rating & Unit */}
        <div className="mb-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 font-semibold text-neutral-800">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating || "4.8"}</span>
            <span className="text-neutral-400 font-normal">({product.reviews || "150"})</span>
          </div>

          {product.unit && (
            <span className="rounded-md bg-neutral-100 px-2 py-0.5 font-medium text-neutral-600">
              {product.unit}
            </span>
          )}
        </div>

        {/* Product Name */}
        <Link to={`/product/${product.id}`} className="mt-1">
          <h3 className="line-clamp-1 text-base font-bold text-neutral-900 transition hover:text-green-600">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-500">
          {product.description || "Fresh and premium quality grocery product."}
        </p>

        {/* Delivery Badge */}
        <div className="mt-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-[11px] font-semibold text-green-700 border border-green-100">
            ⚡ Delivery in {product.delivery || "25 mins"}
          </span>
        </div>

        {/* Price & Action */}
        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">

          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-neutral-900">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {oldPrice > product.price && (
                <span className="text-xs text-neutral-400 line-through">
                  ₹{oldPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white transition-all duration-300 ${
              added
                ? "bg-emerald-600 shadow-md shadow-emerald-600/20"
                : "bg-green-600 hover:bg-green-700 shadow-md shadow-green-600/20 hover:shadow-lg"
            }`}
          >
            {added ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Added
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" />
                Add
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;