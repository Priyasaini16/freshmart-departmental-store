import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, Truck, ShieldCheck, Timer, Leaf } from "lucide-react";

const HEADLINE = ["Fresh groceries,", "delivered before", "you finish the list."];

const lineParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const lineChild = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const STATS = [
  { value: "60k+", label: "Happy shoppers" },
  { value: "10 min", label: "Avg. delivery" },
  { value: "4.9★", label: "App rating" },
];

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-green-50/40 via-white to-white py-12 lg:py-20"
    >
      {/* Decorative background glows */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-[480px] w-[480px] rounded-full bg-green-200/30 blur-[100px]" />
      <div className="pointer-events-none absolute right-[-100px] top-32 h-[420px] w-[420px] rounded-full bg-emerald-100/50 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-8">
        {/* Left column */}
        <div className="z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-green-700 shadow-sm backdrop-blur-sm"
          >
            <Leaf className="h-4 w-4 text-green-600" strokeWidth={2.5} />
            Farm Fresh • Delivered in 10 Minutes
          </motion.div>

          <motion.h1
            variants={lineParent}
            initial="hidden"
            animate="show"
            className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-neutral-900 sm:text-6xl lg:text-[62px]"
          >
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-1">
                <motion.span variants={lineChild} className="block">
                  {i === 2 ? (
                    <>
                      you finish the <span className="text-green-600 underline decoration-green-300 decoration-wavy underline-offset-8">list.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.55 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-600"
          >
            Handpicked produce, everyday essentials and chef-loved ingredients — sourced
            from local farms and rushed to your door while they&apos;re still perfectly ripe.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.68 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link
              to="/products"
              className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-2xl bg-green-600 px-8 text-base font-bold text-white shadow-xl shadow-green-600/25 transition-all duration-300 hover:bg-green-700 hover:shadow-2xl hover:shadow-green-600/35 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
            >
              Start Shopping
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="#categories"
              className="inline-flex h-14 items-center justify-center rounded-2xl border border-neutral-200 bg-white px-8 text-base font-bold text-neutral-800 shadow-sm transition-all duration-300 hover:border-green-600 hover:text-green-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
            >
              Browse Categories
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-neutral-600 border-t border-neutral-100 pt-6"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-green-600" /> Freshness guaranteed
            </span>
            <span className="inline-flex items-center gap-2">
              <Truck className="h-4.5 w-4.5 text-green-600" /> Free delivery above ₹499
            </span>
            <span className="inline-flex items-center gap-2">
              <Timer className="h-4.5 w-4.5 text-green-600" /> Live order tracking
            </span>
          </motion.div>

          {/* Stats */}
          <motion.dl
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.92 }}
            className="mt-8 grid max-w-md grid-cols-3 gap-6"
          >
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl bg-neutral-50/80 p-3.5 border border-neutral-100">
                <dt className="text-2xl font-bold text-neutral-900">{s.value}</dt>
                <dd className="mt-0.5 text-xs font-semibold text-neutral-500">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Right column — spotlight image + floating cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-[36px] bg-neutral-100 p-2 shadow-2xl shadow-green-900/10 border border-neutral-200/80">
            <motion.img
              style={{ y: imgY }}
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
              alt="A basket overflowing with fresh farm produce"
              className="h-[480px] w-full rounded-[30px] object-cover sm:h-[540px]"
            />
            <div className="absolute inset-0 rounded-[36px] bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating card — delivery */}
          <motion.div
            style={{ y: badgeY }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="absolute -left-4 top-12 flex items-center gap-3.5 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur-md sm:-left-8"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-green-600 text-white shadow-md shadow-green-600/30">
              <Timer className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-neutral-900">Arriving in 8 min</p>
              <p className="text-xs text-neutral-500">Your order is on the way</p>
            </div>
          </motion.div>

          {/* Floating card — rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="absolute -bottom-6 right-2 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur-md sm:-right-4"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mt-1 text-sm font-bold text-neutral-900">Trusted by 60,000+ Families</p>
            <p className="text-xs text-neutral-500">Fresh groceries delivered every day.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
