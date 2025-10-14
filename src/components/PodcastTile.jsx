import React from "react";
import { fetchAllPodcasts } from "../utils/api.js";
import { useNavigate } from "react-router-dom";
import { genres } from "../data/genres.js";

function timeAgo(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Unknown date";
  const now = Date.now();
  const diffDays = Math.floor((now - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  }
  const years = Math.floor(diffDays / 365);
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}

function getGenreTitles(ids) {
  if (!ids?.length) return ["Unknown"];
  return ids.map((id) => genres.find((g) => g.id === id)?.title || "Unknown");
}

export default function PodcastTile({ podcast }) {
  const navigate = useNavigate();
  const genreTitles = getGenreTitles(podcast.genres);

  const handleClick = () => {
    navigate(`/show/${podcast.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border border-gray-200 shadow-lg rounded-lg overflow-hidden bg-white transition-transform duration-300 cursor-pointer p-4 h-full flex flex-col justify-center hover:scale-105"
    >
      <img
        src={podcast.image}
        alt={podcast.title}
        className="w-full h-auto object-cover rounded-lg mb-3"
      />
      <div className="pl-2">
        <div className="text-xl font-extrabold mb-1">{podcast.title}</div>

        <div className="flex flex-wrap gap-1 text-sm font-semibold text-gray-700">
          {genreTitles.map((title, index) => (
            <span
              key={index}
              className="text-md font-bold px-1 py-0.5 rounded-lg border bg-gray-200 "
            >
              {title}
            </span>
          ))}
        </div>

        <div className="mt-2 text-gray-500 font-medium text-sm">
          Updated {timeAgo(podcast.updated)}
        </div>
      </div>
    </div>
  );
}

