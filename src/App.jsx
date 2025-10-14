import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext.jsx";
import HomePage from "./pages/HomePage.jsx";
import ShowDetail from "./pages/ShowDetail.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  return (
    <SearchProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/show/:id" element={<ShowDetail />} />
          </Route>
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
