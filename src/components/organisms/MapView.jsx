import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const MapView = ({ properties = [], onPropertySelect }) => {
  // Mock map implementation - in a real app, you'd use Google Maps, Mapbox, etc.
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl overflow-hidden" style={{ height: "600px" }}>
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 to-accent-100/20">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg hover:bg-white transition-colors">
          <ApperIcon name="Plus" size={20} className="text-gray-700" />
        </button>
        <button className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg hover:bg-white transition-colors">
          <ApperIcon name="Minus" size={20} className="text-gray-700" />
        </button>
        <button className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg hover:bg-white transition-colors">
          <ApperIcon name="Locate" size={20} className="text-gray-700" />
        </button>
      </div>

      {/* Property Markers */}
      <div className="absolute inset-0">
        {properties.map((property, index) => {
          // Mock positioning - in a real app, you'd use actual coordinates
          const left = `${20 + (index % 4) * 20}%`;
          const top = `${20 + Math.floor(index / 4) * 25}%`;

          return (
            <div
              key={property.Id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left, top }}
              onClick={() => onPropertySelect?.(property)}
            >
              {/* Property Marker */}
              <div className="bg-primary-600 text-white px-3 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-110 flex items-center gap-2">
                <ApperIcon name="Home" size={16} />
                <span className="font-semibold text-sm">
                  ${property.price >= 1000000 
                    ? `${(property.price / 1000000).toFixed(1)}M`
                    : `${Math.round(property.price / 1000)}K`
                  }
                </span>
              </div>

              {/* Property Preview Card */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl p-3 min-w-[250px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-10">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-24 object-cover rounded-md mb-2"
                />
                <h4 className="font-semibold text-sm text-gray-900 mb-1">
                  {property.title}
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  {property.city}, {property.state}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span>{property.bedrooms} bed</span>
                    <span>{property.bathrooms} bath</span>
                  </div>
                  <Badge variant="primary" className="text-xs">
                    {property.listingType}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <h3 className="font-semibold text-sm text-gray-900 mb-2">Legend</h3>
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
            <span>Available Properties</span>
          </div>
          <div className="flex items-center gap-2">
            <ApperIcon name="Info" size={12} className="text-gray-400" />
            <span>Hover for details</span>
          </div>
        </div>
      </div>

      {/* No Properties Message */}
      {properties.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
            <ApperIcon name="MapPin" size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600">
              No properties match your current filters. Try adjusting your search criteria.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;