export async function fetchAllPodcasts() {
  const res = await fetch("https://podcast-api.netlify.app");
  if (!res.ok) throw new Error("Failed to fetch podcast previews");
  return res.json();
}

export async function fetchPodcastById(id) {
  const res = await fetch(`https://podcast-api.netlify.app/id/${id}`);
  if (!res.ok) throw new Error("Failed to fetch podcast details");
  return res.json();
}