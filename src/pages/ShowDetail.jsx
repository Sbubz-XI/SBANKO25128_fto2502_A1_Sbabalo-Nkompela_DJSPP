import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPodcastById } from "../utils/api.js";
import SeasonEpisodes from "../components/SeasonEpisodes.jsx";
import { genres as allGenres } from "../data/genres.js";

export default function ShowDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );

  useEffect(() => {
    async function fetchShow() {
      try {
        const data = await fetchPodcastById(id);
        setPodcast(data);

        if (data.seasons && data.seasons.length > 0) {
          setSelectedSeason({
            ...data.seasons[0],
            id: data.seasons[0].id || data.seasons[0].title,
            episodes: data.seasons[0].episodes || [],
            podcastImage: data.image,
            podcastTitle: data.title,
          });
        }
      } catch (err) {
        setError("Failed to load podcast.");
      } finally {
        setLoading(false);
      }
    }
    fetchShow();
  }, [id]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Unknown";
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const addToFavourites = (episode) => {
    const stored = [...favourites];
    if (!stored.find((ep) => ep.id === episode.id)) {
      stored.push({
        ...episode,
        podcastImage: podcast.image,
        podcastTitle: podcast.title,
      });
      localStorage.setItem("favourites", JSON.stringify(stored));
      setFavourites(stored);
      alert(`${episode.title} added to favourites!`);
    }
  };

  const fetchSeasonDetails = async (seasonId) => {
    if (!seasonId) return;
    try {
      const response = await fetch(`https://podcast-api.netlify.app/id/${seasonId}`);
      if (!response.ok) throw new Error("Invalid season ID");
      const data = await response.json();

      setSelectedSeason((prev) => ({
        ...prev,
        ...data,
        id: data.id || prev.id,
        episodes: data.episodes || prev.episodes,
        podcastImage: podcast.image,
        podcastTitle: podcast.title,
      }));
    } catch (err) {
      console.error("Failed to fetch deeper season details:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const genreTitles = (podcast.genres || []).map((genre) => {
    if (typeof genre === "number") return allGenres.find((g) => g.id === genre)?.title || "Unknown";
    if (typeof genre === "string") return genre;
    return "Unknown";
  });

  const formattedDate = podcast.updated ? formatDate(podcast.updated) : null;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-[#FF6B35] border-[#006633] border-2 rounded-lg shadow-md">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 border border-[#006633] rounded-lg text-[#006633] bg-[#FFA585] font-bold hover:bg-gray-100"
      >
        ← Back
      </button>

      <h1 className="text-[#006633] text-2xl md:text-3xl font-bold mb-4">{podcast.title}</h1>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <img
          src={podcast.image}
          alt={podcast.title}
          className="w-full md:w-1/3 max-h-64 md:max-h-full rounded-lg object-cover shadow-lg"
        />
        <div className="md:w-2/3">
          <h2 className="text-xl font-bold mb-2 text-[#006633]">Description</h2>
          <p className="text-white font-semibold leading-relaxed overflow-y-auto max-h-60">
            {podcast.description || "No description available."}
          </p>
        </div>
      </div>

      {genreTitles.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-3 text-[#006633]">Genres</h2>
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

      {formattedDate && (
        <p className="text-sm text-white mb-6">
          <span className="font-semibold">Last updated:</span> {formattedDate}
        </p>
      )}

      <SeasonEpisodes
        seasons={podcast.seasons || []}
        selectedSeason={selectedSeason}
        setSelectedSeason={setSelectedSeason}
        addToFavourites={addToFavourites}
        favourites={favourites}
        fetchSeasonDetails={fetchSeasonDetails}
      />
    </div>
  );
}
