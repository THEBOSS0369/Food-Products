import { ProductProvider } from "@/context/ProductContext";
import "./globals.css";

export const metadata = {
  title: "Food Product Explorer",
  description:
    "Explore food products from around the world using the OpenFoodFacts API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProductProvider>{children}</ProductProvider>
      </body>
    </html>
  );
}
