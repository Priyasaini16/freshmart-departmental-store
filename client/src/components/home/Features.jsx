import { motion } from "framer-motion";
import { Truck, Leaf, ShieldCheck, CreditCard } from "lucide-react";

const FEATURES = [
  {
    Icon: Truck,
    title: "10–20 Min Delivery",
    desc: "Fresh groceries rushed to your doorstep in lightning-fast micro-deliveries.",
  },
  {
    Icon: Leaf,
    title: "Direct Farm Fresh",
    desc: "Handpicked fruits and vegetables sourced directly from local partner growers.",
  },
  {
    Icon: ShieldCheck,
    title: "100% Quality Guaranteed",
    desc: "Strict quality checks ensure only fresh, premium items reach your kitchen.",
  },
  {
    Icon: CreditCard,
    title: "Instant & Secure Payments",
    desc: "Pay seamlessly with UPI, Debit/Credit Cards, Net Banking, or Cash on Delivery.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
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
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Features() {
  return (
    <section
      id="features"
      className="relative bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-green-600">
            Why Choose FreshMart
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Smarter Grocery Shopping
          </h2>

          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Fresh groceries, trusted brands, secure payments, and lightning-fast
            delivery — everything designed around your daily life.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map(({ Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={item}
              whileHover={{
                y: -6,
              }}
              className="flex h-full flex-col rounded-3xl border border-neutral-200/80 bg-[#f8fafc] p-8 transition-all duration-300 hover:bg-white hover:border-green-300 hover:shadow-xl"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-green-600 text-white shadow-md shadow-green-600/25">
                <Icon className="h-7 w-7" strokeWidth={2} />
              </span>

              <h3 className="mt-6 text-xl font-bold text-neutral-900">
                {title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default Features;