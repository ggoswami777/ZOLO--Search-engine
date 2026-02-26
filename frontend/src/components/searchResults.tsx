import React, { useState } from "react";
import { useShop } from "../context/ShopContext";

const SearchResults: React.FC = () => {
  const { wikiSearchData } = useShop();
  const [activeTab, setActiveTab] = useState<"All" | "Wikipedia" | "Reddit">("All");

  if (!wikiSearchData || wikiSearchData.length === 0) {
    return (
      <div className="px-4 sm:px-44 mt-10 text-gray-500 font-medium">
        No results found.
      </div>
    );
  }

  // Filter results based on active tab
  const filteredResults =
    activeTab === "All"
      ? wikiSearchData
      : wikiSearchData.filter((item) => item.source === activeTab);

  const wikiCount = wikiSearchData.filter((item) => item.source === "Wikipedia").length;
  const redditCount = wikiSearchData.filter((item) => item.source === "Reddit").length;

  return (
    <div className="px-4 sm:px-44 mt-4 max-w-5xl">
      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab("All")}
          className={`pb-3 font-semibold text-sm flex items-center gap-2 ${
            activeTab === "All"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          All <span className="bg-blue-50 px-1.5 rounded text-xs">{wikiSearchData.length}</span>
        </button>

        <button
          onClick={() => setActiveTab("Wikipedia")}
          className={`pb-3 font-medium text-sm flex items-center gap-2 ${
            activeTab === "Wikipedia"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center text-[10px] text-white font-bold">
            W
          </div>
          Wikipedia <span className="text-gray-400 text-xs">{wikiCount}</span>
        </button>

        <button
          onClick={() => setActiveTab("Reddit")}
          className={`pb-3 font-medium text-sm flex items-center gap-2 ${
            activeTab === "Reddit"
              ? "border-b-2 border-orange-500 text-orange-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <div className="w-4 h-4 bg-orange-600 rounded-sm flex items-center justify-center text-[10px] text-white font-bold">
            R
          </div>
          Reddit <span className="text-gray-400 text-xs">{redditCount}</span>
        </button>
      </div>

      <p className="text-sm text-gray-400 mb-8">
        About {filteredResults.length} results
      </p>

      {/* Results List */}
      <div className="space-y-10">
        {filteredResults.map((item: any) => {
          // Determine badge letter and color
          let badgeLetter = "";
          let badgeBg = "";
          let badgeTextColor = "text-white";

          if (item.source === "Wikipedia") {
            badgeLetter = "W";
            badgeBg = "bg-blue-600";
          } else if (item.source === "Reddit") {
            badgeLetter = "R";
            badgeBg = "bg-orange-600";
          } else if (item.url) {
            const trimmedUrl = item.url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
            badgeLetter = trimmedUrl.charAt(0).toUpperCase();
            badgeBg = "bg-gray-600";
          }

          return (
            <div key={item._id} className="group border-b border-gray-100 pb-8">
              {/* Header: Icon + Source Info */}
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shadow-sm ${badgeBg} ${badgeTextColor}`}
                >
                  {badgeLetter}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800 leading-none">
                    {item.source || item.url.replace(/^https?:\/\//, "").replace(/\/.*$/, "")}
                  </span>
                  <span className="text-xs text-gray-400 mt-1 truncate max-w-[250px] sm:max-w-md">
                    {item.url.replace("https://", "")}
                  </span>
                </div>
              </div>

              {/* Title */}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold text-blue-600 hover:underline decoration-2 underline-offset-2"
              >
                {item.title}
              </a>

              {/* Content */}
              <p className="text-gray-600 text-[15px] leading-relaxed mt-2 line-clamp-2">
                {item.content || "No description available."}
              </p>

              {/* Badge */}
              <div className="flex items-center justify-between mt-4">
                <span
                  className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded uppercase ${
                    item.source === "Wikipedia"
                      ? "text-blue-100 bg-blue-50"
                      : item.source === "Reddit"
                      ? "text-orange-100 bg-orange-50"
                      : "text-gray-100 bg-gray-50"
                  }`}
                >
                  {item.source || item.url.replace(/^https?:\/\//, "").replace(/\/.*$/, "")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
















// import React, { useState } from "react";
// import { useShop } from "../context/ShopContext";

// const SearchResults: React.FC = () => {
//   const { wikiSearchData } = useShop();
//   const [activeTab, setActiveTab] = useState<"All" | "Wikipedia" | "Reddit">("All");

//   if (!wikiSearchData || wikiSearchData.length === 0) {
//     return (
//       <div className="px-4 sm:px-44 mt-10 text-gray-500 font-medium">
//         No results found.
//       </div>
//     );
//   }

//   // Filter results based on active tab
//   const filteredResults =
//     activeTab === "All"
//       ? wikiSearchData
//       : wikiSearchData.filter((item) => item.source === activeTab);

//   const wikiCount = wikiSearchData.filter((item) => item.source === "Wikipedia").length;
//   const redditCount = wikiSearchData.filter((item) => item.source === "Reddit").length;

//   return (
//     <div className="px-4 sm:px-44 mt-4 max-w-5xl">
//       {/* Tabs */}
//       <div className="flex items-center gap-8 border-b border-gray-200 mb-4">
//         <button
//           onClick={() => setActiveTab("All")}
//           className={`pb-3 font-semibold text-sm flex items-center gap-2 ${
//             activeTab === "All"
//               ? "border-b-2 border-blue-500 text-blue-600"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           All <span className="bg-blue-50 px-1.5 rounded text-xs">{wikiSearchData.length}</span>
//         </button>

//         <button
//           onClick={() => setActiveTab("Wikipedia")}
//           className={`pb-3 font-medium text-sm flex items-center gap-2 ${
//             activeTab === "Wikipedia"
//               ? "border-b-2 border-blue-500 text-blue-600"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center text-[10px] text-white font-bold">
//             W
//           </div>
//           Wikipedia <span className="text-gray-400 text-xs">{wikiCount}</span>
//         </button>

//         <button
//           onClick={() => setActiveTab("Reddit")}
//           className={`pb-3 font-medium text-sm flex items-center gap-2 ${
//             activeTab === "Reddit"
//               ? "border-b-2 border-orange-500 text-orange-600"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           <div className="w-4 h-4 bg-orange-600 rounded-sm flex items-center justify-center text-[10px] text-white font-bold">
//             R
//           </div>
//           Reddit <span className="text-gray-400 text-xs">{redditCount}</span>
//         </button>
//       </div>

//       <p className="text-sm text-gray-400 mb-8">
//         About {filteredResults.length} results
//       </p>

//       {/* Results List */}
//       <div className="space-y-10">
//         {filteredResults.map((item: any) => (
//           <div key={item._id} className="group border-b border-gray-100 pb-8">
//             {/* Header: Icon + Source Info */}
//             <div className="flex items-center gap-3 mb-2">
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shadow-sm ${
//                   item.source === "Wikipedia" ? "bg-blue-600 text-white" : "bg-orange-600 text-white"
//                 }`}
//               >
//                 {item.source === "Wikipedia" ? "W" : "R"}
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-sm font-bold text-gray-800 leading-none">
//                   {item.source}
//                 </span>
//                 <span className="text-xs text-gray-400 mt-1 truncate max-w-[250px] sm:max-w-md">
//                   {item.url.replace("https://", "")}
//                 </span>
//               </div>
//             </div>

//             {/* Title */}
//             <a
//               href={item.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-xl font-semibold text-blue-600 hover:underline decoration-2 underline-offset-2"
//             >
//               {item.title}
//             </a>

//             {/* Content */}
//             <p className="text-gray-600 text-[15px] leading-relaxed mt-2 line-clamp-2">
//               {item.content || "No description available."}
//             </p>

//             {/* Badge */}
//             <div className="flex items-center justify-between mt-4">
//               <span
//                 className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded uppercase ${
//                   item.source === "Wikipedia" ? "text-blue-100 bg-blue-50" : "text-orange-100 bg-orange-50"
//                 }`}
//               >
//                 {item.source}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchResults;













// import React from "react";
// import { useShop } from "../context/ShopContext";

// const SearchResults: React.FC = () => {
//   const { wikiSearchData } = useShop();

//   if (!wikiSearchData || wikiSearchData.length === 0) {
//     return (
//       <div className="px-4 sm:px-44 mt-10 text-gray-500 font-medium">
//         No results found.
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 sm:px-44 mt-4 max-w-5xl">
//       <div className="flex items-center gap-8 border-b border-gray-200 mb-4">
//         <button className="pb-3 border-b-2 border-blue-500 text-blue-600 font-semibold text-sm flex items-center gap-2">
//           All{" "}
//           <span className="bg-blue-50 px-1.5 rounded text-xs">
//             {wikiSearchData.length}
//           </span>
//         </button>
//         <button className="pb-3 text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-2 transition">
//           <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center text-[10px] text-white font-bold">
//             W
//           </div>
//           Wikipedia{" "}
//           <span className="text-gray-400 text-xs">{wikiSearchData.length}</span>
//         </button>
//         <button className="pb-3 text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-2 transition">
//           <div className="w-4 h-4 bg-orange-600 rounded-sm flex items-center justify-center text-[10px] text-white font-bold">
//             R
//           </div>
//           Reddit <span className="text-gray-400 text-xs">0</span>
//         </button>
//       </div>

//       <p className="text-sm text-gray-400 mb-8">
//         About {wikiSearchData.length} results (0.46 seconds)
//       </p>

//       <div className="space-y-10">
//         {wikiSearchData.map((item: any) => (
//           <div key={item._id} className="group border-b border-gray-100 pb-8">
//             {/* Header: Icon + Source Info */}
//             <div className="flex items-center gap-3 mb-2">
//               <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-black shadow-sm">
//                 W
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-sm font-bold text-gray-800 leading-none">
//                   Wikipedia
//                 </span>
//                 <span className="text-xs text-gray-400 mt-1 truncate max-w-[250px] sm:max-w-md">
//                   {item.url.replace("https://", "")}
//                 </span>
//               </div>
//             </div>
//             <a
//               href={item.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-xl font-semibold text-blue-600 hover:underline decoration-2 underline-offset-2"
//             >
//               {item.title}
//             </a>
           
          
//             <p className="text-gray-600 text-[15px] leading-relaxed mt-2 line-clamp-1">
//               <span className="bg-yellow-100 font-medium text-gray-800 px-0.5 rounded mr-1">
//                 {item.title}:
//               </span>
//               {item.content || "No description available for this result."}
//             </p>
//             <div className="flex items-center justify-between mt-4">
//               <div className="flex items-center gap-3 text-xs text-gray-400">
//                 <span>Jan 15, 2025</span>
//                 <span>•</span>
//                 <span>8 min read</span>
//               </div>
//               <span className="text-[10px] font-bold tracking-widest text-blue-100 bg-blue-50 px-2 py-0.5 rounded uppercase">
//                 Wikipedia
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchResults;
