import { Search } from "lucide-react";
import { useContext, useState } from "react";
import React from 'react'
import { useShop } from "../context/ShopContext";
import { useNavigate } from "react-router";


const SearchBar: React.FC=()=>{
    const {searchQuery,setSearchQuery}=useShop();
    const navigate=useNavigate();
    const handleSearch=()=>{
        console.log("Searching:",searchQuery);
        navigate(`/search/${searchQuery}`)
    }
    return(
        <div className="w-full flex justify-center mt-4">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-[500px] shadow-sm">
                <div className="flex items-center flex-1 gap-2">
                    <Search size={18} className="text-gray-400"/>
                    <input
                        type="text"
                        placeholder="Search the web..."
                        value={searchQuery}
                        onChange={(e)=>setSearchQuery(e.target.value)}
                        className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
                    />
                </div>
                <button
          onClick={handleSearch}
          className="ml-3 flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
        >
          <Search size={16} />
          Search
        </button>
            </div>

        </div>
    )

}
export default SearchBar

