"use client";
import { useState, useEffect } from "react";
import { isValidBarcode } from "@/lib/helpers";
import { getProductByBarcode } from "@/lib/api";
import { useRouter } from "next/navigation";

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [searching, setSearching] = useState(false);
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setSearching(true);

    // Check if input is a barcode
    if (isValidBarcode(inputValue)) {
      try {
        const result = await getProductByBarcode(inputValue);
        if (result.status === 1 && result.product) {
          // If barcode is found, navigate to product detail page
          router.push(`/product/${inputValue}`);
          setInputValue("");
          return;
        }
      } catch (error) {
        console.error("Error searching by barcode:", error);
      }
    }

    // If not a barcode or barcode not found, search by product name
    onSearch(inputValue);
    setSearching(false);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div
        className={`relative overflow-hidden rounded-full transition-all duration-300 ${
          focused ? "ring-2 ring-green-400 shadow-lg" : "shadow"
        }`}
      >
        <input
          type="text"
          placeholder="Search by product name or barcode..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full border-0 bg-gray-50 py-3 px-5 pr-12 focus:outline-none text-gray-700 placeholder-gray-400"
          disabled={searching}
        />
        <button
          type="submit"
          className={`absolute inset-y-0 right-0 flex items-center px-4 transition-colors duration-300 ${
            inputValue.trim() && !searching
              ? "text-green-600 hover:text-green-700"
              : "text-gray-400"
          }`}
          disabled={searching || !inputValue.trim()}
        >
          {searching ? (
            <div className="h-5 w-5 border-t-2 border-green-500 border-r-2 rounded-full animate-spin"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </button>

        {inputValue && !searching && (
          <button
            type="button"
            onClick={() => setInputValue("")}
            className="absolute right-12 inset-y-0 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {inputValue && !searching && isValidBarcode(inputValue) && (
        <div className="absolute mt-1 text-xs text-green-600 font-medium pl-2">
          Valid barcode detected
        </div>
      )}
    </form>
  );
};

export default SearchBar;
