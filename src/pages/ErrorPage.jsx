import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // Importing a warning icon for better UX

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
      <div className="text-center bg-white p-8 rounded-lg shadow-xl dark:bg-gray-900 text-black dark:text-white">
        <FaExclamationTriangle className="text-6xl text-yellow-500 mb-4" />
        <h1 className="text-4xl font-semibold mb-2 ">Oops! Page Not Found</h1>
        <p className="text-xl mb-6">It seems that the page you're looking for does not exist.</p>
        <a href="/" className="text-lg text-indigo-600 hover:underline">Go Back to Home</a>
      </div>
    </div>
  );
};

export default ErrorPage;
