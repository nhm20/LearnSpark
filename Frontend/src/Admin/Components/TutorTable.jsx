import React from "react";
import { Trash2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const TutorsTable = ({
  users,
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
                  Name
                </th>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider">
                  Email
                </th>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-400">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`transition-all duration-200 ${
                      index % 2 === 0 ? "bg-black" : "bg-[#0C014D]/10"
                    } hover:bg-[#0C014D]/50 relative group`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white group-hover:text-white/100">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90 group-hover:text-white">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90 group-hover:text-white">
                      {user.role}
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

export default TutorsTable;
