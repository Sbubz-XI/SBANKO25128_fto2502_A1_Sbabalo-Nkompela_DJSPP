import React, { useState, useEffect } from "react";
import { useAudio } from "../context/AudioContext.jsx";

export default function AudioPlayer() {
  const { track, isPlaying, togglePlayPause, audioRef, seek } = useAudio();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!track) return;

    audioRef.current.src = track.src;
    audioRef.current.play();
    setDuration(audioRef.current.duration || 0);

    const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);
    const handleLoadedMetadata = () => setDuration(audioRef.current.duration);

    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [track, audioRef]);

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <audio ref={audioRef} />
      <div className="fixed bottom-0 left-0 right-0 bg-[#f26431] dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 p-3 flex items-center justify-between shadow-lg z-50">

        {/* Left: Track info */}
        <div className="flex items-center space-x-3 min-w-0">
          {track ? (
            <>
              <img
                src={track.image}
                alt={track.title}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div className="truncate">
                <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {track.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300 truncate">
                  {track.podcastTitle}
                </div>
              </div>
            </>
          ) : (
            <div className="text-gray-500 dark:text-gray-300 text-sm">
              No track playing
            </div>
          )}
        </div>

        {/* Center: Seek buttons + play/pause */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => seek(-10)}
            className="px-2 py-1 bg-[#59AEFA] dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            ⏪
          </button>
          <button
            onClick={togglePlayPause}
            className="px-3 py-1 rounded-lg bg-[#59AEFA] hover:bg-blue-600 text-white"
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>
          <button
            onClick={() => seek(10)}
            className="px-2 py-1 bg-[#59AEFA] dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            ⏩
          </button>
        </div>

        {/* Right: Duration, volume, queue */}
        <div className="flex items-center space-x-3">
          {track && (
            <div className="hidden sm:flex items-center space-x-1">
              <span className="text-xs text-gray-500 dark:text-gray-300">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) => {
                  audioRef.current.currentTime = e.target.value;
                  setCurrentTime(e.target.value);
                }}
                className="w-24"
              />
              <span className="text-xs text-gray-500 dark:text-gray-300">
                {formatTime(duration)}
              </span>
            </div>
          )}

          {/* Volume control */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            defaultValue="1"
            onChange={(e) => (audioRef.current.volume = e.target.value)}
            className="w-20"
          />

          {/* Queue button */}
          <button className="px-2 py-1 bg-[#59AEFA] dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
            📃
          </button>
        </div>
      </div>
    </>
  );
}
