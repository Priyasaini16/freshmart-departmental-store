import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Apple,
  Carrot,
  Milk,
  Croissant,
  Wheat,
  Candy,
  SprayCan,
  Baby,
  ArrowUpRight,
} from "lucide-react";

const CATEGORIES = [
  { name: "Fresh Fruits", count: 128, Icon: Apple, query: "Fruits" },
  { name: "Vegetables", count: 164, Icon: Carrot, query: "Vegetables" },
  { name: "Dairy & Breakfast", count: 92, Icon: Milk, query: "Dairy" },
  { name: "Bakery", count: 57, Icon: Croissant, query: "Bakery" },
  { name: "Atta, Rice & Dal", count: 74, Icon: Wheat, query: "Bakery" },
  { name: "Snacks & Drinks", count: 143, Icon: Candy, query: "Beverages" },
  { name: "Personal Care", count: 86, Icon: SprayCan, query: "All" },
  { name: "Baby Care", count: 45, Icon: Baby, query: "All" },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

function Categories() {
  return (
    <section
      id="categories"
      className="relative bg-[#f8fafc] py-20 sm:py-28 border-t border-neutral-100"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-green-600">
              Shop by Category
            </span>

            <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
              Everything for your kitchen
            </h2>

            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              Discover fresh groceries, beverages, bakery items, dairy products,
              personal care essentials, and much more.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-green-600 hover:text-green-700 transition"
          >
            Explore all categories <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6"
        >
          {CATEGORIES.map(({ name, count, Icon, query }) => (
            <motion.div key={name} variants={item}>
              <Link
                to={`/products?search=${encodeURIComponent(query)}`}
                className="group flex flex-col justify-between rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-green-300 hover:shadow-xl block h-full"
              >
                <div className="flex items-start justify-between">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-green-50 text-green-600 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-green-600/30">
                    <Icon className="h-6 w-6" />
                  </div>

                  <ArrowUpRight className="h-5 w-5 text-neutral-400 transition-all duration-300 group-hover:text-green-600 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-green-700 transition-colors">
                    {name}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-neutral-500">
                    {count}+ Products
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default Categories;