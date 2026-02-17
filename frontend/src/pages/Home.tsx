import React from "react";
import SearchBar from "../components/SearchBar";
import TrendingSearches from "../components/TrendingSearches";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-8 text-center">
          <span className="text-blue-500">Z</span>
          <span className="text-red-500">O</span>
          <span className="text-yellow-500">L</span>
          <span className="text-green-500">O</span>
          <span className="ml-2 text-blue-500">S</span>
          <span className="text-red-500">e</span>
          <span className="text-yellow-500">a</span>
          <span className="text-green-500">r</span>
          <span className="text-blue-500">c</span>
          <span className="text-red-500">h</span>
        </h1>

        <div className="w-full max-w-xl">
          <SearchBar />
          <TrendingSearches />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
