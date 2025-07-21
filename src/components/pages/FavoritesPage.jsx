import React, { useEffect } from "react";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useNavigate } from "react-router-dom";
import usePropertyData from "@/hooks/usePropertyData";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const {
    favorites,
    loading,
    error,
    toggleFavorite,
    loadFavorites,
    retryLoad
  } = usePropertyData();

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const handleClearFilters = () => {
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Your Favorite Properties
            </h1>
            <p className="text-gray-600">
              {loading ? "Loading..." : `${favorites.length} saved properties`}
            </p>
          </div>
          
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ApperIcon name="Plus" size={18} />
            Browse More Properties
          </Button>
        </div>

        {/* Quick Actions */}
        {!loading && favorites.length > 0 && (
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <ApperIcon name="Heart" size={20} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Great choices!
                  </h3>
                  <p className="text-sm text-gray-600">
                    You've saved {favorites.length} properties. Ready to take the next step?
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ApperIcon name="Share" size={16} className="mr-1" />
                  Share List
                </Button>
                <Button variant="primary" size="sm">
                  <ApperIcon name="Calendar" size={16} className="mr-1" />
                  Schedule Tours
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Favorites Grid */}
      <PropertyGrid
        properties={favorites}
        loading={loading}
        error={error}
        onToggleFavorite={toggleFavorite}
        onRetry={() => {
          retryLoad();
          loadFavorites();
        }}
        onClearFilters={handleClearFilters}
      />

      {/* Empty State Enhancement */}
      {!loading && favorites.length === 0 && (
        <div className="mt-8">
          <div className="bg-gradient-to-br from-accent-50 to-primary-50 border border-accent-100 rounded-xl p-8 text-center">
            <div className="mb-6">
              <div className="bg-gradient-to-r from-accent-100 to-primary-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <ApperIcon name="Heart" size={32} className="text-accent-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                Start Building Your Favorites
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                As you browse properties, click the heart icon to save your favorites here. 
                It's a great way to compare properties and keep track of the ones you love.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <ApperIcon name="Search" size={24} className="text-primary-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm mb-1">Browse</h4>
                <p className="text-xs text-gray-600">Explore available properties</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <ApperIcon name="Heart" size={24} className="text-accent-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm mb-1">Save</h4>
                <p className="text-xs text-gray-600">Click the heart to save favorites</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <ApperIcon name="Calendar" size={24} className="text-success mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm mb-1">Tour</h4>
                <p className="text-xs text-gray-600">Schedule visits to your favorites</p>
              </div>
            </div>
            
            <Button onClick={() => navigate("/")} size="lg">
              <ApperIcon name="Home" size={20} className="mr-2" />
              Browse Properties
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;