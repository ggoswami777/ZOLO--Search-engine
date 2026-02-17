import React from "react";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router";

const Search: React.FC = () => {
    const navigate=useNavigate();
  return (
    <section className="min-h-screen bg-white">

     
      <header className="border-b border-gray-200 px-4 sm:px-8 py-3">
        
       
        <div className="flex items-center justify-between sm:justify-between sm:gap-6">
          
        
          <h1 onClick={()=>navigate('/')} className="text-xl sm:text-2xl font-bold whitespace-nowrap cursor-pointer">
            <span className="text-blue-500">Z</span>
            <span className="text-red-500">O</span>
            <span className="text-yellow-500">L</span>
            <span className="text-green-500">O</span>
            <span className="ml-1 text-blue-500">S</span>
            <span className="text-red-500">e</span>
            <span className="text-yellow-500">a</span>
            <span className="text-green-500">r</span>
            <span className="text-blue-500">c</span>
            <span className="text-red-500">h</span>
          </h1>

          <div className="hidden sm:block flex-1 max-w-xl">
            <SearchBar />
          </div>

          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold cursor-pointer">
            U
          </div>
        </div>

        
        <div className="mt-3 sm:hidden">
          <SearchBar />
        </div>

      </header>

        {/* results */}
        <div>
            results yaha ayenge

        </div>

    </section>
  );
};

export default Search;
