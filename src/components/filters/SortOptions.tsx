"use client";
import { useProductContext } from "@/context/ProductContext";

const SortOptions = () => {
  const { sortOption, handleSortChange } = useProductContext();

  const sortOptions = [
    { label: "Default", value: "" },
    { label: "Name (A-Z)", value: "product_name", order: "asc" },
    { label: "Name (Z-A)", value: "product_name", order: "desc" },
    {
      label: "Nutrition Grade (Best first)",
      value: "nutrition_grades",
      order: "asc",
    },
    {
      label: "Nutrition Grade (Worst first)",
      value: "nutrition_grades",
      order: "desc",
    },
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      handleSortChange("", "asc");
    } else {
      const selectedOption = sortOptions.find(
        (option) => `${option.value}-${option.order}` === value,
      );
      if (selectedOption) {
        handleSortChange(selectedOption.value, selectedOption.order);
      }
    }
  };

  const currentValue = sortOption.field
    ? `${sortOption.field}-${sortOption.order}`
    : "";

  return (
    <div className="relative bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-center space-x-2 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-primary"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
        </svg>
        <label
          htmlFor="sort-select"
          className="text-lg font-semibold text-gray-800"
        >
          Sort By
        </label>
      </div>

      <div className="relative">
        <select
          id="sort-select"
          value={currentValue}
          onChange={handleChange}
          className="block w-full pl-3 pr-10 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary appearance-none transition-all duration-200"
        >
          {sortOptions.map((option) => (
            <option
              key={option.label}
              value={option.value ? `${option.value}-${option.order}` : ""}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SortOptions;
