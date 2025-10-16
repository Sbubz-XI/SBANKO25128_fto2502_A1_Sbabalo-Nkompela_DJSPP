import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext.jsx";
import { AudioProvider } from "./context/AudioContext.jsx";
import HomePage from "./pages/HomePage.jsx";
import Favourites from "./pages/Favourites.jsx";                                   
import ShowDetail from "./pages/ShowDetail.jsx";
import Layout from "./components/Layout.jsx";

import AudioPlayer from "./PComponents/AudioPlayer.jsx";

function App() {
  return (
    <SearchProvider>
      <AudioProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/show/:id" element={<ShowDetail />} />
              <Route path="/favourites" element={<Favourites />} />
            </Route>
          </Routes>
          <AudioPlayer />
        </Router>
      </AudioProvider>
    </SearchProvider>
  );
}

export default App;
