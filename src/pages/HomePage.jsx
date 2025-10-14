import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllPodcasts } from "../utils/api.js";
import PodcastGrid from "../components/PodcastGrid.jsx";
import Pagination from "../components/Pagination.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Filter from "../components/Filter.jsx";
import SortBy from "../components/SortBy.jsx";
import { genres } from "../data/genres.js";

export default function HomePage() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [genreId, setGenreId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const navigate = useNavigate();

  useEffect(() => setCurrentPage(1), [search, genreId, sortBy]);

  useEffect(() => {
    async function fetchPreviews() {
      try {
        const data = await fetchAllPodcasts();
        setPodcasts(data);
      } catch (error) {
        console.error("Error fetching podcast previews:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPreviews();
  }, []);

  const openPodcast = (preview) => {
    navigate(`/show/${preview.id}`);
  };

  const filteredPodcasts = podcasts
    .filter((p) => (genreId ? (p.genres || []).includes(Number(genreId)) : true))
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  const sortedPodcasts = filteredPodcasts.slice().sort((a, b) => {
    if (sortBy === "newest") return new Date(b.updated_at || 0) - new Date(a.updated_at || 0);
    if (sortBy === "title-asc") return a.title.localeCompare(b.title);
    if (sortBy === "title-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  const totalPages = Math.ceil(sortedPodcasts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPagePodcasts = sortedPodcasts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4">

        <header className="bg-white border-gray-400 shadow h-12 flex items-center pl-4">
           <div className="bg-[url('/src/assets/podcast-.png')] bg-cover bg-center h-6 w-6 mr-1"></div>
           <div className="text-lg font-semibold">Podcast App</div>


           <div className="absolute right-3 flex space-x-3 items-center">
            <div
                 onClick={() => setShowSearch((prev) => !prev)}
                 className="bg-[url('/src/assets/loupe.png')] bg-cover bg-center h-4 w-4 cursor-pointer"
            ></div>


            <div className="bg-[url('/src/assets/profile.png')] bg-cover bg-center h-6 w-6"></div>
           </div>
        </header>

      <div className="flex items-center mt-4 mb-8 space-x-4">
        <Filter genres={genres} selected={genreId} onChange={setGenreId} />
        <SortBy value={sortBy} onChange={setSortBy} options={[
          { label: "Newest First", value: "newest" },
          { label: "Title A–Z", value: "title-asc" },
          { label: "Title Z–A", value: "title-desc" },
        ]}/>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 bg-white rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          <span className="mt-4 text-lg font-semibold text-gray-700">Loading podcasts...</span>
        </div>
      ) : (
        <PodcastGrid podcasts={currentPagePodcasts} onPodcastClick={openPodcast} />
      )}

      {!loading && totalPages > 1 && (
        <div className="mt-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}

      <SearchBar onSearch={setSearch} visible={showSearch} />
    </div>
  );
}
