import React from "react";

export default function SeasonEpisodes({
  seasons,
  selectedSeason,
  setSelectedSeason,
  favourites,
  setFavourites,
  fetchSeasonDetails,
}) {
  if (!seasons || seasons.length === 0) return null;

  // Helper to create a unique ID per episode per podcast
  const getEpisodeKey = (episode) =>
    `${selectedSeason.podcastTitle || "podcast"}-${episode.id || episode.title}`;

  const isFavourite = (episode) =>
    favourites.some((ep) => getEpisodeKey(ep) === getEpisodeKey(episode));

  const addToFavourites = (episode) => {
    const key = getEpisodeKey(episode);
    const updated = isFavourite(episode)
      ? favourites.filter((ep) => getEpisodeKey(ep) !== key)
      : [...favourites, episode];

    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  return (
    <div className="mb-4">
      <label className="text-lg font-bold mb-2 block text-[#006633] dark:text-[#48E12A]">
        Select Season
      </label>

      <select
        value={selectedSeason?.id || ""}
        onChange={(e) => {
          const seasonId = e.target.value;
          const season = seasons.find(
            (s) => s.id?.toString() === seasonId.toString()
          );
          setSelectedSeason(
            season
              ? {
                  ...season,
                  episodes: season.episodes || [],
                  podcastImage: selectedSeason?.podcastImage,
                  podcastTitle: selectedSeason?.podcastTitle,
                }
              : null
          );
        }}
        className="border border-[#006633]  bg-[#FFA585] dark:text-[#48E12A] dark:bg-[#9950E2] dark:border-[#48E12A] text-white font-semibold rounded-lg p-2 w-auto mb-4"
      >
        {seasons.map((season, index) => (
          <option
            key={season.id || season.title || index}
            value={season.id || season.title || index}
          >
            {season.title} ({season.episodes?.length || 0} episodes)
          </option>
        ))}
      </select>

      {selectedSeason && selectedSeason.episodes?.length > 0 ? (
        <div>
          <h2 className="text-lg font-bold mb-3 text-[#006633] dark:text-[#48E12A]">
            Episodes - {selectedSeason.title || "Select a season"}
          </h2>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {selectedSeason.episodes.map((episode, index) => (
              <span
                key={getEpisodeKey(episode)}
                className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg border border-gray-200 p-4"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{episode.title}</h3>
                  {episode.duration && (
                    <p className="text-xs text-gray-500">
                      Duration: {episode.duration}
                    </p>
                  )}
                  {episode.releaseDate && (
                    <p className="text-xs text-gray-500">
                      Released: {episode.releaseDate}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {fetchSeasonDetails && (
                    <button
                      onClick={() => fetchSeasonDetails(selectedSeason.id)}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      More Info
                    </button>
                  )}

                  <button
                    onClick={() =>
                      addToFavourites({
                        ...episode,
                        podcastImage: selectedSeason.podcastImage,
                        podcastTitle: selectedSeason.podcastTitle,
                      })
                    }
                    className="text-2xl hover:text-red-600"
                  >
                    {isFavourite(episode) ? "❤️" : "🤍"}
                  </button>
                </div>
              </span>
            ))}
          </div>
        </div>
      ) : selectedSeason ? (
        <p className="text-gray-500">No episodes available for this season.</p>
      ) : null}
    </div>
  );
}
