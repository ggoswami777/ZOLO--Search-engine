import { Search } from "lucide-react";
// import { useContext, useState } from "react";
import React from 'react'
import { useShop } from "../context/ShopContext";
import { useNavigate } from "react-router";
import axios from "axios";


const SearchBar: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { searchQuery, setSearchQuery, setWikiSearchData } = useShop();
  const navigate = useNavigate();


  const handleSearch = async () => {
  if (!searchQuery.trim()) return;

  try {
    setLoading(true);
    setError("");

    const wikiPromise = axios.get(`${import.meta.env.VITE_BACKEND_URL}/wiki/search`, {
      params: { q: searchQuery }
    });

    const redditPromise = axios.get(`${import.meta.env.VITE_BACKEND_URL}/reddit`, {
      params: { q: searchQuery, subreddit: "javascript", limit: 10 }
    });

    const [wikiResponse, redditResponse] = await Promise.all([wikiPromise, redditPromise]);

    // 🔹 If Wiki is still crawling, wikiResponse.data may be empty
    if (!wikiResponse.data.length) {
      console.log("Wiki is crawling, retrying after 2 seconds...");
      await new Promise(res => setTimeout(res, 2000)); // wait 2 sec
      const retryWiki = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/wiki/search`, {
        params: { q: searchQuery }
      });
      wikiResponse.data = retryWiki.data;
    }

    const combinedResults = [...wikiResponse.data, ...redditResponse.data];
    setWikiSearchData(combinedResults);
    navigate(`/search/${searchQuery}`);
  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};



  // const handleSearch = async () => {
  //   if (!searchQuery.trim()) return;

  //   try {
  //     setLoading(true);
  //     setError("");


  //     const response = await axios.get(
  //       `${import.meta.env.VITE_BACKEND_URL}/wiki/search`,
  //       { params: { q: searchQuery } }
  //     );

  //     console.log("response.data:", response.data);
  //     console.log("Type:", typeof response.data);
  //     console.log("Keys:", Object.keys(response.data || {}));

  //     setWikiSearchData(response.data);
  //     navigate(`/search/${searchQuery}`);
  //   } catch (error) {
  //     setError("Something went wrong. Please try again.")
  //   }finally{
  //     setLoading(false);
  //   }
  // };




  // const handleSearch = async () => {
  //   if (!searchQuery.trim()) return;
  //   try {
  //     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/wiki/search`, {
  //       params: { q: searchQuery }
  //     });
  //     setWikiSearchData(response.data);
  //     navigate(`/search/${searchQuery}`);
  //   } catch (error) {
  //     console.error("Search error:", error);
  //   }
  // };

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

      {loading && (
        <p className="text-blue-500 mt-3 text-center">
          Searching...
        </p>
      )}

      {/* 🔴 Error Message */}
      {error && (
        <p className="text-red-500 mt-3 text-center">
          {error}
        </p>
      )}
    </div>
  );
};
export default SearchBar

