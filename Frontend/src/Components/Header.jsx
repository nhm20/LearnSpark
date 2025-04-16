import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import useAuth from "../Context/useAuth";
import Logo from "./Logo";
import { Menu, X, ShoppingCart } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);

  const handleLoginClick = async () => {
    if (user) {
      try {
        await logOut();
        navigate("/");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    } else {
      navigate("/login");
    }
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    // Trigger enhanced animation
    setIsCartAnimating(true);
    setTimeout(() => {
      setIsCartAnimating(false);
      navigate("/orders");
    }, 500); // Slightly longer animation duration
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-black text-white px-4 py-3 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo and mobile menu button - unchanged */}
        <div className="w-full flex justify-between items-center md:w-auto">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <button
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Search bar - unchanged */}
        <div
          className={`w-full md:flex-1 md:mx-8 max-w-2xl ${
            isMobileMenuOpen ? "order-first mt-4" : ""
          }`}
        >
          <SearchBar />
        </div>

        {/* Desktop navigation - only cart button changed */}
        <nav className="hidden md:flex gap-4 lg:gap-6 items-center">
          
          <button
            onClick={handleCartClick}
            className="px-4 py-2 text-lg font-medium text-gray-300 hover:text-white rounded-lg transition duration-300 flex items-center gap-1 relative"
            aria-label="Cart"
          >
            <ShoppingCart
              size={20}
              className={`transition-all duration-500 ${
                isCartAnimating
                  ? "animate-[bounce_0.5s_ease-in-out_2] text-blue-400 scale-110"
                  : "text-blue-300 hover:text-blue-400"
              }`}
            />
          </button>
          <button
            onClick={handleLoginClick}
            className="px-6 py-2 text-lg font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition duration-300 whitespace-nowrap"
          >
            {user ? "Logout" : "Login"}
          </button>
        </nav>

        {isMobileMenuOpen && (
          <div className="md:hidden w-full bg-black rounded-lg mt-2 p-4 border border-gray-900">
            <nav className="flex flex-col gap-3 items-center">
              {" "}
              {/* Added items-center here */}
              {user && (
                <button
                  onClick={handleProfileClick}
                  className="px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition duration-300 w-full text-center"
                >
                  {"Profile"}
                </button>
              )}
              <button
                onClick={handleCartClick}
                className="px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition duration-300 flex items-center gap-3 justify-center w-full"
              >
                <ShoppingCart
                  size={20}
                  className={`transition-all duration-300 ${
                    isCartAnimating
                      ? "animate-bounce text-blue-400"
                      : "text-blue-300 hover:text-blue-400"
                  }`}
                />
                <p>Cart</p>
              </button>
              <button
                onClick={handleLoginClick}
                className="px-6 py-3 text-lg font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition duration-300 w-full text-center"
              >
                {user ? "Logout" : "Login"}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
