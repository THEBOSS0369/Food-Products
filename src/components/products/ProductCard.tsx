"use client";
import Image from "next/image";
import Link from "next/link";
import { formatCategoryName, getNutritionGradeColor } from "@/lib/helpers";

const ProductCard = ({ product }) => {
  const { barcode, name, image, brand, categories, nutriScore } = product;

  // Handle category display
  const categoryNames = categories
    ? categories.split(",")[0]
    : "Unknown Category";

  // Format category for display
  const displayCategory = formatCategoryName(categoryNames);

  return (
    <Link
      href={`/product/${barcode}`}
      className="group bg-white rounded-xl shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative h-52 bg-gray-50">
        {/* Product Image */}
        <div className="relative w-full h-full">
          <Image
            src={image || "/images/placeholder.png"}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/placeholder.png";
            }}
          />
        </div>

        {/* Brand Badge */}
        {brand && (
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
            {brand}
          </div>
        )}

        {/* Nutrition Score Badge */}
        {nutriScore && nutriScore !== "unknown" && (
          <div
            className={`absolute top-2 right-2 w-10 h-10 rounded-full flex items-center justify-center text-stone-400 font-bold text-sm shadow-md transition-transform duration-300 group-hover:scale-110 ${getNutritionGradeColor(nutriScore)}`}
          >
            {nutriScore.toUpperCase()}
          </div>
        )}
      </div>

      <div className="flex-1 p-5 border-t border-gray-100">
        {/* Product Name */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
          {name || "Unknown Product"}
        </h3>

        {/* Category */}
        <div className="flex items-center mb-4">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
          <p className="text-sm text-gray-600">{displayCategory}</p>
        </div>

        {/* View Details Button */}
        <div className="mt-auto pt-2 border-t border-gray-100">
          <span className="inline-flex items-center text-green-600 text-sm font-medium group-hover:text-green-700 transition-colors duration-200">
            View Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
