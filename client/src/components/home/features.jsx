import {
  Truck,
  Leaf,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Get groceries delivered quickly to your doorstep.",
    },
    {
      icon: Leaf,
      title: "Farm Fresh",
      description: "Fresh fruits, vegetables and dairy every day.",
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Pay safely with multiple payment options.",
    },
    {
      icon: ShieldCheck,
      title: "Premium Quality",
      description: "Trusted brands with guaranteed quality.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-gray-900">
          Why Choose FreshMart?
        </h2>

        <p className="text-center text-gray-500 mt-3 mb-12">
          Fresh groceries, trusted brands and the best shopping experience.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">

                  <Icon
                    size={32}
                    className="text-green-600"
                  />

                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-500">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Features;