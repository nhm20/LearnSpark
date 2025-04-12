import React, { useState } from "react";
import { Search, ChevronUp, ChevronDown, Plus } from "lucide-react";

const FilterBar = ({ onSearch, onSortChange, sortConfig, onAddNew }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeButton, setActiveButton] = useState(null);

  const filters = [
    { label: "Name", key: "name" },
    { label: "Subject", key: "subject" },
    { label: "Level", key: "classLevel" },
    { label: "Duration", key: "timeLimit" },
    { label: "Price", key: "price" },
  ];

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleSortChange = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key) {
      direction =
        sortConfig.direction === "ascending" ? "descending" : "ascending";
    }
    setActiveButton(key);
    setTimeout(() => setActiveButton(null), 300);
    onSortChange({ key, direction });
  };

  const getSortIcon = (filterKey) => {
    if (sortConfig.key !== filterKey)
      return <ChevronDown className="w-4 h-4 text-white opacity-70" />;

    switch (sortConfig.direction) {
      case "ascending":
        return <ChevronUp className="w-4 h-4 text-white animate-bounce" />;
      case "descending":
        return <ChevronDown className="w-4 h-4 text-white animate-bounce" />;
      default:
        return <ChevronDown className="w-4 h-4 text-white opacity-70" />;
    }
  };
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xlshadow-sm mb-1">
      {/* Sort Buttons */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        {filters.map(({ label, key }) => (
          <button
            key={key}
            onClick={() => handleSortChange(key)}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm rounded-full ${
              sortConfig.key === key
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white/5 text-blue-100 border border-white/10 hover:bg-white/10"
            } hover:bg-blue-600/80 transition-all duration-300 ease-out ${
              activeButton === key ? "scale-95" : ""
            }`}
            aria-label={`Sort by ${label}`}
          >
            {label}
            {getSortIcon(key)}
          </button>
        ))}
      </div>

      {/* Search Input and Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-4 top-1/2 h-4 w-4 text-blue-300 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search units..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full min-w-[220px] pl-11 pr-5 py-2.5 text-sm rounded-full border border-white/10 bg-white/5 text-blue-100 placeholder-blue-300/70 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300"
          />
        </div>
        <button
          onClick={onAddNew}
          className="flex items-center justify-center px-5 py-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 gap-2"
          aria-label="Add new unit"
        >
          <Plus className="h-5 w-5" />
          Add New
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
