import { useState, useEffect, useCallback } from "react";
import propertyService from "@/services/api/propertyService";
import { toast } from "react-toastify";

const usePropertyData = (initialFilters = {}) => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [favorites, setFavorites] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const loadProperties = useCallback(async (searchQuery = "") => {
    setLoading(true);
    setError(null);
    
    try {
      let result;
      if (searchQuery) {
        result = await propertyService.search(searchQuery);
      } else {
        result = await propertyService.getAll(filters);
      }
      
      setProperties(result);
      setFilteredProperties(result);
    } catch (err) {
      const errorMessage = "Failed to load properties. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await propertyService.getFavorites();
      setFavorites(result);
    } catch (err) {
      const errorMessage = "Failed to load favorite properties.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadPropertyTypes = useCallback(async () => {
    try {
      const types = propertyService.getPropertyTypes();
      setPropertyTypes(types);
    } catch (err) {
      console.error("Failed to load property types:", err);
    }
  }, []);

  const loadAmenities = useCallback(async () => {
    try {
      const amenitiesList = propertyService.getAllAmenities();
      setAmenities(amenitiesList);
    } catch (err) {
      console.error("Failed to load amenities:", err);
    }
  }, []);

  const toggleFavorite = useCallback(async (propertyId) => {
    try {
      const updatedProperty = await propertyService.toggleFavorite(propertyId);
      
      // Update properties list
      setProperties(prev => 
        prev.map(prop => 
          prop.Id === propertyId 
            ? { ...prop, isFavorite: updatedProperty.isFavorite }
            : prop
        )
      );
      
      // Update filtered properties
      setFilteredProperties(prev => 
        prev.map(prop => 
          prop.Id === propertyId 
            ? { ...prop, isFavorite: updatedProperty.isFavorite }
            : prop
        )
      );

      // Update favorites list if we're on favorites page
      if (favorites.length > 0) {
        if (updatedProperty.isFavorite) {
          setFavorites(prev => [...prev, updatedProperty]);
        } else {
          setFavorites(prev => prev.filter(prop => prop.Id !== propertyId));
        }
      }

      toast.success(
        updatedProperty.isFavorite 
          ? "Property added to favorites" 
          : "Property removed from favorites"
      );
    } catch (err) {
      toast.error("Failed to update favorites");
    }
  }, [favorites]);

  const applyFilters = useCallback(async (newFilters) => {
    setFilters(newFilters);
    setLoading(true);
    setError(null);
    
    try {
      const result = await propertyService.getAll(newFilters);
      setProperties(result);
      setFilteredProperties(result);
    } catch (err) {
      const errorMessage = "Failed to apply filters. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    loadProperties();
  }, [loadProperties]);

  const searchProperties = useCallback(async (query) => {
    if (!query.trim()) {
      loadProperties();
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await propertyService.search(query);
      setProperties(result);
      setFilteredProperties(result);
    } catch (err) {
      const errorMessage = "Search failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loadProperties]);

  const getProperty = useCallback(async (id) => {
    try {
      return await propertyService.getById(id);
    } catch (err) {
      throw new Error("Failed to load property details");
    }
  }, []);

  const retryLoad = useCallback(() => {
    loadProperties();
  }, [loadProperties]);

  // Initialize data
  useEffect(() => {
    loadProperties();
    loadPropertyTypes();
    loadAmenities();
  }, [loadProperties, loadPropertyTypes, loadAmenities]);

  return {
    properties: filteredProperties,
    favorites,
    loading,
    error,
    filters,
    propertyTypes,
    amenities,
    toggleFavorite,
    applyFilters,
    clearFilters,
    searchProperties,
    loadProperties,
    loadFavorites,
    getProperty,
    retryLoad
  };
};

export default usePropertyData;