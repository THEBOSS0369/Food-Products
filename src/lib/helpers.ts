/**
 * Format product data from API response
 * @param {Object} product - Raw product data from API
 * @returns {Object} - Formatted product data
 */
export const formatProduct = (product) => {
  return {
    id: product.id || product._id,
    barcode: product.code,
    name: product.product_name || "Unknown Product",
    image:
      product.image_url || product.image_front_url || "/images/placeholder.png",
    brand: product.brands || "Unknown Brand",
    categories: product.categories || "",
    ingredients:
      product.ingredients_text || "No ingredients information available",
    nutriScore: product.nutrition_grades || "unknown",
    nutritionData: {
      energy: product.nutriments?.energy_100g || 0,
      fat: product.nutriments?.fat_100g || 0,
      carbs: product.nutriments?.carbohydrates_100g || 0,
      sugars: product.nutriments?.sugars_100g || 0,
      proteins: product.nutriments?.proteins_100g || 0,
      salt: product.nutriments?.salt_100g || 0,
    },
    labels: product.labels || "",
    score: product.nutriscore_score || 0,
    quantity: product.quantity || "Unknown",
  };
};

/**
 * Format category names from API response
 * @param {string} category - Raw category name
 * @returns {string} - Formatted category name
 */
export const formatCategoryName = (category) => {
  if (!category) return "";
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Get nutrition grade color class
 * @param {string} grade - Nutrition grade (A, B, C, D, E)
 * @returns {string} - Tailwind CSS color class
 */
export const getNutritionGradeColor = (grade) => {
  switch (grade.toLowerCase()) {
    case "a":
      return "bg-nutrition-a";
    case "b":
      return "bg-nutrition-b";
    case "c":
      return "bg-nutrition-c";
    case "d":
      return "bg-nutrition-d";
    case "e":
      return "bg-nutrition-e";
    default:
      return "bg-gray-400";
  }
};

/**
 * Parse list of ingredients from string
 * @param {string} ingredientsText - Raw ingredients text
 * @returns {Array} - Array of ingredients
 */
export const parseIngredients = (ingredientsText) => {
  if (!ingredientsText) return [];
  return ingredientsText
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

/**
 * Check if value is valid barcode
 * @param {string} value - Value to check
 * @returns {boolean} - True if value is a valid barcode
 */
export const isValidBarcode = (value) => {
  return /^\d+$/.test(value) && value.length >= 8;
};

/**
 * Format nutrition value with units
 * @param {number} value - Nutrition value
 * @param {string} unit - Unit of measurement
 * @returns {string} - Formatted nutrition value
 */
export const formatNutritionValue = (value, unit = "g") => {
  if (value === undefined || value === null) return "N/A";
  return `${value} ${unit}`;
};
