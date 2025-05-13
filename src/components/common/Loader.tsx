"use client";

const Loader = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      <p className="text-gray-500 mt-3 text-sm font-medium">
        Loading products...
      </p>
    </div>
  );
};

export default Loader;
