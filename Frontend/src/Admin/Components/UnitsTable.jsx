import React from "react";
import { Trash2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const UnitsTable = ({
  units,
  onRowClick,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  loading,
}) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
      const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-full text-sm ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:bg-[#0C014D] hover:text-white"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="space-y-4">
      <div className="bg-black rounded-2xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#0C014D]">
              <tr>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider rounded-tl-2xl">
                  Image
                </th>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider">
                  Name
                </th>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider">
                  Level
                </th>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider">
                  Price
                </th>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider rounded-tr-2xl">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && units.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
                  </td>
                </tr>
              ) : units.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-400">
                    No units found
                  </td>
                </tr>
              ) : (
                units.map((unit, index) => (
                  <tr
                    key={unit._id}
                    onClick={() => onRowClick(unit)}
                    className={`
                      transition-all duration-200
                      ${index % 2 === 0 ? "bg-black" : "bg-[#0C014D]/10"}
                      hover:bg-[#0C014D]/50
                      cursor-pointer
                      group
                      relative
                      after:absolute
                      after:inset-x-4
                      after:bottom-0
                      after:h-px
                      after:bg-[#0C014D]/30
                      hover:after:opacity-0
                      first:after:hidden
                    `}
                  >
                    <td className="px-6 py-4 whitespace-nowrap group-hover:rounded-l-2xl">
                      <div className="flex items-center">
                        {unit.image ? (
                          <img
                            src={unit.image}
                            alt={unit.name}
                            className="h-12 w-12 rounded-full object-cover shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-[#0C014D]/50 flex items-center justify-center shadow-md group-hover:bg-[#0C014D]/70 transition-all">
                            <div className="text-xs text-white/70 group-hover:text-white">
                              No image
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white group-hover:text-white/100">
                      {unit.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90 group-hover:text-white">
                      {unit.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90 group-hover:text-white">
                      {unit.classLevel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white group-hover:text-white/100">
                      ₹  {unit.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90 group-hover:text-white">
                      {unit.timeLimit} Min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap group-hover:rounded-r-lg">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(unit._id);
                          }}
                          className="p-2 rounded-lg hover:bg-[#0C014D] transition-all"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-red-400 group-hover:text-red-300" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalItems > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-black rounded-b-2xl gap-4">
          <div className="text-sm text-gray-400">
            Showing {startItem} to {endItem} of {totalItems} entries
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${
                currentPage === 1
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-white hover:bg-[#0C014D]"
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {renderPageNumbers()}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${
                currentPage === totalPages
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-white hover:bg-[#0C014D]"
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitsTable;
