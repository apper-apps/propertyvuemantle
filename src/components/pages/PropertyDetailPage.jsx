import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropertyDetail from "@/components/organisms/PropertyDetail";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import usePropertyData from "@/hooks/usePropertyData";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { toggleFavorite, getProperty } = usePropertyData();

  const loadProperty = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const propertyData = await getProperty(id);
      if (propertyData) {
        setProperty(propertyData);
      } else {
        setError("Property not found");
      }
    } catch (err) {
      setError("Failed to load property details");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (propertyId) => {
    await toggleFavorite(propertyId);
    // Refresh property data to get updated favorite status
    const updatedProperty = await getProperty(id);
    setProperty(updatedProperty);
  };

  useEffect(() => {
    loadProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="mb-4"
          >
            <ApperIcon name="ArrowLeft" size={18} className="mr-2" />
            Back to Properties
          </Button>
        </div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="mb-4"
          >
            <ApperIcon name="ArrowLeft" size={18} className="mr-2" />
            Back to Properties
          </Button>
        </div>
        <Error message={error} onRetry={loadProperty} />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="mb-4"
          >
            <ApperIcon name="ArrowLeft" size={18} className="mr-2" />
            Back to Properties
          </Button>
        </div>
        <Error message="Property not found" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-4 hover:bg-primary-50"
        >
          <ApperIcon name="ArrowLeft" size={18} className="mr-2" />
          Back to Properties
        </Button>
      </div>
      
      <PropertyDetail 
        property={property} 
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default PropertyDetailPage;