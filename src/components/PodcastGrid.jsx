import React from "react";
import PodcastTile from "./PodcastTile.jsx";

export default function PodcastGrid({ podcasts, onPodcastClick }) {
  if (!podcasts?.length) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg font-semibold">
        No podcasts found.
      </div>
    );
  }

  return (
    <section
      aria-label="Podcast Grid"
      className="bg-gray-50 md:px-1 lg:px-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {podcasts.map((podcast) => (
        <PodcastTile
          key={podcast.id}
          podcast={podcast}
          onClick={onPodcastClick}
        />
      ))}
    </section>
  );
}
