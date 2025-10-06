import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import PropertyCard from "@/components/molecules/PropertyCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import propertyService from "@/services/api/propertyService";
import { toast } from "react-toastify";

const AIAdvisorPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [properties, setProperties] = useState([]);
  const [apperClient, setApperClient] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const allProperties = await propertyService.getAll();
        setProperties(allProperties);
      } catch (err) {
        console.error("Failed to load properties:", err);
      }
    };

    loadProperties();
if (!window.ApperSDK) {
      setError('AI Advisor service is unavailable. Please refresh the page or contact support.');
      setLoading(false);
      return;
    }

    try {
      const { ApperClient } = window.ApperSDK;
      const client = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      setApperClient(client);
    } catch (err) {
      setError('Failed to initialize AI Advisor service. Please try again.');
      setLoading(false);
      console.error('ApperClient initialization error:', err);
    }
  }, []);

  const toggleFavorite = async (propertyId) => {
    try {
      await propertyService.toggleFavorite(propertyId);
      const updatedProperties = await propertyService.getAll();
      setProperties(updatedProperties);
      
      if (recommendations) {
        const updatedRecommendedProperties = recommendations.recommendations.map(rec => {
          const property = updatedProperties.find(p => p.Id === rec.propertyId);
          return property ? { ...rec, property } : rec;
        });
        setRecommendations({
          ...recommendations,
          recommendations: updatedRecommendedProperties
        });
      }
    } catch (err) {
      toast.error("Failed to update favorites");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast.error("Please enter your property requirements");
      return;
    }

    if (!apperClient) {
      toast.error("AI service not initialized. Please refresh the page.");
      return;
    }

    setLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const result = await apperClient.functions.invoke(
        import.meta.env.VITE_AI_PROPERTY_ADVISOR,
        {
          body: JSON.stringify({
            query: query,
            properties: properties
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!result.success) {
        console.info(`apper_info: Got an error in this function: ${import.meta.env.VITE_AI_PROPERTY_ADVISOR}. The response body is: ${JSON.stringify(result)}.`);
        setError(result.error || "Failed to get AI recommendations");
        toast.error(result.error || "Failed to get AI recommendations");
        return;
      }

      const recommendedProperties = result.data.recommendations.map(rec => {
        const property = properties.find(p => p.Id === rec.propertyId);
        return {
          ...rec,
          property
        };
      }).filter(rec => rec.property);

      if (recommendedProperties.length === 0) {
        setError("No matching properties found. Try adjusting your requirements.");
        toast.info("No matching properties found for your criteria");
        return;
      }

      setRecommendations({
        recommendations: recommendedProperties,
        summary: result.data.summary
      });

      toast.success(`Found ${recommendedProperties.length} property recommendations`);

    } catch (err) {
      console.info(`apper_info: Got this error in this function: ${import.meta.env.VITE_AI_PROPERTY_ADVISOR}. The error is: ${err.message}`);
      const errorMessage = "Failed to get AI recommendations. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setRecommendations(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ApperIcon name="Sparkles" size={32} className="text-primary-600" />
          <h1 className="text-3xl font-display font-bold text-gray-900">
            AI Property Advisor
          </h1>
        </div>
        <p className="text-gray-600">
          Describe your ideal living space and amenities, and our AI will recommend the best properties for you.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-card p-6 mb-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tell us about your property needs
            </label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Example: I need a spacious home with at least 3 bedrooms, a modern kitchen, and a pool. Preferably in a quiet neighborhood suitable for a family with kids."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 min-h-32 resize-y"
              disabled={loading}
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !query.trim()}
              className="flex items-center gap-2"
            >
              {loading ? (
                <>
                  <ApperIcon name="Loader2" size={18} className="animate-spin" />
                  Analyzing Properties...
                </>
              ) : (
                <>
                  <ApperIcon name="Sparkles" size={18} />
                  Get AI Recommendations
                </>
              )}
            </Button>

            {recommendations && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setRecommendations(null);
                  setQuery("");
                }}
              >
                New Search
              </Button>
            )}
          </div>
        </form>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loading message="Our AI is analyzing the perfect properties for you..." />
        </div>
      )}

      {error && !loading && (
        <Error
          message={error}
          onRetry={handleRetry}
        />
      )}

      {recommendations && !loading && (
        <div className="space-y-8">
          {recommendations.summary && (
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <ApperIcon name="Lightbulb" size={24} className="text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    AI Advisor Summary
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {recommendations.summary}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
              Recommended Properties ({recommendations.recommendations.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.recommendations.map((rec, index) => (
                <div key={rec.propertyId} className="space-y-4">
                  <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-accent-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        Match #{index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <span className="font-medium">Why this property:</span> {rec.reasoning}
                    </p>
                  </div>

                  {rec.property && (
                    <PropertyCard
                      property={rec.property}
                      onToggleFavorite={toggleFavorite}
                      onClick={() => navigate(`/property/${rec.property.Id}`)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAdvisorPage;