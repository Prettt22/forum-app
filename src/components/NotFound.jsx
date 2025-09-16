import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4'>
      <div className='text-center'>
        <h1 className='text-9xl font-extrabold text-white drop-shadow-lg'>
          404
        </h1>
        <h2 className='mt-4 text-3xl font-semibold text-white'>
          Oops! Page Not Found
        </h2>
        <p className='mt-2 text-white/80'>
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to='/'
          className='inline-block mt-8 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:shadow-xl hover:-translate-y-0.5 transform transition cursor-pointer'
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
