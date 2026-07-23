// import heroBanner from "../../assets/images/hero/hero-banner.png";
function Hero() {
  return (
    <section className="bg-green-50 py-12">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-12">

        {/* Left Content */}
        <div className="max-w-xl">

          {/* Top Badge */}
          <div className="inline-flex items-center bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-semibold mb-8">
            🌿 Big Savings • Great Quality
          </div>

          {/* Heading */}
          <h1 className="text-[64px] font-bold leading-[1.1] text-gray-900">
            Everything Your Home
            <br />
            Needs,
            <br />
            <span className="text-green-600">
              Delivered Fresh.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 text-gray-600 text-xl leading-9">
            Shop from thousands of products including fresh fruits,
            vegetables, dairy, snacks, beverages, household essentials,
            personal care and much more — all delivered to your doorstep.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex gap-5">

            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition">
              Shop Now →
            </button>

            <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition">
              Browse Categories →
            </button>

          </div>

          {/* Trust Points */}
          <div className="mt-10 flex gap-10 text-gray-700 font-medium">

            <div className="flex items-center gap-2">
              ✅ <span>100% Secure</span>
            </div>

            <div className="flex items-center gap-2">
              🔄 <span>Easy Returns</span>
            </div>

            <div className="flex items-center gap-2">
              🎧 <span>24/7 Support</span>
            </div>

          </div>

        </div>

        {/* Right Image */}
        <div className="relative">

          <img
            src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg"
            alt="FreshMart"
            className="w-[560px] h-[430px] object-cover rounded-[28px] shadow-xl"
          />

          {/* Green Circle */}
          <div className="absolute top-6 right-6 w-36 h-36 bg-green-700 rounded-full flex items-center justify-center text-center text-white font-semibold leading-7 shadow-xl">
            Fresh
            <br />
            Quality
            <br />
            You Can
            <br />
            Trust
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;