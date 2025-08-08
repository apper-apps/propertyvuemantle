import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import PriceRange from "@/components/molecules/PriceRange";

const PropertyFilter = ({ 
  filters, 
  onFiltersChange, 
  propertyTypes = [],
  amenities = [],
  propertyFeatures = [],
  priceRange = { min: 0, max: 5000000 },
  yearRange = { min: 1800, max: new Date().getFullYear() }
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const togglePropertyType = (type) => {
    const currentTypes = filters.propertyType || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    updateFilter("propertyType", newTypes);
  };

const toggleAmenity = (amenity) => {
    const currentAmenities = filters.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    updateFilter("amenities", newAmenities);
  };

  const togglePropertyFeature = (feature) => {
    const currentFeatures = filters.propertyFeatures || [];
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    updateFilter("propertyFeatures", newFeatures);
  };

  const [amenitySearch, setAmenitySearch] = useState("");
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const filteredAmenities = amenities.filter(amenity =>
    amenity.toLowerCase().includes(amenitySearch.toLowerCase())
  );

  const displayedAmenities = showAllAmenities 
    ? filteredAmenities 
    : filteredAmenities.slice(0, 8);
  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== null && value !== undefined && value !== "";
  });

  return (
    <div className="bg-surface rounded-xl shadow-card border border-gray-100">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden p-4 border-b border-gray-100">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <ApperIcon name="Filter" size={18} />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-accent-500 text-white text-xs rounded-full px-2 py-0.5">
                Active
              </span>
            )}
          </div>
          <ApperIcon name={isOpen ? "ChevronUp" : "ChevronDown"} size={18} />
        </Button>
      </div>

      {/* Filter Content */}
      <div className={`p-4 space-y-6 ${!isOpen ? "hidden lg:block" : ""}`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
            <ApperIcon name="Filter" size={20} />
            Filters
          </h3>
          {hasActiveFilters && (
            <Button
              onClick={clearAllFilters}
              variant="ghost"
              size="sm"
              className="text-accent-600 hover:text-accent-700"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Price Range
          </label>
          <PriceRange
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onMinChange={(value) => updateFilter("minPrice", value)}
            onMaxChange={(value) => updateFilter("maxPrice", value)}
          />
        </div>

{/* Bedrooms */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Bedrooms
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Select
                value={filters.minBeds || ""}
                onChange={(e) => updateFilter("minBeds", e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">Min beds</option>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}+</option>
                ))}
              </Select>
            </div>
            <div>
              <Select
                value={filters.maxBeds || ""}
                onChange={(e) => updateFilter("maxBeds", e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">Max beds</option>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        {/* Year Built */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Year Built
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Select
                value={filters.minYear || ""}
                onChange={(e) => updateFilter("minYear", e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">Min year</option>
                {Array.from({length: 15}, (_, i) => {
                  const year = new Date().getFullYear() - (i * 10);
                  return <option key={year} value={year}>{year}+</option>
                })}
              </Select>
            </div>
            <div>
              <Select
                value={filters.maxYear || ""}
                onChange={(e) => updateFilter("maxYear", e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">Max year</option>
                {Array.from({length: 15}, (_, i) => {
                  const year = new Date().getFullYear() - (i * 10);
                  return <option key={year} value={year}>{year}</option>
                })}
              </Select>
            </div>
          </div>
        </div>

        {/* HOA Fees */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            HOA Fees (Monthly)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="number"
                placeholder="Min HOA"
                value={filters.minHoaFees || ""}
                onChange={(e) => updateFilter("minHoaFees", e.target.value ? parseInt(e.target.value) : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Max HOA"
                value={filters.maxHoaFees || ""}
                onChange={(e) => updateFilter("maxHoaFees", e.target.value ? parseInt(e.target.value) : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Property Type */}
{/* Property Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Property Type
          </label>
          <div className="space-y-2">
            {propertyTypes.map(type => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(filters.propertyType || []).includes(type)}
                  onChange={() => togglePropertyType(type)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Property Features */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Property Features
          </label>
          <div className="space-y-2">
            {propertyFeatures.map(feature => (
              <label key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(filters.propertyFeatures || []).includes(feature)}
                  onChange={() => togglePropertyFeature(feature)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities */}
<div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Amenities
          </label>
          
          {/* Search amenities */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search amenities..."
              value={amenitySearch}
              onChange={(e) => setAmenitySearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            />
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {displayedAmenities.map(amenity => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(filters.amenities || []).includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
          
          {filteredAmenities.length > 8 && (
            <button
              onClick={() => setShowAllAmenities(!showAllAmenities)}
              className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {showAllAmenities ? 'Show Less' : `Show All (${filteredAmenities.length})`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;