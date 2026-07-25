import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  return (
    <nav className="bg-white shadow-md">
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

        <Link to="/products">
          <FiHeart
           size={22}
           className="cursor-pointer hover:text-green-600 transition duration-300"
          />
        </Link>

        <div className="relative">
          <Link to="/cart">
           <FiShoppingCart
            size={24}
            className="cursor-pointer hover:text-green-600 transition"
          />
         </Link>

        {cartItems.length > 0 && (

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

           {cartItems.length}

        </span>

      )}

    </div>

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