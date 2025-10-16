const BASE_URL = "https://podcast-api.netlify.app";


export async function fetchAllPodcasts() {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) throw new Error("Failed to fetch podcast previews");
  return res.json();
}

/**
 * Fetch a podcast by its ID
 * Returns a SHOW object with embedded SEASON and EPISODE objects
 * @param {string | number} id
 */
export async function fetchPodcastById(id) {
  const res = await fetch(`${BASE_URL}/id/${id}`);
  if (!res.ok) throw new Error("Failed to fetch podcast details");
  return res.json();
}

/**
 * Fetch a genre by its ID
 * Returns a GENRE object
 * @param {string | number} id
 */
export async function fetchGenreById(id) {
  const res = await fetch(`${BASE_URL}/genre/${id}`);
  if (!res.ok) throw new Error("Failed to fetch genre");
  return res.json();
}


export async function fetchGenresByIds(ids = []) {
  if (!ids.length) return [];
  const promises = ids.map((id) => fetchGenreById(id));
  return Promise.all(promises);
}
