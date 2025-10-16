import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllPodcasts } from "../utils/api.js"; // make sure this returns all podcasts

export default function PodcastCarousel() {
  const [podcasts, setPodcasts] = useState([]);
  const navigate = useNavigate();

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

  if (podcasts.length === 0) return <div>Loading podcasts...</div>;

  return (
    <div className="relative w-full overflow-x-auto py-4">
      <div className="flex gap-4">
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="flex-none w-48 cursor-pointer hover:scale-105 transition-transform"
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
