import React from "react";


/**
 * @param {object} props
 * @param {{id: number, title: string}[]} props.genres - List of genre objects.
 * @param {string} props.selected - The currently selected genre ID (string or empty string).
 * @param {(genreId: string) => void} props.onChange - Callback to set the genre state in App.jsx.
 */
export default function Filter({ genres, selected, onChange }) {
  return (
    <div className="ml-4">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white shadow-md cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400 transition duration-150 ease-in-out"
      >
        <option value="">All Genres</option>
        
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.title}
          </option>
        ))}
      </select>
    </div>
  );
}