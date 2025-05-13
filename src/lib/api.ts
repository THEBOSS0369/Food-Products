import axios from "axios";

const BASE_URL = "https://world.openfoodfacts.org";

// Create axios instance for OpenFoodFacts API
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Get products with pagination
 * @param {number} page - Page number
 * @param {number} pageSize - Number of products per page
 * @param {string} category - Optional category filter
 * @param {string} sort - Optional sort parameter ('product_name' or 'nutrition_grade_fr')
 * @param {string} order - Sort order ('asc' or 'desc')
 */
export const getProducts = async (
  page = 1,
  pageSize = 24,
  category = "",
  sort = "",
  order = "asc",
) => {
  try {
    let url = `/cgi/search.pl`;
    const params = {
      action: "process",
      page,
      page_size: pageSize,
      json: true,
    };

    if (category) {
      params.tagtype_0 = "categories";
      params.tag_0 = category;
    }

    if (sort) {
      params.sort_by = sort;
      params.sort_order = order === "desc" ? "desc" : "asc";
    }

    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 * Search products by name
 * @param {string} query - Search term
 * @param {number} page - Page number
 * @param {number} pageSize - Number of products per page
 */
export const searchProductsByName = async (query, page = 1, pageSize = 24) => {
  try {
    const response = await api.get(`/cgi/search.pl`, {
      params: {
        search_terms: query,
        page,
        page_size: pageSize,
        json: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

/**
 * Get product details by barcode
 * @param {string} barcode - Product barcode
 */
export const getProductByBarcode = async (barcode) => {
  try {
    const response = await api.get(`/api/v0/product/${barcode}.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

/**
 * Search product by barcode
 * @param {string} barcode - Product barcode
 */
export const searchProductByBarcode = async (barcode) => {
  try {
    const response = await api.get(`/api/v0/product/${barcode}.json`);
    return response.data;
  } catch (error) {
    console.error("Error searching product by barcode:", error);
    throw error;
  }
};

/**
 * Get a list of categories
 */
export const getCategories = async () => {
  try {
    const response = await api.get(`/categories.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return { tags: [] }; // Fallback to empty categories
  }
};

export default {
  getProducts,
  searchProductsByName,
  getProductByBarcode,
  searchProductByBarcode,
  getCategories,
};
