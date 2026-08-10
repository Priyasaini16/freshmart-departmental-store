import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Marquee from "../components/home/Marquee";
import Manifesto from "../components/home/Manifesto";

function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <Marquee />
      <Features />
      <Categories />
      <Manifesto />
      <FeaturedProducts />
    </main>
  );
}

export default Home;
