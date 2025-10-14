import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import { useSearch } from "../context/SearchContext.jsx";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const { setSearch } = useSearch();

  
  const handleSearch = (term) => {
  setSearch(term);
};


  return (
    <header className="relative bg-white border-gray-400 shadow h-15 flex items-center pl-4 justify-between">
      
      <div className="flex items-center space-x-2">
        <div className="bg-[url('/src/assets/S.N.S Logo.png')] bg-cover bg-center h-10 w-10"></div>
        <div className="text-lg font-semibold">S.N.S Podcast</div>
      </div>

      
      <nav className="flex items-center space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/favourites" className="hover:underline">
          Favourites
        </Link>
      </nav>

      
      <div className="flex items-center space-x-3 pr-4">
        <div
          onClick={() => setShowSearch((prev) => !prev)}
          className="bg-[url('/src/assets/loupe.png')] bg-cover bg-center h-4 w-4 cursor-pointer"
        ></div>
        <div className="bg-[url('/src/assets/profile.png')] bg-cover bg-center h-6 w-6"></div>
      </div>

      
      {showSearch && (
        <div className="absolute top-12 right-4">
          <SearchBar onSearch={handleSearch} visible={showSearch} />
        </div>
      )}
    </header>
  );
}
