import { motion } from "framer-motion";

const CHAPTERS = [
  {
    no: "01",
    title: "Dawn Market Sourcing",
    body:
      "Every morning our buyers hand-select produce at peak ripeness directly from trusted local growers — no long warehouse storage.",
  },
  {
    no: "02",
    title: "Smart Cold Chain Control",
    body:
      "From farm to doorstep, our temperature-monitored fleet keeps vegetables crisp, dairy fresh and fruits naturally sweet.",
  },
  {
    no: "03",
    title: "Micro-Fulfilment Network",
    body:
      "Neighbourhood hubs ensure your groceries travel only a few kilometres, reaching you in minutes in perfect condition.",
  },
];

function Manifesto() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0c1f14] py-20 text-white sm:py-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-32 top-10 h-[500px] w-[500px] rounded-full bg-green-500/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-green-400">
            FreshMart Promise
          </span>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Good food shouldn&apos;t
            <br />
            be complicated.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            We believe grocery shopping should feel effortless. Premium quality,
            honest pricing, and lightning-fast delivery — all built for your lifestyle.
          </p>
        </div>

        <div className="mt-16 divide-y divide-white/10 border-t border-white/10">
          {CHAPTERS.map((item, index) => (
            <motion.div
              key={item.no}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              className="grid gap-6 py-8 lg:grid-cols-[100px_1fr_1fr] lg:py-10"
            >
              <span className="text-xl font-bold text-green-400">
                {item.no}
              </span>

              <h3 className="text-xl sm:text-2xl font-bold leading-snug text-white">
                {item.title}
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-neutral-400">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Manifesto;