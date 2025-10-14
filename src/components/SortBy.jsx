import React from "react";

/**
 * @param {object} props
 * @param {string} props.value
 * @param {(sortKey: string) => void} props.onChange
 * @param {{label: string, value: string}[]} props.options 
 */
export default function SortBy({ value, onChange, options }) {
  return (
    <div className="ml-4">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white shadow-md cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400 transition duration-150 ease-in-out"
      >
      
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}