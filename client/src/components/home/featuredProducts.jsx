function FeaturedProducts() {

  const products = [
    {
      id: 1,
      name: "Fresh Apples",
      price: "₹120/kg",
      image: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg",
    },
    {
      id: 2,
      name: "Fresh Milk",
      price: "₹65",
      image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg",
    },
    {
      id: 3,
      name: "Brown Bread",
      price: "₹45",
      image: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg",
    },
    {
      id: 4,
      name: "Orange Juice",
      price: "₹99",
      image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg",
    },
    {
      id: 5,
      name: "Tomatoes",
      price: "₹40/kg",
      image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg",
    },
    {
      id: 6,
      name: "Bananas",
      price: "₹60/dozen",
      image: "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg",
    },
    {
      id: 7,
      name: "Eggs",
      price: "₹90/dozen",
      image: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg",
    },
    {
      id: 8,
      name: "Potatoes",
      price: "₹35/kg",
      image: "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg",
    },
  ];

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-gray-900">
          Featured Products
        </h2>

        <p className="text-center text-gray-500 mt-3 mb-12">
          Handpicked fresh products for your daily needs.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">

                <h3 className="text-lg font-semibold">
                  {product.name}
                </h3>

                <p className="text-green-600 font-bold mt-2">
                  {product.price}
                </p>

                <button
                  className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  Add to Cart
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedProducts;