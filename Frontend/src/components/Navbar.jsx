import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Plane,
  Menu,
  X,
  Sun,
  Moon,
  User,
  LogOut,
  BookMarked,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/generate", label: "Plan a Trip" },
    { to: "/saved-trips", label: "Saved Trips" },
    { to: "/about", label: "About" },
  ];

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-teal-700 dark:text-teal-400"
        : "text-warm-600 dark:text-warm-300 hover:text-teal-700 dark:hover:text-teal-400"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-slate-500 dark:bg-warm-900/90 backdrop-blur-md border-b border-warm-200 dark:border-warm-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center group-hover:bg-teal-600 transition-colors">
              <Plane className="w-4 h-4 text-white" />
            </div>

            <span className="font-bold text-lg text-warm-900 dark:text-warm-50">
              Trip
              <span className="text-teal-700 dark:text-teal-400">
                Craft
              </span>
              <span className="text-orange-500"> AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-lg text-warm-500 dark:text-warm-400 hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Logged In */}
            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() =>
                    setUserMenuOpen(!userMenuOpen)
                  }
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium text-warm-700 dark:text-warm-200 hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                    <User className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                  </div>

                  <span>
                    {user.name || user.email.split("@")[0]}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-10 w-48 bg-white dark:bg-warm-800 rounded-xl shadow-card-hover border border-warm-100 dark:border-warm-700 py-1 z-50">
                    <Link
                      to="/saved-trips"
                      onClick={() =>
                        setUserMenuOpen(false)
                      }
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-warm-700 dark:text-warm-200 hover:bg-warm-50 dark:hover:bg-warm-700"
                    >
                      <BookMarked className="w-4 h-4" />
                      Saved Trips
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm font-medium text-warm-600 dark:text-warm-300 hover:text-teal-700 dark:hover:text-teal-400 transition-colors px-3 py-2"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="btn-primary text-sm py-2 px-4"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-warm-500 hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-warm-100 dark:border-warm-700 bg-white dark:bg-warm-900 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400"
                    : "text-warm-700 dark:text-warm-300 hover:bg-warm-50 dark:hover:bg-warm-800"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="pt-2 border-t border-warm-100 dark:border-warm-700">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center btn-outline text-sm py-2"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center btn-primary text-sm py-2"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}