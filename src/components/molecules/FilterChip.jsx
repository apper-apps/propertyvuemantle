import React from "react";
import ApperIcon from "@/components/ApperIcon";

const FilterChip = ({ label, onRemove, variant = "default" }) => {
  const variants = {
    default: "bg-primary-100 text-primary-800 border-primary-200",
    accent: "bg-accent-100 text-accent-800 border-accent-200",
    secondary: "bg-secondary-100 text-secondary-800 border-secondary-200"
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${variants[variant]} transition-all hover:opacity-80`}>
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
      >
        <ApperIcon name="X" size={12} />
      </button>
    </div>
  );
};

export default FilterChip;