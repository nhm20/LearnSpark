import React from "react";
import {
  Loader2,
  ExternalLink,
  Calendar,
  IndianRupee,
  Book,
} from "lucide-react";

const OrdersTable = ({ orders, loading, error }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      completed: "bg-green-500/20 text-green-400",
      pending: "bg-yellow-500/20 text-yellow-400",
      failed: "bg-red-500/20 text-red-400",
    };
    return (
      <div
        className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
          statusMap[status] || "bg-gray-500/20 text-gray-400"
        }`}
      >
        {status}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-white mb-2 sm:mb-0">
          Your Courses
        </h2>
        <div className="text-sm text-gray-400">
          {orders.length} {orders.length === 1 ? "item" : "items"}
        </div>
      </div>

      <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-[#0C014D]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white/80 uppercase tracking-wider rounded-tl-2xl">
                  Course
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                  Tutor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white/80 uppercase tracking-wider rounded-tr-2xl">
                  Meeting
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
                      <div className="text-gray-400">
                        Loading your orders...
                      </div>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-red-400 mb-2">{error.message}</div>
                      <div className="text-gray-400">Failed to load orders</div>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-gray-400">No orders found</div>
                      <div className="text-gray-500 text-sm mt-1">
                        Your purchased courses will appear here
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-[#0C014D]/20 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden bg-gray-800">
                          {order.unit?.image ? (
                            <img
                              className="h-full w-full object-cover"
                              src={order.unit.image}
                              alt={order.unit.title || "Course image"}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/40";
                              }}
                            />
                          ) : (
                            <div className="h-full w-full bg-gray-700 flex items-center justify-center">
                              <Book className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {order.unit?.title ||
                              order.unit?.courseTitle ||
                              "Course"}
                          </div>
                          <div className="text-xs text-gray-400">
                            {[order.unit?.subject, order.unit?.classLevel]
                              .filter(Boolean)
                              .join(" • ")}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">
                        {order.tutor?.name || "N/A"}
                      </div>
                      {order.tutor?.specialization && (
                        <div className="text-xs text-gray-400">
                          {order.tutor.specialization}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-white">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        {order.amount || "0"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(order.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.paymentStatus?.toLowerCase())}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">
                      {order.meetingLink ? (
                        <a
                          href={order.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center hover:text-blue-300 transition-colors"
                        >
                          Join <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      ) : (
                        <div className="text-gray-500">Not scheduled</div>
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

export default OrdersTable;
