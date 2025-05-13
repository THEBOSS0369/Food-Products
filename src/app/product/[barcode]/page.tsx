"use client";

import { useState, useEffect } from "react";
import { getProductByBarcode } from "@/lib/api";
import { formatProduct } from "@/lib/helpers";
import MainLayout from "@/components/layout/MainLayout";
import ProductDetail from "@/components/products/ProductDetail";
import Loader from "@/components/common/Loader";
import Error from "@/components/common/Error";

export default function ProductDetailPage({ params }) {
  const { barcode } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getProductByBarcode(barcode);

        if (response.status === 0) {
          setError("Product not found");
        } else {
          const formattedProduct = formatProduct(response.product);
          setProduct(formattedProduct);
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (barcode) {
      fetchProduct();
    }
  }, [barcode]);

  return (
    <MainLayout>
      {loading ? (
        <Loader fullScreen />
      ) : error ? (
        <Error message={error} />
      ) : (
        <ProductDetail product={product} />
      )}
    </MainLayout>
  );
}
