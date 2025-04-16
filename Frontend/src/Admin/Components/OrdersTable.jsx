import React from "react";
import { Loader2 } from "lucide-react";

const OrdersTable = ({ orders, loading }) => {
  return (
    <div className="space-y-4">
      <div className="bg-black rounded-2xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#0C014D]">
              <tr>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider rounded-tl-2xl">
                  UnitId
                </th>
               
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider rounded-tr-2xl">
                  Meeting Link
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-400">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className={`transition-all duration-200 ${
                      index % 2 === 0 ? "bg-black" : "bg-[#0C014D]/10"
                    } hover:bg-[#0C014D]/50 group`}
                  >
                    <td className="px-6 py-4 text-sm text-white/90">
                      {order.unitId}
                    </td>
                    <td className="px-6 py-4 text-sm text-white/90">
                      ₹{order.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-white/90">
                      {order.paymentStatus}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-400 underline break-all">
                      {order.meetingLink ? (
                        <a
                          href={order.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Link
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

export default OrdersTable;
