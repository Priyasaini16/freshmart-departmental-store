import { Link } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

function Navbar() {
  return (
    <nav className="bg-red-300 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Left Section - Logo */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-green-600"
          >
            FreshMart
          </Link>
        </div>

        {/* Center Section - Navigation */}
        <div className="flex gap-8 font-medium">

         <Link
          to="/"
           className="hover:text-green-600 transition"
         >
         Home
        </Link>

        <Link
         to="/products"
          className="hover:text-green-600 transition"
        >
        Products
       </Link>

        <Link
        to="/"
         className="hover:text-green-600 transition"
        >
        Categories
       </Link>

        <Link
        to="/"
         className="hover:text-green-600 transition"
       >
        About
       </Link>

        <Link
        to="/"
         className="hover:text-green-600 transition"
       >
        Contact
       </Link>

       </div>

        {/* Right Section - Icons */}
        <div className="flex items-center gap-5">

          <FiSearch
           size={22}
           className="cursor-pointer hover:text-green-600 transition"
          />

          <FiHeart
           size={22}
           className="cursor-pointer hover:text-red-500 transition"
          />

          <Link to="/cart">
           <FiShoppingCart
            size={22}
            className="cursor-pointer hover:text-green-600 transition"
          />
         </Link>
          <Link
            to="/login"
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            <FiUser />
            Login
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;