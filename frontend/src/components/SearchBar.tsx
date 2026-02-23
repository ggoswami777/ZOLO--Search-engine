import { Search } from "lucide-react";
import { useContext, useState } from "react";
import React from 'react'
import { useShop } from "../context/ShopContext";
import { useNavigate } from "react-router";
import axios from "axios";


const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, setWikiSearchData } = useShop();
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/wiki/search`, {
        params: { q: searchQuery }
      });
      setWikiSearchData(response.data);
      navigate(`/search/${searchQuery}`);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="w-full group">
      <div className="flex items-center bg-white border border-gray-200 rounded-2xl p-2 px-4 shadow-sm hover:shadow-md transition-shadow duration-300 ring-1 ring-black/5">
        <div className="flex items-center flex-1 gap-3">
          <Search size={20} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Ask anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="bg-transparent outline-none w-full text-lg text-gray-700 placeholder-gray-400 py-2"
          />
        </div>
        <button
          onClick={handleSearch}
          className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 active:scale-95 transition-all font-medium"
        >
          Search
        </button>
      </div>
    </div>
  );
};
export default SearchBar

