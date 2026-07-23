function Categories() {
  const categories = [
    { emoji: "🥦", name: "Fruits & Vegetables" },
    { emoji: "🥛", name: "Dairy & Breakfast" },
    { emoji: "🍞", name: "Bakery" },
    { emoji: "🍚", name: "Atta, Rice & Dal" },
    { emoji: "🍿", name: "Snacks & Munchies" },
    { emoji: "🥤", name: "Cold Drinks" },
    { emoji: "🌶️", name: "Masalas & Oils" },
    { emoji: "🍪", name: "Biscuits" },
    { emoji: "🧴", name: "Personal Care" },
    { emoji: "🧹", name: "Cleaning Essentials" },
    { emoji: "👶", name: "Baby Care" },
    { emoji: "🐶", name: "Pet Care" },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold text-gray-900">
            Shop by Categories
          </h2>

          <p className="text-gray-500 mt-3 text-lg">
            Everything you need for your daily life.
          </p>

        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {categories.map((category, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-8 text-center cursor-pointer hover:-translate-y-2"
            >

              <div className="text-6xl">
                {category.emoji}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-800">
                {category.name}
              </h3>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Categories;