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
  priceRange = { min: 0, max: 5000000 }
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

        {/* Popular Amenities */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Popular Amenities
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {amenities.slice(0, 10).map(amenity => (
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
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;