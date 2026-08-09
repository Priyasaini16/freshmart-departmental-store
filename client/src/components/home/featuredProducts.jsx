import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { CartContext } from "../../context/CartContext";
import { products } from "../../data/products";
import ProductCard from "../product/ProductCard";

function FeaturedProducts() {
  const { addToCart } = useContext(CartContext);

  const featured = products.slice(0, 8);

  return (
    <section
      id="featured"
      className="relative bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-green-600">
              Handpicked Daily
            </span>

            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
              This Week&apos;s Freshest Picks
            </h2>

            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              Sourced from trusted farms and top brands to deliver freshness,
              quality, and value right to your doorstep.
            </p>
          </div>

          <Link
            to="/products"
            className="group inline-flex shrink-0 items-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-3.5 text-sm font-bold text-neutral-900 transition-all duration-300 hover:border-green-600 hover:bg-green-600 hover:text-white hover:shadow-lg hover:shadow-green-600/20"
          >
            View All Products
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featured.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={addToCart}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default FeaturedProducts;