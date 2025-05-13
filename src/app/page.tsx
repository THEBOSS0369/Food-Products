"use client";

import MainLayout from "@/components/layout/MainLayout";
import CategoryFilter from "@/components/filters/CategoryFilter";
import SortOptions from "@/components/filters/SortOptions";
import ProductGrid from "@/components/products/ProductGrid";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Sidebar with filters */}
        <div className="md:w-1/4 lg:w-1/5 mb-6 md:mb-0">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <CategoryFilter />
            <SortOptions />
          </div>
        </div>

        {/* Main content with products */}
        <div className="md:w-3/4 lg:w-4/5">
          <ProductGrid />
        </div>
      </div>
    </MainLayout>
  );
}
