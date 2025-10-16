import React, { createContext, useContext, useRef, useState, useEffect } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (newTrack) => {
    if (!newTrack || !newTrack.src) return;

    if (!track || track.src !== newTrack.src) {
      setTrack(newTrack);
      audioRef.current.src = newTrack.src;
    }

    audioRef.current.play();
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (!audioRef.current.src) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (seconds) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      Math.max(audioRef.current.currentTime + seconds, 0),
      audioRef.current.duration || 0
    );
  };

  // Pause when track ends
  useEffect(() => {
    const audio = audioRef.current;
    const handleEnd = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnd);
    return () => audio.removeEventListener("ended", handleEnd);
  }, []);

  // Confirm before leaving if audio is playing
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isPlaying) {
        e.preventDefault();
        e.returnValue = ""; // required for Chrome
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isPlaying]);

  return (
    <AudioContext.Provider value={{ track, isPlaying, playTrack, togglePlayPause, audioRef, seek }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
