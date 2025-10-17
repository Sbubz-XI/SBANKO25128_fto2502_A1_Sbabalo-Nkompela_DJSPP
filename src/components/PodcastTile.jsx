import React from "react";
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
      className= "shadow-lg rounded-lg overflow-hidden border-[#006633] border bg-[#FF6B35] dark:bg-[#52178F] transition-transform duration-300 cursor-pointer p-4 lg:h-auto md:h-auto h-25 flex flex-col justify-center hover:scale-105"
    >
      <div className=" w-full h-80% mb-2">
         <img
        src={podcast.image}
        alt={podcast.title}
        className="w-full h-full bg-contain bg-center object-cover rounded-lg mb-3"
      />
      </div>
     
      <div className="flex flex-col flex-grow">
        <div className="text-xl text-center bg-[#00E070] rounded-2xl font-extrabold mb-2 p- text-[#006633]">{podcast.title}</div>

        <div className="flex flex-wrap gap-1 text-sm font-semibold text-[#006633]">
          {genreTitles.map((title, index) => (
            <span
              key={index}
              className="text-md font-bold px-1 py-0.5 rounded-lg border border-[#006633] bg-[#FFA585] "
            >
              {title}
            </span>
          ))}
        </div>

        <div className="mt-2 text-white font-medium text-sm">
          Updated {timeAgo(podcast.updated)}
        </div>
      </div>
    </div>
  );
}

