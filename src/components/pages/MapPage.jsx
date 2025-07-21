import React from "react";
import { useNavigate } from "react-router-dom";
import MapView from "@/components/organisms/MapView";
import PropertyFilter from "@/components/organisms/PropertyFilter";
import FilterChip from "@/components/molecules/FilterChip";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import usePropertyData from "@/hooks/usePropertyData";

const MapPage = () => {
  const navigate = useNavigate();
  const {
    properties,
    loading,
    error,
    filters,
    propertyTypes,
    amenities,
    applyFilters,
    clearFilters,
    retryLoad
  } = usePropertyData();

  const handlePropertySelect = (property) => {
    navigate(`/property/${property.Id}`);
  };

  const getFilterSummary = () => {
    const summary = [];
    
    if (filters.minPrice || filters.maxPrice) {
      const minPrice = filters.minPrice ? `$${filters.minPrice.toLocaleString()}` : "$0";
      const maxPrice = filters.maxPrice ? `$${filters.maxPrice.toLocaleString()}` : "Any";
      summary.push(`Price: ${minPrice} - ${maxPrice}`);
    }
    
    if (filters.minBeds) {
      summary.push(`${filters.minBeds}+ beds`);
    }
    
    if (filters.propertyType && filters.propertyType.length > 0) {
      summary.push(...filters.propertyType.map(type => `Type: ${type}`));
    }
    
    return summary;
  };

  const removeFilter = (filterToRemove) => {
    const newFilters = { ...filters };
    
    if (filterToRemove.startsWith("Price:")) {
      delete newFilters.minPrice;
      delete newFilters.maxPrice;
    } else if (filterToRemove.includes("beds")) {
      delete newFilters.minBeds;
    } else if (filterToRemove.startsWith("Type:")) {
      const type = filterToRemove.replace("Type: ", "");
      newFilters.propertyType = (newFilters.propertyType || []).filter(t => t !== type);
    }
    
    applyFilters(newFilters);
  };

  const filterSummary = getFilterSummary();

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <ApperIcon name="AlertCircle" size={48} className="text-error mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Map</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={retryLoad}>
            <ApperIcon name="RefreshCw" size={18} className="mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col xl:flex-row gap-8">
        {/* Sidebar - Filter */}
        <div className="xl:w-80 flex-shrink-0">
          <PropertyFilter
            filters={filters}
            onFiltersChange={applyFilters}
            propertyTypes={propertyTypes}
            amenities={amenities}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">
                  Property Map View
                </h1>
                <p className="text-gray-600">
                  {loading ? "Loading properties..." : `${properties.length} properties shown on map`}
                </p>
              </div>
              
              <Button
                onClick={() => navigate("/")}
                variant="outline"
              >
                <ApperIcon name="Grid3X3" size={18} className="mr-2" />
                Grid View
              </Button>
            </div>

            {/* Active Filters */}
            {filterSummary.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm font-medium text-gray-700">Active filters:</span>
                {filterSummary.map((filter, index) => (
                  <FilterChip
                    key={index}
                    label={filter}
                    onRemove={() => removeFilter(filter)}
                    variant="primary"
                  />
                ))}
                <Button
                  onClick={clearFilters}
                  variant="ghost"
                  size="sm"
                  className="text-accent-600 hover:text-accent-700"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Map */}
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-lg">
                  <div className="animate-spin">
                    <ApperIcon name="Loader2" size={20} className="text-primary-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Loading properties...</span>
                </div>
              </div>
            )}
            
            <MapView 
              properties={properties}
              onPropertySelect={handlePropertySelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;