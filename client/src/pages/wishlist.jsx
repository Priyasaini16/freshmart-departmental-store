import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "../context/wishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/toastContext";

function Wishlist() {
  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();
  const { showToast } = useToast();

  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    showToast(`${product.name} moved to cart`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="mx-auto max-w-4xl py-24 text-center">
        <Heart className="mx-auto mb-4 h-16 w-16 text-neutral-300" />
        <h2 className="text-3xl font-bold">Your Wishlist is Empty</h2>

        <p className="mt-3 text-neutral-500">
          Save products here to buy them later.
        </p>

        <Link
          to="/products"
          className="mt-8 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">
        My Wishlist ({wishlistItems.length})
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {wishlistItems.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border bg-white p-4 shadow-sm"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full rounded-xl object-cover"
            />

            <h3 className="mt-4 font-bold">
              {product.name}
            </h3>

            <p className="mt-2 font-semibold text-green-600">
              ₹{product.price}
            </p>

            <div className="mt-5 flex gap-2">

              <button
                onClick={() => moveToCart(product)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 py-2 text-white hover:bg-green-700"
              >
                <ShoppingCart size={18} />
                Move to Cart
              </button>

              <button
                onClick={() => {
                  removeFromWishlist(product.id);
                  showToast("Removed from Wishlist");
                }}
                className="rounded-xl border p-2 hover:bg-red-50"
              >
                <Trash2 className="text-red-500" size={18} />
              </button>

            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

export default Wishlist;