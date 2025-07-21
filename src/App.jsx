import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import BrowsePage from "@/components/pages/BrowsePage";
import PropertyDetailPage from "@/components/pages/PropertyDetailPage";
import MapPage from "@/components/pages/MapPage";
import FavoritesPage from "@/components/pages/FavoritesPage";
import propertyService from "@/services/api/propertyService";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favoritesCount, setFavoritesCount] = useState(0);

  // Update favorites count
  const updateFavoritesCount = () => {
    const favorites = JSON.parse(localStorage.getItem("propertyFavorites")) || [];
    setFavoritesCount(favorites.length);
  };

  // Listen for favorites changes
  useEffect(() => {
    updateFavoritesCount();
    
    const handleStorageChange = () => {
      updateFavoritesCount();
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    // Custom event listener for same-tab updates
    const handleFavoritesUpdate = () => {
      updateFavoritesCount();
    };
    
    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
    };
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header onSearch={handleSearch} favoritesCount={favoritesCount} />
        
        <main>
          <Routes>
            <Route 
              path="/" 
              element={<BrowsePage searchQuery={searchQuery} />} 
            />
            <Route 
              path="/property/:id" 
              element={<PropertyDetailPage />} 
            />
            <Route 
              path="/map" 
              element={<MapPage />} 
            />
            <Route 
              path="/favorites" 
              element={<FavoritesPage />} 
            />
          </Routes>
        </main>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="z-50"
          toastClassName="font-body"
          bodyClassName="text-sm"
          progressClassName="bg-gradient-to-r from-primary-500 to-accent-500"
        />
      </div>
    </Router>
  );
}

export default App;