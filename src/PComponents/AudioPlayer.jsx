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
      <div className="fixed bottom-0 left-0 right-0 max-h-15 bg-[#006633] dark:bg-[#52178F] border border-[#FF6B35] dark:border-[#9950E2] p-3 flex items-center justify-between shadow-lg z-50">

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
                <div className="text-sm font-semibold text-[#FF6B35] dark:text-[#52178F] truncuate">
                  {track.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300 truncate">
                  {track.podcastTitle}
                </div>
              </div>
            </>
          ) : (
            <div className="text-white text-md">
              No track playing
            </div>
          )}
        </div>

        {/* Center: Seek buttons + play/pause */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => seek(-10)}
            className="px-2 py-1 bg-[#00E070] border border-[#FF6B35]  dark:bg-[#9950E2] dark:border-[#48E12A] rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            ⏪
          </button>
          <button
            onClick={togglePlayPause}
            className="px-3 py-1 rounded-lg bg-[#00E070] border border-[#FF6B35] dark:bg-[#9950E2] dark:border-[#48E12A] hover:bg-blue-600 text-white"
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>
          <button
            onClick={() => seek(10)}
            className="px-2 py-1 bg-[#00E070] border border-[#FF6B35] dark:bg-[#9950E2] dark:border-[#48E12A] rounded hover:bg-gray-300 dark:hover:bg-gray-600"
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
          <button className="px-2 py-1 bg-[#00E070] border border-[#FF6B35] dark:bg-[#9950E2] dark:border-[#48E12A] rounded hover:bg-gray-300 dark:hover:bg-gray-600">
            📃
          </button>
        </div>
      </div>
    </>
  );
}
