import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <main className="grid min-h-full px-6 py-24 bg-white dark:bg-[#121212] sm:py-48 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-blue-600">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-50 text-balance sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-gray-500 dark:text-gray-100 text-pretty sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="flex items-center justify-center mt-10 gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Go back home
            </Link>
            <Link
              to="/"
              className="text-sm font-semibold text-gray-900 dark:text-gray-50"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
