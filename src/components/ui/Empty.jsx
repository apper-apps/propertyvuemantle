import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No properties found", 
  message = "Try adjusting your search filters or browse all available properties.",
  action,
  actionText = "Clear Filters"
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="bg-gradient-to-br from-accent-100 to-accent-200 p-8 rounded-full mb-6">
        <ApperIcon name="Home" size={64} className="text-accent-600" />
      </div>
      <h3 className="text-2xl font-display font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {message}
      </p>
      {action && (
        <button
          onClick={action}
          className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
        >
          <ApperIcon name="RotateCcw" size={20} />
          {actionText}
        </button>
      )}
    </div>
  );
};

export default Empty;