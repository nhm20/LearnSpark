import React from "react";
import { Loader2 } from "lucide-react";

const HistoryTable = ({ records = [], loading }) => {
  return (
    <div className="space-y-4">
      <div className="bg-black rounded-2xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#0C014D]">
              <tr>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider rounded-tl-2xl">
                  Unit Name
                </th>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider">
                  Student
                </th>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider">
                  Date
                </th>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider rounded-tr-2xl">
                  Zoom Link
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && records.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-400">
                    No teaching history available.
                  </td>
                </tr>
              ) : (
                records.map((record, index) => (
                  <tr
                    key={record._id}
                    className={`transition-all duration-200 ${
                      index % 2 === 0 ? "bg-black" : "bg-[#0C014D]/10"
                    } hover:bg-[#0C014D]/50 group`}
                  >
                    <td className="px-6 py-4 text-sm text-white/90">
                      {record.unitId?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-white/90">
                      {record.unitId?.subject || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-white/90">
                      {record.userId?.name || "N/A"}
                      <div className="text-xs text-gray-400">
                        {record.userId?.email || ""}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/90">
                      ₹{record.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-white/90">
                      {record.paymentStatus}
                    </td>
                    <td className="px-6 py-4 text-sm text-white/90">
                      {new Date(record.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-400 underline break-all">
                      {record.zoomLink ? (
                        <a
                          href={record.zoomLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Join
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;
