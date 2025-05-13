"use client";
import { useProductContext } from "@/context/ProductContext";
import { formatCategoryName } from "@/lib/helpers";

const CategoryFilter = () => {
  const {
    categories,
    categoriesLoading,
    selectedCategory,
    handleCategoryChange,
  } = useProductContext();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-primary"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1H4z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M6 7a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Categories
      </h3>

      {categoriesLoading ? (
        <div className="flex items-center justify-center py-6">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-gray-600">
            Loading categories...
          </span>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 mb-2">
            <button
              onClick={() => handleCategoryChange("")}
              className={`py-1.5 px-4 rounded-full text-sm transition-all duration-200 font-medium ${
                selectedCategory === ""
                  ? "bg-primary text-stone-400 shadow-sm ring-2 ring-primary/20"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              All
            </button>
          </div>

          <div className="mt-2 overflow-y-auto max-h-64 pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`block w-full text-left py-2 px-3 rounded transition-all duration-200 text-sm mb-1 ${
                  selectedCategory === category.id
                    ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{formatCategoryName(category.name)}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === category.id
                        ? "bg-primary/20 text-primary"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {category.products}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
