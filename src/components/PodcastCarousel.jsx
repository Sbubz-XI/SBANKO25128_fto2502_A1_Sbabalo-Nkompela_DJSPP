import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllPodcasts } from "../utils/api.js";
import { genres } from "../data/genres.js";

function getGenreTitles(ids) {
  if (!ids?.length) return ["Unknown"];
  return ids.map((id) => genres.find((g) => g.id === id)?.title || "Unknown");
}

export default function PodcastCarousel() {
  const [podcasts, setPodcasts] = useState([]);
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchAllPodcasts();
        const shuffled = data.sort(() => Math.random() - 0.5);
        setPodcasts(shuffled);
      } catch (err) {
        console.error("Failed to fetch podcasts:", err);
      }
    }
    fetchData();
  }, []);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = 300;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (podcasts.length === 0) return <div>Loading podcasts...</div>;

  return (
    <div className="relative w-full pb-4 hidden sm:block">
      <h1 className="text-3xl font-bold mb-6 text-[#006633] dark:text-[#48E12A]">
        Discover Podcasts
      </h1>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow hover:bg-white/90"
      >
        ◀
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow hover:bg-white/90"
      >
        ▶
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide relative"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {podcasts.map((podcast) => {
          const genreTitles = getGenreTitles(podcast.genres);

          return (
            <div
              key={podcast.id}
              className="flex-none w-48 border-[#006633] border bg-[#FF6B35] dark:bg-[#52178F] p-2 rounded-lg h-auto scroll-snap-align-start cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate(`/show/${podcast.id}`)}
            >
              <img
                src={podcast.image}
                alt={podcast.title}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <h3 className="text-center text-md font-bold text-[#006633] bg-[#00E070] rounded-2xl mt-2">
                {podcast.title}
              </h3>

              {/* ✅ Genres */}
              <div className="flex flex-wrap gap-1 mt-1 text-sm font-semibold text-[#006633]">
                {genreTitles.map((title, index) => (
                  <span
                    key={index}
                    className="text-sm font-bold px-1 rounded-lg border border-[#006633] bg-[#FFA585]"
                  >
                    {title}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
