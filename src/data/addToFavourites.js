// ./src/data/addToFavourites.js
import { useState, useEffect } from "react";

let listeners = [];

export function useFavourites() {
  const [favourites, setFavouritesState] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );

  useEffect(() => {
    const listener = (newFavourites) => setFavouritesState([...newFavourites]);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  const setFavourites = (newFavs) => {
    localStorage.setItem("favourites", JSON.stringify(newFavs));
    listeners.forEach((listener) => listener(newFavs));
  };

  const addToFavourites = (episode) => {
    const stored = [...favourites];
    if (!stored.find((ep) => ep.id === episode.id)) {
      stored.push(episode);
      setFavourites(stored);
      alert(`${episode.title} added to favourites!`);
    }
  };

  const removeFavourite = (id) => {
    const updated = favourites.filter((ep) => ep.id !== id);
    setFavourites(updated);
  };

  return { favourites, addToFavourites, removeFavourite };
}
