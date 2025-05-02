import React from "react";
import { useSelector } from "react-redux";
import { FaUser, FaEnvelope, FaUserTie, FaCalendarAlt } from "react-icons/fa";
import Header from "../Components/Header";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0C014D] to-black text-white">
      <Header />

      <main className="container mx-auto px-4 py-12 flex items-center justify-center">
        {!isAuthenticated || !user ? (
          <div className="text-center max-w-md bg-black p-8 rounded-xl border border-gray-800/50">
            <h2 className="text-2xl font-bold text-gray-300 mb-4">
              Access Required
            </h2>
            <p className="text-lg text-gray-400">
              Please log in to view your profile information and account
              details.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-black rounded-2xl shadow-xl overflow-hidden border border-gray-700 backdrop-blur-sm">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-purple-900/70 to-blue-900/70 p-8 text-center border-b border-gray-700">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-4xl font-bold mb-4 shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h1 className="text-3xl font-medium text-white">{user.name}</h1>
              <p className="text-gray-300 mt-2">{user.email}</p>
            </div>

            {/* Profile Details */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                <div className="p-3 rounded-full bg-purple-900/30 text-purple-300">
                  <FaUser className="text-lg" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">
                    Full Name
                  </h3>
                  <p className="text-white">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                <div className="p-3 rounded-full bg-blue-900/30 text-blue-300">
                  <FaEnvelope className="text-lg" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">
                    Email Address
                  </h3>
                  <p className="text-white">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                <div className="p-3 rounded-full bg-amber-900/30 text-amber-300">
                  <FaUserTie className="text-lg" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">
                    Account Role
                  </h3>
                  <p className="text-white capitalize">
                    {user.role.toLowerCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
