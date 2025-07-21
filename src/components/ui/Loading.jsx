import React from "react";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {[...Array(9)].map((_, index) => (
        <div key={index} className="bg-surface rounded-lg shadow-card overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="h-6 bg-gray-200 rounded w-24"></div>
              <div className="h-5 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="space-y-2 mb-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;