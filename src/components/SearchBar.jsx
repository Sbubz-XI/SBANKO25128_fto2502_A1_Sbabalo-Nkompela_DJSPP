import React, { useState, useEffect } from "react";

/**

 * @param {object} props
 * @param {(search: string) => void} props.onSearch
 * @param {boolean} props.visible 
 */
export default function SearchBar({ onSearch, visible }) {
  
  const [value, setValue] = useState("");

 
  useEffect(() => {
        const id = setTimeout(() => {
      onSearch(value);
    }, 300);

    return () => clearTimeout(id);
  }, [value, onSearch]); 
  

  return (
    <div
      className={`absolute top-0 right-20 transition-all duration-500 ease-in ${
        visible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <input
        type="search"
        placeholder="Search all podcasts…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="lg:w-55 md:w-30 px-4 py-2 border border-gray-300 dark:border-[#48E12A] rounded-lg shadow-lg text-sm text-gray-800 dark:text-[#48E12A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}