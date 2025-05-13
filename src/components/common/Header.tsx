"use client";
import Link from "next/link";
import SearchBar from "../filters/SearchBar";
import { useProductContext } from "@/context/ProductContext";
import { useState, useEffect } from "react";

const Header = () => {
  const { handleSearch } = useProductContext();
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-lg py-2" : "shadow-md py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <Link
            href="/"
            className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors duration-300 flex items-center group"
          >
            <span className="mr-3 text-3xl group-hover:rotate-12 transition-transform duration-300">
              🍎
            </span>
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Food Products
            </span>
          </Link>

          <div className="w-full md:w-1/2 md:ml-6">
            <SearchBar onSearch={handleSearch} />
          </div>

          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href="/categories"
              className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-200"
            >
              Categories
            </Link>
            <Link
              href="/favorites"
              className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-200"
            >
              Favorites
            </Link>
            <Link
              href="/scan"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium transition-colors duration-200 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Scan
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
