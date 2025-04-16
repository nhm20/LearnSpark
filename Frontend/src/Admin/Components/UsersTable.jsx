import React from "react";
import { Loader2 } from "lucide-react";

const UsersTable = ({ users, loading }) => {
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
                <th className="px-6 py-5 text-left text-sm font-medium text-white tracking-wider rounded-tr-2xl">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-8 text-center text-gray-400">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`transition-all duration-200 ${
                      index % 2 === 0 ? "bg-black" : "bg-[#0C014D]/10"
                    } hover:bg-[#0C014D]/50 group`}
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
    </div>
  );
};

export default UsersTable;
