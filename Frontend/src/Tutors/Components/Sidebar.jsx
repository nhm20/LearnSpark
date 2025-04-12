import React, { useState } from "react";
import {
  Home,
  LineChart,
  ListOrdered,
  LogOut,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import useAuth from "../../Context/useAuth";

const Sidebar = () => {
  const { user, logOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLoginClick = async () => {
    if (user) {
      try {
        await logOut();
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      path: "/tutor/dashboard",
    },
    {
      key: "history",
      label: "History",
      icon: <ListOrdered className="w-5 h-5" />,
      path: "/tutor/history",
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-white hover:bg-gray-800 transition-colors shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#07001E] text-white transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen
            ? "translate-x-0 shadow-xl"
            : "-translate-x-full md:translate-x-0"
        }`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full justify-between py-8 px-4 relative">
          {/* Border Line */}
          <div className="hidden md:block absolute top-8 bottom-8 right-0 w-px bg-gray-700" />

          {/* Nav content */}
          <div className="space-y-8">
            <div className="mb-2">
              <h1 className="text-2xl text-center text-white">LearnSpark</h1>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.key}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition ${
                      isActive
                        ? "text-white font-semibold bg-gray-800"
                        : "text-gray-500 hover:text-white hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <p className="text-sm font-medium">{item.label}</p>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Login/Logout Button */}
          <div className="mt-8 mb-4">
            <button
              onClick={handleLoginClick}
              className="flex items-center justify-start gap-3 w-full px-4 py-3 mx-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              {user ? (
                <LogOut className="w-5 h-5" />
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              <p className="text-sm font-medium">{user ? "Logout" : "Login"}</p>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
