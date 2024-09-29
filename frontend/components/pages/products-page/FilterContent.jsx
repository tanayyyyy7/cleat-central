import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

/* 
Surface Types: 
  MG: Multi Ground 
  FG: Firm Ground
  MG: Medium Ground
  TF: Turf
  SG: Soft Ground
  IC: Indoor Court
*/

const FilterContent = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    brands: [],
    surfaceTypes: [],
    shoeHeights: [],
  });

  const handleFilterChange = (category, item) => {
    setFilters(prevFilters => {
      const updatedCategory = prevFilters[category].includes(item)
        ? prevFilters[category].filter(i => i !== item)
        : [...prevFilters[category], item];

      const updatedFilters = { ...prevFilters, [category]: updatedCategory };
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  const renderCheckboxGroup = (title, items, category) => (
    <div>
      <Label className="block mb-2">{title}</Label>
      <div className="space-y-2">
        {items.map((elem, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`${category}-${index}`}
              checked={filters[category].includes(elem)}
              onCheckedChange={() => handleFilterChange(category, elem)}
            />
            <label htmlFor={`${category}-${index}`} className="text-sm">
              {elem}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
      <div className="space-y-4 p-4">
        {renderCheckboxGroup("Brands", ['Nike', 'Adidas', 'Puma', 'New Balance', 'Umbro'], "brands")}
        {renderCheckboxGroup("Surface Type", ['MG', 'FG', 'TF', 'SG', 'IC'], "surfaceTypes")}
        {renderCheckboxGroup("Shoe Height", ['High-Top', 'Low-Top'], "shoeHeights")}
      </div>
  );
};

export default FilterContent;