import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Lightbox from "@/components/organisms/Lightbox";
import { motion } from "framer-motion";
const PropertyDetail = ({ property, onToggleFavorite }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const formatPrice = (price) => {
    if (property.listingType === "For Rent") {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  const handleContact = () => {
    // In a real app, this would open a contact modal or form
    alert("Contact functionality would be implemented here");
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Image Gallery */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="lg:col-span-2">
          <motion.div
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => openLightbox(0)}
          >
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-96 object-cover rounded-xl shadow-card transition-all duration-300 group-hover:shadow-card-hover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-xl flex items-center justify-center">
              <div className="bg-white bg-opacity-20 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ApperIcon name="Expand" size={24} className="text-white" />
              </div>
            </div>
          </motion.div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          {property.images.slice(1, 3).map((image, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => openLightbox(index + 1)}
            >
              <img
                src={image}
                alt={`${property.title} - Image ${index + 2}`}
                className="w-full h-44 lg:h-44 object-cover rounded-xl shadow-card transition-all duration-300 group-hover:shadow-card-hover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-xl flex items-center justify-center">
                <div className="bg-white bg-opacity-20 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ApperIcon name="Expand" size={20} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center text-gray-600 mb-3">
                  <ApperIcon name="MapPin" size={18} className="mr-2" />
                  <span className="text-lg">
                    {property.address}, {property.city}, {property.state} {property.zipCode}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Badge 
                    variant={property.listingType === "For Rent" ? "accent" : "primary"}
                    className="text-sm font-semibold px-3 py-1"
                  >
                    {property.listingType}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Built in {property.yearBuilt}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onToggleFavorite(property.Id)}
                className="bg-white border-2 border-gray-200 p-3 rounded-full hover:border-red-300 hover:bg-red-50 transition-all duration-200 group"
              >
                <ApperIcon
                  name="Heart"
                  size={24}
                  className={`transition-colors duration-200 ${
                    property.isFavorite
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400 group-hover:text-red-500"
                  }`}
                />
              </button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-primary-50 p-4 rounded-lg text-center">
                <ApperIcon name="Bed" size={24} className="text-primary-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">{property.bedrooms}</div>
                <div className="text-sm text-gray-600">Bedrooms</div>
              </div>
              <div className="bg-secondary-50 p-4 rounded-lg text-center">
                <ApperIcon name="Bath" size={24} className="text-secondary-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">{property.bathrooms}</div>
                <div className="text-sm text-gray-600">Bathrooms</div>
              </div>
              <div className="bg-accent-50 p-4 rounded-lg text-center">
                <ApperIcon name="Maximize" size={24} className="text-accent-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">{property.squareFeet.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Sq Ft</div>
              </div>
              <div className="bg-info/10 p-4 rounded-lg text-center">
                <ApperIcon name="Home" size={24} className="text-info mx-auto mb-2" />
                <div className="font-semibold text-gray-900">{property.propertyType}</div>
                <div className="text-sm text-gray-600">Type</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700">
                  <ApperIcon name="Check" size={16} className="text-success" />
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface rounded-xl shadow-card p-6 sticky top-24"
          >
            <div className="text-center mb-6">
              <div className="text-3xl font-display font-bold text-gray-900 mb-1">
                {formatPrice(property.price)}
              </div>
              {property.listingType === "For Sale" && (
                <div className="text-sm text-gray-600">
                  ${Math.round(property.price / property.squareFeet)} per sq ft
                </div>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <Button
                onClick={handleContact}
                className="w-full"
                size="lg"
              >
                <ApperIcon name="Phone" size={20} className="mr-2" />
                Contact Agent
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                size="lg"
              >
                <ApperIcon name="Calendar" size={20} className="mr-2" />
                Schedule Tour
              </Button>

              <Button
                variant="secondary"
                className="w-full"
                size="lg"
              >
                <ApperIcon name="Share" size={20} className="mr-2" />
                Share Property
              </Button>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Property Type:</span>
                <span className="font-medium">{property.propertyType}</span>
              </div>
              <div className="flex justify-between">
                <span>Year Built:</span>
                <span className="font-medium">{property.yearBuilt}</span>
              </div>
              <div className="flex justify-between">
                <span>Listing Type:</span>
                <span className="font-medium">{property.listingType}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
{/* View All Photos Button */}
      {property.images.length > 3 && (
        <div className="mt-6">
          <Button
            onClick={() => openLightbox(0)}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <ApperIcon name="Image" size={18} className="mr-2" />
            View All {property.images.length} Photos
          </Button>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        images={property.images}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        initialIndex={lightboxIndex}
      />
    </div>
  );
};

export default PropertyDetail;