const Error = ({
  message = "Something went wrong. Please try again later.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-danger text-6xl mb-4">⚠️</div>
      <h2 className="text-xl font-semibold mb-2">Error</h2>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default Error;
