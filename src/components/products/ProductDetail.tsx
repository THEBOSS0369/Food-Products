"use client";

import Image from "next/image";
import Link from "next/link";
import {
  getNutritionGradeColor,
  parseIngredients,
  formatNutritionValue,
} from "@/lib/helpers";
import { useState } from "react";

const ProductDetail = ({ product }) => {
  const [activeTab, setActiveTab] = useState("nutrition");

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md p-8">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-xl font-semibold text-gray-700">
          Product not found
        </h2>
        <p className="text-gray-500 mt-2">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/"
          className="mt-6 px-5 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
        >
          Back to products
        </Link>
      </div>
    );
  }

  const {
    name,
    barcode,
    image,
    brand,
    categories,
    ingredients,
    nutriScore,
    nutritionData,
    labels,
    quantity,
  } = product;

  // Parse ingredients list
  const ingredientsList = parseIngredients(ingredients);

  // Parse labels
  const labelsList = labels
    ? labels.split(",").map((label) => label.trim())
    : [];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Product Header Section */}
      <div className="relative bg-gradient-to-r from-green-50 to-green-100 pt-6 pb-6 px-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors duration-200 mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to products
        </Link>

        <div className="flex flex-col lg:flex-row">
          {/* Product Image */}
          <div className="lg:w-1/3 mb-6 lg:mb-0 pr-0 lg:pr-6">
            <div className="relative h-64 md:h-80 bg-white rounded-xl overflow-hidden shadow-md">
              <Image
                src={image || "/images/placeholder.png"}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-contain p-4"
                priority
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/placeholder.png";
                }}
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="lg:w-2/3">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="mb-4 md:mb-0">
                {brand && (
                  <div className="inline-block bg-white text-gray-700 rounded-full px-3 py-1 text-sm font-medium mb-3 shadow-sm">
                    {brand}
                  </div>
                )}
                <h1 className="text-3xl font-bold mb-2 text-gray-800">
                  {name}
                </h1>

                {/* Product Meta */}
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  {barcode && (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                        />
                      </svg>
                      <span className="text-gray-700">{barcode}</span>
                    </div>
                  )}
                  {quantity && (
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        />
                      </svg>
                      <span className="text-gray-700">{quantity}</span>
                    </div>
                  )}
                </div>

                {categories && (
                  <div className="mt-3">
                    <span className="text-gray-600 text-sm">Categories:</span>
                    <div className="mt-1">
                      {categories.split(",").map((category, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs mr-2 mb-2"
                        >
                          {category.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Nutrition Score */}
              {nutriScore && nutriScore !== "unknown" && (
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg ${getNutritionGradeColor(nutriScore)}`}
                  >
                    {nutriScore.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium mt-2">Nutri-Score</span>
                </div>
              )}
            </div>

            {/* Labels */}
            {labelsList.length > 0 && (
              <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Labels
                </h3>
                <div className="flex flex-wrap gap-2">
                  {labelsList.map((label, index) => (
                    <span
                      key={index}
                      className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="px-6">
          <nav className="-mb-px flex space-x-6 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("nutrition")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "nutrition"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Nutrition Facts
            </button>
            <button
              onClick={() => setActiveTab("ingredients")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "ingredients"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Ingredients
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Nutrition Facts Tab */}
        {activeTab === "nutrition" && (
          <div className="animate-fadeIn">
            <div className="mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-800">
                Nutrition Facts
              </h2>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-green-50">
                      <th className="text-left p-4 border-b border-gray-200 font-semibold text-gray-700">
                        Nutrient
                      </th>
                      <th className="text-left p-4 border-b border-gray-200 font-semibold text-gray-700">
                        Per 100g
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 border-b border-gray-200 font-medium text-gray-800">
                        Energy
                      </td>
                      <td className="p-4 border-b border-gray-200 text-gray-700">
                        {formatNutritionValue(nutritionData.energy, "kcal")}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 border-b border-gray-200 font-medium text-gray-800">
                        Fat
                      </td>
                      <td className="p-4 border-b border-gray-200 text-gray-700">
                        {formatNutritionValue(nutritionData.fat)}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 border-b border-gray-200 font-medium text-gray-800">
                        Carbohydrates
                      </td>
                      <td className="p-4 border-b border-gray-200 text-gray-700">
                        {formatNutritionValue(nutritionData.carbs)}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 border-b border-gray-200 font-medium text-gray-800">
                        Sugars
                      </td>
                      <td className="p-4 border-b border-gray-200 text-gray-700">
                        {formatNutritionValue(nutritionData.sugars)}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 border-b border-gray-200 font-medium text-gray-800">
                        Proteins
                      </td>
                      <td className="p-4 border-b border-gray-200 text-gray-700">
                        {formatNutritionValue(nutritionData.proteins)}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-800">Salt</td>
                      <td className="p-4 text-gray-700">
                        {formatNutritionValue(nutritionData.salt)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Ingredients Tab */}
        {activeTab === "ingredients" && (
          <div className="animate-fadeIn">
            <div className="mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-800">
                Ingredients
              </h2>
            </div>

            {ingredientsList.length > 0 ? (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <p className="text-gray-700 italic mb-6">{ingredients}</p>
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
                  Individual Ingredients
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ingredientsList.map((ingredient, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-sm transition-colors duration-200"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                <div className="text-5xl mb-4">📋</div>
                <p className="text-gray-500 italic">
                  No ingredients information available
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
