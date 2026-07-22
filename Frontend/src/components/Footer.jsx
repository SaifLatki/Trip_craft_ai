import React from "react";
import { Link } from "react-router-dom";
import {
  Plane,
  Github,
  Twitter,
  Instagram,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-warm-900 dark:bg-warm-950 text-warm-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center">
                <Plane className="w-4 h-4 text-white" />
              </div>

              <span className="font-bold text-lg text-white">
                Trip<span className="text-teal-400">Craft</span>
                <span className="text-orange-400"> AI</span>
              </span>
            </div>

            <p className="text-sm text-warm-400 leading-relaxed">
              AI-powered travel itineraries personalized to your budget,
              interests, and travel style.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-warm-100 mb-3">Navigate</h4>

            <ul className="space-y-2 text-sm">
              {[
                ["/", "Home"],
                ["/generate", "Plan a Trip"],
                ["/saved", "Saved Trips"],
                ["/about", "About"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-warm-400 hover:text-teal-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-warm-100 mb-3">Connect</h4>

            <div className="flex gap-3">
              {[Github, Twitter, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-warm-800 flex items-center justify-center text-warm-400 hover:text-teal-400 hover:bg-warm-700 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 pt-6 border-t border-warm-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-warm-500">
          <span>
            © {new Date().getFullYear()} TripCraft AI. All rights reserved.
          </span>

          <span className="flex items-center gap-1">
            Made with{" "}
            <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for
            travelers everywhere
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;