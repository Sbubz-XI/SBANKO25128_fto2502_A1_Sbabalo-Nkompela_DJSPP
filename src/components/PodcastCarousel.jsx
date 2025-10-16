import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllPodcasts } from "../utils/api.js";

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
    const scrollAmount = 300; // adjust as needed
    if (direction === "left") {
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (podcasts.length === 0) return <div>Loading podcasts...</div>;

  return (
    <div className="relative w-full py-4">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/3 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow hover:bg-white/90"
      >
        ◀
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/3 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow hover:bg-white/90"
      >
        ▶
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide relative"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {/* Side fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white pointer-events-none" />

        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="flex-none w-48 scroll-snap-align-start cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate(`/show/${podcast.id}`)}
          >
            <img
              src={podcast.image}
              alt={podcast.title}
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <h3 className="text-sm font-semibold text-gray-800 mt-2">{podcast.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
                                                                                                        