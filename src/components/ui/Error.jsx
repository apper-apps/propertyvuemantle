import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="bg-gradient-to-br from-error/10 to-error/20 p-6 rounded-full mb-6">
        <ApperIcon name="AlertCircle" size={48} className="text-error" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-gray-600 mb-6 max-w-md">
        {message}. Please try again or contact support if the problem persists.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
        >
          <ApperIcon name="RefreshCw" size={20} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;