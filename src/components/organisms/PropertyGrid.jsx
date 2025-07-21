import React from "react";
import PropertyCard from "@/components/molecules/PropertyCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { motion } from "framer-motion";

const PropertyGrid = ({ 
  properties, 
  loading, 
  error, 
  onToggleFavorite, 
  onRetry,
  onClearFilters
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!properties || properties.length === 0) {
    return (
      <Empty 
        title="No properties found"
        message="We couldn't find any properties matching your criteria. Try adjusting your filters or search terms."
        action={onClearFilters}
        actionText="Clear Filters"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {properties.map((property, index) => (
        <motion.div
          key={property.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <PropertyCard 
            property={property} 
            onToggleFavorite={onToggleFavorite}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default PropertyGrid;