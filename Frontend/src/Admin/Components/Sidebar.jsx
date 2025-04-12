import React, { useState } from "react";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  LogOut,
  LogIn,
  Menu,
  X,
  ShoppingCart,
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
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      key: "courses",
      label: "Courses",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      key: "users",
      label: "Users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      key: "tutors",
      label: "Tutors",
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      key: "orders",
      label: "Orders",
      icon: <ShoppingCart className="w-5 h-5" />,
    }
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

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-48 text-white transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen
            ? "translate-x-0 shadow-xl"
            : "-translate-x-full md:translate-x-0"
        }`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full justify-between py-8 px-4 relative">
          {/* Vertical border line */}
          <div className="absolute top-8 bottom-8 right-0 w-px bg-gray-700" />

          <div className="space-y-8">
            {/* Logo */}
            <div className="mb-2">
              <h1 className="text-2xl text-center text-white">LearnSpark</h1>
            </div>

            {/* Profile */}
            <div className="flex flex-col items-center text-center space-y-2">
              <img
                src="https://i.pravatar.cc/100"
                alt="profile"
                className="w-16 h-16 rounded-full border-2 border-gray-600"
              />
              <p className="font-semibold">Louis Carter</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.key}
                  to={`/admin/${item.key}`}
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

          {/* Bottom Controls */}
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
