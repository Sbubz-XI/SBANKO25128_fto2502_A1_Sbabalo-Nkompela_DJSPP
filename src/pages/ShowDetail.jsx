import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPodcastById } from "../utils/api.js";
import { genres as allGenres } from "../data/genres.js";

export default function ShowDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Unknown";
    return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  };

  useEffect(() => {
    async function fetchShow() {
      try {
        const data = await fetchPodcastById(id);
        setPodcast(data);
      } catch (err) {
        setError("Failed to load podcast.");
      } finally {
        setLoading(false);
      }
    }
    fetchShow();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const genreTitles = (podcast.genres || []).map((genre) => {

    if (typeof genre === "number") {
      return allGenres.find((g) => g.id === genre)?.title || "Unknown";
    }

    // If it's already a string, just return it directly
    if (typeof genre === "string") {
      return genre;
    }

    return "Unknown";
  });


  const formattedDate = podcast.updated ? formatDate(podcast.updated) : null;
  const podcastSeasons = podcast.seasons || [];

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 font-semibold hover:bg-gray-100"
      >
        ← Back
      </button>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{podcast.title}</h1>

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
            {podcast.description || "No description available."}
          </p>
        </div>
      </div>

      {/* Genres */}
      {genreTitles.length > 0 && (
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
      )}

      {/* Last Updated */}
      {formattedDate && (
        <p className="text-sm text-gray-500 mb-6">
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
  );
}
