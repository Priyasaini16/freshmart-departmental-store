import { useState } from "react";
import {
  Leaf,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

const COLUMNS = [
  {
    title: "Shop",
    links: ["Fresh Fruits","Vegetables","Dairy Products","Bakery","Offers"],
  },
  {
    title: "Company",
    links: ["Our story", "About Us", "Careers", "Privacy Policy", "Terms & Conditions"],
  },
  {
    title: "Support",
    links: ["Help centre", "Track order", "Delivery info", "Returns", "Contact us"],
  },
];

const SOCIALS = [
  { Icon: FaInstagram, label: "Instagram" },
  { Icon: FaXTwitter, label: "Twitter" },
  { Icon: FaFacebook, label: "Facebook" },
  { Icon: FaYoutube, label: "YouTube" },
];
export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }
    alert("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <footer className="relative bg-[#0c1f14] text-neutral-300">
      {/* Newsletter band */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 border-b border-white/10 py-16 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <h2 className="text-3xl font-medium leading-tight text-white sm:text-4xl">
              Get ₹100 OFF on your First Order
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-neutral-400">
              Subscribe to receive exclusive offers, fresh arrivals, healthy recipes and exciting discounts delivered straight to your inbox.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row lg:justify-end">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              aria-label="Email address"
              className="h-14 w-full rounded-xl border border-white/15 bg-white/5 px-5 text-sm text-white placeholder:text-neutral-500 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 sm:max-w-xs"
            />
            <button
              type="submit"
              className="group inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-xl bg-green-600 px-7 text-sm font-bold text-white transition-all duration-300 hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1f14]"
            >
              Subscribe
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
        </div>

        {/* Main footer */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-2" aria-label="FreshMart home">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-green-600 text-white">
                <Leaf className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="text-2xl font-semibold text-white">FreshMart</span>
            </a>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-neutral-400">
              Fresh groceries delivered quickly at affordable prices.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-neutral-400">
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-green-500" /> Chandigarh, India
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-green-500" /> +91 XXXXX XXXXX
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-green-500" /> support@freshmart.com
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-[15px] text-neutral-400 transition-colors duration-200 hover:text-green-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 py-8 sm:flex-row">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} FreshMart All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ Icon, label }) => (
              <a
                key={label}
                href="#top"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-neutral-400 transition-all duration-300 hover:border-green-500 hover:bg-green-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
