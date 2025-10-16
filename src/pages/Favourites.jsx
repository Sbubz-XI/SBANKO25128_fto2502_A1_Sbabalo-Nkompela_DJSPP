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
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">❤️ My Favourites</h1>

      {favourites.length === 0 ? (
        <p className="text-gray-500">You have no favourite episodes yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favourites.map((episode, index) => (
            <div
              key={episode.id || index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
            >
              {episode.podcastImage && (
                <img
                  src={episode.podcastImage}
                  alt={episode.podcastTitle}
                  className="w-full h-48 bg-contain bg-center object-cover rounded-lg mb-3"
                />
              )}
              <h2 className="font-semibold text-gray-800 mb-2">{episode.title}</h2>
              {episode.duration && (
                <p className="text-sm text-gray-500">Duration: {episode.duration}</p>
              )}
              {episode.releaseDate && (
                <p className="text-sm text-gray-500">Released: {episode.releaseDate}</p>
              )}
              {episode.podcastTitle && (
                <p className="text-xs text-gray-400 mt-1">From: {episode.podcastTitle}</p>
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
