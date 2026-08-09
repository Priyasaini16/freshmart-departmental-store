const MARQUEE_WORDS = [
  "Farm Fresh",
  "Organic Produce",
  "10-Min Delivery",
  "Zero Waste Packaging",
  "Local Farmers",
  "Premium Quality",
  "Fresh Everyday",
  "100% Natural",
];

function Marquee() {
  return (
    <section className="overflow-hidden border-y border-neutral-200 bg-white py-5">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, index) => (
          <div
            key={index}
            className="flex items-center gap-10"
          >
            <span className="text-2xl font-semibold tracking-tight text-neutral-800">
              {word}
            </span>

            <span className="h-2 w-2 rounded-full bg-green-600"></span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Marquee;