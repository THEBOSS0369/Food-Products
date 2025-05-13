"use client";
import { formatProduct } from "@/lib/helpers";
import { useProductContext } from "@/context/ProductContext";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import ProductCard from "./ProductCard";
import Loader from "../common/Loader";
import Error from "../common/Error";
import { useEffect, useState } from "react";

const ProductGrid = () => {
  const { products, loading, error, hasMore, loadMoreProducts, searchQuery } =
    useProductContext();
  const { ref } = useInfiniteScroll(loadMoreProducts, hasMore, loading);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation delay for loading items
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Format products for display
  const formattedProducts = products.map((product) => formatProduct(product));

  // If there's an error, show error message
  if (error) {
    return <Error message={error} />;
  }

  // If there are no products and not loading, show no results
  if (products.length === 0 && !loading) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm px-8 max-w-2xl mx-auto">
        <div className="text-6xl mb-6 opacity-75">🔍</div>
        <h2 className="text-2xl font-bold mb-3 text-gray-800">
          No products found
        </h2>
        <p className="text-gray-600 text-lg">
          {searchQuery
            ? `We couldn't find any products matching "${searchQuery}".`
            : "We couldn't find any products matching your criteria."}
        </p>
        <div className="mt-8">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors duration-300 font-medium"
          >
            Clear filters and try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {searchQuery && products.length > 0 && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Found <span className="font-semibold">{products.length}</span>{" "}
                results for "{searchQuery}"
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {formattedProducts.map((product, index) => (
          <div
            key={`${product.barcode}-${index}`}
            className="transition-all duration-500"
            style={{
              animationDelay: `${index * 0.05}s`,
              animationFillMode: "both",
              animation: isLoaded ? "fadeInUp 0.6s ease-out" : "none",
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Loading indicator for infinite scroll */}
      {(loading || hasMore) && (
        <div ref={ref} className="mt-12 mb-6">
          <Loader />
        </div>
      )}

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductGrid;
