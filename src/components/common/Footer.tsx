"use client";

const Footer = () => {
  return (
    <footer className="bg-stone-800 mt-auto border-t border-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <span className="text-gray-200 font-medium">
              Food Product Explorer
            </span>
          </div>
          <p className="text-gray-200">
            Built with data from{" "}
            <a
              href="https://world.openfoodfacts.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Open Food Facts
            </a>
          </p>
          <p className="text-gray-100 text-sm mt-2">
            Open Food Facts is an open database of food products from around the
            world.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="text-gray-300 hover:text-primary">
              <span className="sr-only">About</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-primary">
              <span className="sr-only">Privacy</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-primary">
              <span className="sr-only">Contact</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
