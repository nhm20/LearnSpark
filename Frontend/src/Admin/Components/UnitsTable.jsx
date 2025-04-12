import React from "react";
import { Trash2 } from "lucide-react";

const UnitsTable = ({ units, onRowClick, onDelete, onEdit }) => {
  return (
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {units.map((unit, index) => (
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
                  ${unit.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90 group-hover:text-white">
                  {unit.timeLimit} days
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnitsTable;
