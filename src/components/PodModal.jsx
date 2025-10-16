import React, { useState } from "react";
import { genres } from "../data/genres.js";
import "./PodModal.css";

function getGenreTitles(ids) {
  if (!ids?.length) return ["Unknown"];
  return ids.map((id) => genres.find((g) => g.id === id)?.title || "Unknown");
}

function PodModal({ podcast, onClose }) {
  const [selectedSeason, setSelectedSeason] = useState(null);

  if (!podcast) return null;

  const formattedDate = podcast.updated
    ? new Date(podcast.updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const genreTitles = getGenreTitles(podcast.genres);
  const podcastSeasons = podcast.seasons || [];

  function addToFavourites(episode) {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    if (!stored.find((ep) => ep.id === episode.id)) {
      stored.push(episode);
      localStorage.setItem("favourites", JSON.stringify(stored));
      alert(`${episode.title} added to favourites!`);
    }
  }

  return (
    <dialog id="podcast-modal" open className="pod-modal">
      <div className="md:flex-row gap-6 p-6 relative bg-white rounded-lg">
        {/* Podcast Title */}
        <h1 className="text-xl md:text-2xl font-bold mb-4">{podcast.title}</h1>

        {/* Close Button */}
        <button
          type="button"
          id="close-modal"
          onClick={onClose}
          className="absolute right-2 top-4 h-10 w-10 text-xl text-gray-600 hover:bg-gray-200 transition-colors rounded-full flex items-center justify-center border-none"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Podcast Image & Description */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <img
            src={podcast.image}
            alt={podcast.title}
            className="w-full md:w-1/3 max-h-64 md:max-h-full rounded-lg object-cover shadow-lg"
          />
          <div className="md:w-2/3">
            <h2 className="text-lg font-bold mb-2 text-gray-800">Description</h2>
            <p className="text-gray-700 leading-relaxed overflow-y-auto max-h-40">
              {podcast.description}
            </p>
          </div>
        </div>

        {/* Genres */}
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-3 text-gray-800">Genres</h2>
          <div className="flex flex-wrap gap-1 text-sm font-semibold text-gray-700">
            {genreTitles.map((title, index) => (
              <span
                key={index}
                className="text-md font-bold px-1 py-0.5 rounded-lg border bg-gray-200"
              >
                {title}
              </span>
            ))}
          </div>
        </div>

        {/* Last Updated */}
        {formattedDate && (
          <p id="modal-updated" className="text-sm text-gray-500 mb-6">
            <span className="font-semibold">Last updated:</span> {formattedDate}
          </p>
        )}

        {/* Seasons */}
        {podcastSeasons.length > 0 && (
          <div className="mb-4">
            <label className="text-lg font-bold mb-2 block text-gray-800">
              Select Season
            </label>
            <select
              value={selectedSeason?.id || ""}
              onChange={(e) => {
                const season = podcastSeasons.find(
                  (s) => s.id.toString() === e.target.value
                );
                setSelectedSeason(season);
              }}
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            >
              <option value="">-- Choose a season --</option>
              {podcastSeasons.map((season) => (
                <option key={season.id} value={season.id}>
                  {season.title} ({season.episodes?.length || 0} episodes)
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Episodes for selected season */}
        {selectedSeason && selectedSeason.episodes?.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-3 text-gray-800">
              Episodes - {selectedSeason.title}
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {selectedSeason.episodes.map((episode, index) => (
                <div
                  key={episode.id || index}
                  className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg border border-gray-200 p-4"
                >
                  <h3 className="font-semibold text-gray-800">{episode.title}</h3>

                  <button
                    onClick={() => addToFavourites(episode)}
                    className="text-red-500 hover:text-red-600"
                  >
                    ❤️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}

export default PodModal;
