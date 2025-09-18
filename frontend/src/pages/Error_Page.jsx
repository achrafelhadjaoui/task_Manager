import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-gray-700 mb-2">
          {error.statusText || error.message}
        </p>
        {error.status === 404 && (
          <p className="text-gray-500">The page you are looking for was not found.</p>
        )}
        <Link
          to="/"
          className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

