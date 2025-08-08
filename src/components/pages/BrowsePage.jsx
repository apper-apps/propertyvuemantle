import React, { useState } from "react";
import PropertyFilter from "@/components/organisms/PropertyFilter";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import FilterChip from "@/components/molecules/FilterChip";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import usePropertyData from "@/hooks/usePropertyData";

const BrowsePage = ({ searchQuery }) => {
  const [viewMode, setViewMode] = useState("grid"); // grid or list
const {
    properties,
    loading,
    error,
    filters,
    propertyTypes,
    amenities,
    propertyFeatures,
    toggleFavorite,
    applyFilters,
    clearFilters,
    searchProperties,
    retryLoad
  } = usePropertyData();

  React.useEffect(() => {
    if (searchQuery) {
      searchProperties(searchQuery);
    }
  }, [searchQuery, searchProperties]);

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
    
    if (filters.maxBeds) {
      summary.push(`${filters.maxBeds} beds max`);
    }

    if (filters.minYear || filters.maxYear) {
      const minYear = filters.minYear || "Any";
      const maxYear = filters.maxYear || new Date().getFullYear();
      summary.push(`Built: ${minYear} - ${maxYear}`);
    }

    if (filters.minHoaFees || filters.maxHoaFees) {
      const minHoa = filters.minHoaFees ? `$${filters.minHoaFees}` : "$0";
      const maxHoa = filters.maxHoaFees ? `$${filters.maxHoaFees}` : "Any";
      summary.push(`HOA: ${minHoa} - ${maxHoa}`);
    }
    
    if (filters.propertyType && filters.propertyType.length > 0) {
      summary.push(...filters.propertyType.map(type => `Type: ${type}`));
    }
    
    if (filters.amenities && filters.amenities.length > 0) {
      summary.push(...filters.amenities.map(amenity => `${amenity}`));
    }

    if (filters.propertyFeatures && filters.propertyFeatures.length > 0) {
      summary.push(...filters.propertyFeatures.map(feature => `Feature: ${feature}`));
    }
    
    return summary;
  };

const removeFilter = (filterToRemove) => {
    const newFilters = { ...filters };
    
    if (filterToRemove.startsWith("Price:")) {
      delete newFilters.minPrice;
      delete newFilters.maxPrice;
    } else if (filterToRemove.includes("beds")) {
      if (filterToRemove.includes("max")) {
        delete newFilters.maxBeds;
      } else {
        delete newFilters.minBeds;
      }
    } else if (filterToRemove.startsWith("Built:")) {
      delete newFilters.minYear;
      delete newFilters.maxYear;
    } else if (filterToRemove.startsWith("HOA:")) {
      delete newFilters.minHoaFees;
      delete newFilters.maxHoaFees;
    } else if (filterToRemove.startsWith("Type:")) {
      const type = filterToRemove.replace("Type: ", "");
      newFilters.propertyType = (newFilters.propertyType || []).filter(t => t !== type);
    } else if (filterToRemove.startsWith("Feature:")) {
      const feature = filterToRemove.replace("Feature: ", "");
      newFilters.propertyFeatures = (newFilters.propertyFeatures || []).filter(f => f !== feature);
    } else {
      // It's an amenity
      newFilters.amenities = (newFilters.amenities || []).filter(a => a !== filterToRemove);
    }
    
    applyFilters(newFilters);
  };

  const filterSummary = getFilterSummary();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Filter */}
        <div className="lg:w-80 flex-shrink-0">
          <PropertyFilter
filters={filters}
            onFiltersChange={applyFilters}
            propertyTypes={propertyTypes}
            amenities={amenities}
            propertyFeatures={propertyFeatures}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Results Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">
                  Properties for Sale & Rent
                </h1>
                <p className="text-gray-600">
                  {loading ? "Loading..." : `${properties.length} properties found`}
                </p>
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <ApperIcon name="Grid3X3" size={16} />
                </Button>
                <Button
                  variant={viewMode === "list" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <ApperIcon name="List" size={16} />
                </Button>
              </div>
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

          {/* Property Grid */}
          <PropertyGrid
            properties={properties}
            loading={loading}
            error={error}
            onToggleFavorite={toggleFavorite}
            onRetry={retryLoad}
            onClearFilters={clearFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;