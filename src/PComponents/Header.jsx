// Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import { useSearch } from "../context/SearchContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const { setSearch } = useSearch();
  const { isDark, toggleTheme } = useTheme();

  
  const handleSearch = (term) => {
  setSearch(term);
};


  return (
    <header className="relative border bg-[#006633] dark:bg-[#52178F]  dark:border-[#48E12A] text-[#00E070] border-[#FF6B35] shadow max-h-20 flex items-center pl-4 justify-between">
      
      <div className="flex items-center space-x-2">
        <img src="./src/assets/S.N.S Logo.png" className="bg-cover bg-center h-15 w-auto" alt="Logo" />
        <div className="text-lg hidden sm:block font-semibold">S.N.S Podcast</div>
      </div>

      
      <nav className="flex items-center space-x-4">
        <Link to="/" className="text-lg font-semibold hover:underline">
          Home
        </Link>
        <Link to="/favourites" className="text-lg font-semibold hover:underline">
          Favourites
        </Link>
      </nav>

      
      <div className="flex items-center space-x-3 pr-4">
        <div
          onClick={() => setShowSearch((prev) => !prev)}
          className="bg-[url('/src/assets/loupe.png')] bg-cover bg-center h-4 w-4 cursor-pointer"
        ></div>

        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          {isDark ? "☀️" : "🌑"}
        </button>

        <div className="bg-[url('/src/assets/profile.png')] bg-cover bg-center h-6 w-6"></div>
      </div>

      
      {showSearch && (
        <div className="absolute top-2.5 right-16">
          <SearchBar onSearch={handleSearch} visible={showSearch} />
        </div>
      )}
    </header>
  );
}
