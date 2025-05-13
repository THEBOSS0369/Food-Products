import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </MainLayout>
  );
}
