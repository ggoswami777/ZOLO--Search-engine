import React from "react";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useNavigate } from "react-router";


const trendingTopics: string[] = [
  "Artificial Intelligence",
  "Machine Learning",
  "React vs Vue",
  "Cloud Computing",
  "Cybersecurity",
];

const TrendingSearches: React.FC = () => {
    const {setSearchQuery,searchQuery}=useShop();
    const navigate=useNavigate();
    const handleTrendingSearchClick=(topic:string)=>{
        setSearchQuery(topic);
        navigate(`/search/${searchQuery}`)
        
    }
  return (
    <div className="w-full max-w-xl mt-6">
      <div className="flex items-center gap-2 text-gray-600 mb-4">
        <TrendingUp size={18} />
        <h2 className="text-sm font-semibold tracking-wide">
          TRENDING SEARCHES
        </h2>
      </div>

      <div className="space-y-3">
        {trendingTopics.map((topic, index) => (
          <div onClick={()=>handleTrendingSearchClick(topic)}
            key={index}
            className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition rounded-xl px-4 py-3 cursor-pointer border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <span className="bg-gray-200 text-gray-600 text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-md">
                {index + 1}
              </span>

              <span className="text-gray-800 font-medium">{topic}</span>
            </div>

            <ArrowUpRight
              size={16}
              className="text-gray-400 group-hover:text-gray-600"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSearches;
