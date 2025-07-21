import React from "react";
import Input from "@/components/atoms/Input";

const PriceRange = ({ minPrice, maxPrice, onMinChange, onMaxChange }) => {
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price}`;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <Input
            type="number"
            value={minPrice || ""}
            onChange={(e) => onMinChange(e.target.value ? parseInt(e.target.value) : null)}
            placeholder="0"
            min="0"
          />
        </div>
        <div className="flex-shrink-0 pt-6">
          <span className="text-gray-400">to</span>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <Input
            type="number"
            value={maxPrice || ""}
            onChange={(e) => onMaxChange(e.target.value ? parseInt(e.target.value) : null)}
            placeholder="Any"
            min="0"
          />
        </div>
      </div>
      
      {(minPrice || maxPrice) && (
        <div className="text-sm text-gray-600">
          Range: {minPrice ? formatPrice(minPrice) : "$0"} - {maxPrice ? formatPrice(maxPrice) : "Any"}
        </div>
      )}
    </div>
  );
};

export default PriceRange;