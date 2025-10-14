import React from "react";
import { genres } from "../data/genres.js";
import "./PodModal.css";

/**
 * PodModal component displays detailed information about a single podcast
 *
 * @param {object} props - Component properties.
 * @param {object} props.podcast - The podcast data object.
 * @param {function} props.onClose - Function to call when the modal is closed.
 */

function getGenreTitles(ids) {
  if (!ids?.length) return ["Unknown"];
  return ids.map((id) => genres.find((g) => g.id === id)?.title || "Unknown");
}

function PodModal({ podcast, onClose }) {
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
            <h2 className="text-lg font-bold mb-3 text-gray-800">
              Seasons ({podcastSeasons.length})
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {podcastSeasons.map((season, index) => (
                <div
                  key={season.id || index}
                  className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg border border-gray-200 p-4"
                >
                  <h3 className="font-semibold text-gray-800">{season.title}</h3>
                  <span className="text-sm text-gray-600 font-medium">
                    {season.episodes?.length || 0} episodes
                  </span>
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
