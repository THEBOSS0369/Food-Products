"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getProducts, searchProductsByName, getCategories } from "@/lib/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // State for products and loading
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filters and pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState({ field: "", order: "asc" });
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Load categories when component mounts
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await getCategories();
        // Take only the first 20 most popular categories
        const popularCategories = (data.tags || [])
          .filter((tag) => tag.products > 1000)
          .sort((a, b) => b.products - a.products)
          .slice(0, 20)
          .map((tag) => ({
            id: tag.id,
            name: tag.name,
            products: tag.products,
          }));
        setCategories(popularCategories);
      } catch (err) {
        console.error("Error loading categories:", err);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setCategoriesLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Load products based on filters and pagination
  const loadProducts = async (reset = false) => {
    try {
      setLoading(true);
      setError(null);

      const page = reset ? 1 : currentPage;
      let data;

      // If search query exists, use search API
      if (searchQuery) {
        data = await searchProductsByName(searchQuery, page, 24);
      } else {
        // Otherwise use regular product API with filters
        data = await getProducts(
          page,
          24,
          selectedCategory,
          sortOption.field,
          sortOption.order,
        );
      }

      const { products: newProducts, count, page_size } = data;

      // Remove duplicates by code
      const uniqueProducts = newProducts.filter(
        (product, index, self) =>
          index === self.findIndex((p) => p.code === product.code),
      );

      // Check if we've reached the end of the results
      setHasMore(page * page_size < count);

      // If resetting or first page, replace products; otherwise append
      if (reset) {
        setProducts(uniqueProducts);
        setCurrentPage(1);
      } else {
        setProducts((prev) => {
          // Filter out duplicates when appending
          const allProducts = [...prev, ...uniqueProducts];
          return allProducts.filter(
            (product, index, self) =>
              index === self.findIndex((p) => p.code === product.code),
          );
        });
        setCurrentPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Reset products and load first page when filters change
  useEffect(() => {
    loadProducts(true);
  }, [searchQuery, selectedCategory, sortOption]);

  // Function to load next page
  const loadMoreProducts = () => {
    if (!loading && hasMore) {
      loadProducts();
    }
  };

  // Function to search products
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Function to filter by category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Function to change sort option
  const handleSortChange = (field, order) => {
    setSortOption({ field, order });
  };

  // Value object to be provided to consumers
  const value = {
    products,
    loading,
    error,
    hasMore,
    categories,
    categoriesLoading,
    searchQuery,
    selectedCategory,
    sortOption,
    loadMoreProducts,
    handleSearch,
    handleCategoryChange,
    handleSortChange,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
