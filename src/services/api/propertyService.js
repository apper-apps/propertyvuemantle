import propertiesData from "@/services/mockData/properties.json";

class PropertyService {
  constructor() {
    this.properties = [...propertiesData];
    this.favorites = JSON.parse(localStorage.getItem("propertyFavorites")) || [];
    this.updateFavoritesInData();
  }

  updateFavoritesInData() {
    this.properties = this.properties.map(property => ({
      ...property,
      isFavorite: this.favorites.includes(property.Id)
    }));
  }

  saveFavoritesToStorage() {
    localStorage.setItem("propertyFavorites", JSON.stringify(this.favorites));
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll(filters = {}) {
    await this.delay();
    let filteredProperties = [...this.properties];

    // Apply filters
    if (filters.location) {
      const searchTerm = filters.location.toLowerCase();
      filteredProperties = filteredProperties.filter(property =>
        property.city.toLowerCase().includes(searchTerm) ||
        property.state.toLowerCase().includes(searchTerm) ||
        property.address.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.minPrice) {
      filteredProperties = filteredProperties.filter(property => 
        property.price >= filters.minPrice
      );
    }

    if (filters.maxPrice) {
      filteredProperties = filteredProperties.filter(property => 
        property.price <= filters.maxPrice
      );
    }

    if (filters.minBeds) {
      filteredProperties = filteredProperties.filter(property => 
        property.bedrooms >= filters.minBeds
      );
    }

    if (filters.maxBeds) {
      filteredProperties = filteredProperties.filter(property => 
        property.bedrooms <= filters.maxBeds
      );
    }

    if (filters.propertyType && filters.propertyType.length > 0) {
      filteredProperties = filteredProperties.filter(property => 
        filters.propertyType.includes(property.propertyType)
      );
    }

    if (filters.amenities && filters.amenities.length > 0) {
      filteredProperties = filteredProperties.filter(property => 
        filters.amenities.some(amenity => property.amenities.includes(amenity))
      );
    }

    return [...filteredProperties];
  }

  async getById(id) {
    await this.delay();
    const property = this.properties.find(p => p.Id === parseInt(id));
    return property ? { ...property } : null;
  }

  async getFavorites() {
    await this.delay();
    return this.properties.filter(property => property.isFavorite);
  }

  async toggleFavorite(propertyId) {
    await this.delay(100);
    const id = parseInt(propertyId);
    const index = this.favorites.indexOf(id);
    
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(id);
    }

    this.updateFavoritesInData();
    this.saveFavoritesToStorage();
    
    return this.properties.find(p => p.Id === id);
  }

  async search(query) {
    await this.delay();
    const searchTerm = query.toLowerCase();
    return this.properties.filter(property =>
      property.title.toLowerCase().includes(searchTerm) ||
      property.city.toLowerCase().includes(searchTerm) ||
      property.state.toLowerCase().includes(searchTerm) ||
      property.address.toLowerCase().includes(searchTerm) ||
      property.description.toLowerCase().includes(searchTerm)
    );
  }

  getPropertyTypes() {
    return [...new Set(this.properties.map(p => p.propertyType))];
  }

  getAllAmenities() {
    const allAmenities = this.properties.flatMap(p => p.amenities);
    return [...new Set(allAmenities)].sort();
  }

  getPriceRange() {
    const prices = this.properties.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }
}

export default new PropertyService();