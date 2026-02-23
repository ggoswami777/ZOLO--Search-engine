import React from "react";
import SearchBar from "../components/SearchBar";
import TrendingSearches from "../components/TrendingSearches";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    // Added a subtle radial gradient for depth
    <div className="min-h-screen flex flex-col bg-[#fafafa] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="flex flex-col items-center justify-center flex-grow px-4 transition-all duration-500">
        
        {/* Modernized Logo Styling */}
        <div className="mb-10 text-center select-none">
          <h1 className="text-6xl sm:text-7xl font-bold tracking-tight">
            <span className="text-blue-600">Z</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">l</span>
            <span className="text-green-500">o</span>
            <span className="ml-1 text-gray-800">Search</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm font-medium tracking-widest uppercase">
            Discover the Web
          </p>
        </div>

        <div className="w-full max-w-2xl transform transition-all">
          <SearchBar />
          <TrendingSearches />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;