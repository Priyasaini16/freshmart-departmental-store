import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, X, MapPin, Leaf } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { products } from "../../data/products";

const NAV_LINKS = [
  { label: "Categories", href: "/#categories" },
  { label: "Deals", href: "/#featured" },
  { label: "Why us", href: "/#features" },
  { label: "About", href: "/#about" },
];

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const { wishlistCount } = useWishlist();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredSuggestions =
  searchQuery.trim() === ""
    ? []
    : products
        .filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5);

  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" || e.type === "submit") {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery("");
        setMobileOpen(false);
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-neutral-100 bg-white/80 backdrop-blur-xl"
          : "border-b border-transparent bg-white/40 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center gap-4 px-6 lg:gap-8 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          aria-label="FreshMart home"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-green-600 text-white">
            <Leaf className="h-5 w-5" strokeWidth={2} />
          </span>

          <span className="text-2xl font-semibold tracking-tight text-neutral-900">
            FreshMart
          </span>
        </Link>

        {/* Location pill (desktop) */}
        <button
          type="button"
          className="hidden items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-200 xl:flex"
        >
          <MapPin className="h-3.5 w-3.5 text-green-600" />
          Deliver to Your Location
        </button>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative hidden flex-1 md:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search groceries..."
            aria-label="Search products"
            className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50/80 pl-11 pr-4 text-sm text-neutral-800 placeholder:text-neutral-400 transition-all duration-300 focus:border-green-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600/20"
          />
          {filteredSuggestions.length > 0 && (
  <div className="absolute left-0 right-0 top-14 z-50 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
    {filteredSuggestions.map((product) => (
      <Link
        key={product.id}
        to={`/product/${product.id}`}
        onClick={() => setSearchQuery("")}
        className="flex items-center gap-3 border-b border-neutral-100 p-3 transition hover:bg-neutral-50"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-12 w-12 rounded-lg object-cover"
        />

        <div className="flex-1">
          <p className="font-semibold text-neutral-900">
            {product.name}
          </p>

          <p className="text-xs text-neutral-500">
            {product.category}
          </p>
        </div>

        <span className="font-bold text-green-600">
          ₹{product.price}
        </span>
      </Link>
    ))}
  </div>
)}
        </form>

        {/* Desktop links */}
        <div className="ml-auto hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-neutral-600 transition-colors duration-200 hover:text-green-600"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative grid h-11 w-11 place-items-center rounded-xl text-neutral-700 transition-colors duration-200 hover:bg-neutral-100 hover:text-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
          >
            <Heart className="h-[21px] w-[21px]" />

            {wishlistCount > 0 && (
              <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-neutral-900 px-1 text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid h-11 w-11 place-items-center rounded-xl text-neutral-700 transition-colors duration-200 hover:bg-neutral-100 hover:text-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
          >
            <ShoppingBag className="h-[21px] w-[21px]" />
            {totalItems > 0 && (
              <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-green-600 px-1 text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            to="/login"
            className="hidden sm:flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition text-sm font-semibold"
          >
            <User className="w-4 h-4" />
            Account
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-xl text-neutral-800 transition-colors hover:bg-neutral-100 lg:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-neutral-100 bg-white lg:hidden"
          >
            <div className="space-y-1 px-6 py-5">
              <form onSubmit={handleSearchSubmit} className="relative mb-4 md:hidden">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-400" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search groceries…"
                  aria-label="Search products"
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-11 pr-4 text-sm focus:border-green-600 focus:outline-none"
                />
              </form>
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-neutral-800 transition-colors hover:bg-neutral-100"
                >
                  {l.label}
                </a>
              ))}
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 text-sm font-semibold text-white"
              >
                <User className="h-[18px] w-[18px]" /> Sign in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
