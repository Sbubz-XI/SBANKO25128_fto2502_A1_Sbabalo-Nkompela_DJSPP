// Favourites.jsx
import React, { useEffect, useState } from "react";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(stored);
  }, []);

  const removeFavourite = (id) => {
    const updated = favourites.filter((ep) => ep.id !== id);
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  const isFavourite = (episode) => favourites.some((ep) => ep.id === episode.id);

  return (
    <div className="flex flex-col text-center p-6">
      <h1 className="text-2xl font-bold text-[#006633] mb-4">❤️ My Favourites</h1>

      {favourites.length === 0 ? (
        <p className="font-bold text-white">You have no favourite episodes yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favourites.map((episode, index) => (
            <div
              key={episode.id || index}
              className="bg-[#FF6B35] dark:bg-[#52178F] shadow-md rounded-lg p-4 border border-[#006633] hover:shadow-lg transition"
            >
              {episode.podcastImage && (
                <img
                  src={episode.podcastImage}
                  alt={episode.podcastTitle}
                  className="w-full h-48 bg-contain bg-center object-cover rounded-lg mb-3 border border-[#006633]"
                />
              )}
              <h2 className="font-bold text-xl text-[#006633] dark:text-[#48E12A] mb-2">{episode.title}</h2>
              {episode.podcastTitle && (
                <p className="text-sm font-bold text-[#00E070] mt-1">From: {episode.podcastTitle}</p>
              )}

              <button
                onClick={() => removeFavourite(episode.id)}
                className="mt-3 text-2xl hover:text-red-600"
              >
                {isFavourite(episode) ? "❤️" : "🤍"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
