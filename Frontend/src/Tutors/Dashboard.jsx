import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileWarning from "./Components/ProfileWarning";
import axios from "axios";
import { updateOnline } from "../Store/store";
import { FiCalendar, FiClock, FiDollarSign, FiUserCheck } from "react-icons/fi";

const Dashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isAvailable, setIsAvailable] = useState(user?.online || false);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsAvailable(user?.online || false);
    // Simulate loading stats data
    const timer = setTimeout(() => {
      setStats({
        upcomingSessions: 5,
        earnings: 1250,
        students: 24,
        hoursTaught: 86,
      });
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [user]);

  const handleToggle = async () => {
    const newStatus = !isAvailable;
    setIsAvailable(newStatus);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/tutors/online-status/${
          user._id
        }`,
        { isOnline: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        dispatch(updateOnline(newStatus));
        console.log("Online status updated successfully:", response.data);
      }
    } catch (err) {
      console.error("Failed to update online status:", err);
    }
  };

  const statCards = [
    {
      title: "Upcoming Sessions",
      value: stats?.upcomingSessions,
      icon: <FiCalendar className="text-xl" />,
      color: "bg-indigo-600",
    },
    {
      title: "Total Earnings",
      value: stats?.earnings ? `$${stats.earnings}` : "",
      icon: <FiDollarSign className="text-xl" />,
      color: "bg-green-600",
    },
    {
      title: "Active Students",
      value: stats?.students,
      icon: <FiUserCheck className="text-xl" />,
      color: "bg-blue-600",
    },
    {
      title: "Hours Taught",
      value: stats?.hoursTaught,
      icon: <FiClock className="text-xl" />,
      color: "bg-purple-600",
    },
  ];

  return (
    <main className="min-h-screen w-full text-white p-4 sm:p-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Welcome Back, {user?.name || "Tutor"}!
              </h1>
              <p className="mt-2 text-gray-300 max-w-lg">
                {isAvailable
                  ? "You're currently available for new sessions"
                  : "You're currently offline"}
              </p>
              <div className="mt-3">
                <ProfileWarning />
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg shadow-lg transition-all hover:scale-[1.02]">
              <label
                htmlFor="availability"
                className="text-gray-300 font-medium"
              >
                Availability:
              </label>
              <div
                onClick={handleToggle}
                className={`relative inline-block w-14 h-7 cursor-pointer rounded-full transition-all duration-300 ${
                  isAvailable ? "bg-green-500" : "bg-gray-600"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                    isAvailable
                      ? "transform translate-x-6"
                      : "transform translate-x-0"
                  }`}
                />
              </div>
              <div className="font-medium">
                {isAvailable ? "Online" : "Offline"}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((card, index) => (
            <div
              key={index}
              className={`${card.color} p-6 rounded-xl shadow-lg transition-transform hover:-translate-y-1`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-200 text-sm">{card.title}</p>
                  <h3 className="text-2xl font-bold mt-2">
                    {isLoading ? (
                      <div className="h-8 w-16 bg-white/30 rounded animate-pulse"></div>
                    ) : (
                      card.value
                    )}
                  </h3>
                </div>
                <div className="p-2 rounded-full bg-white/20">{card.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FiClock /> Recent Activity
          </h2>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="p-4 bg-gray-700/50 rounded-lg border-l-4 border-green-500 transition-all hover:translate-x-1"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">New session booked</h4>
                    <p className="text-sm text-gray-300">
                      Mathematics with student John Doe
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">2 hours ago</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
