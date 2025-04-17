import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ProfileWarning from "./Components/ProfileWarning";
import TutorStats from "./Components/TutorStats";
import RecentSessions from "./Components/RecentSessions";
import { updateOnline } from "../Store/store";
import { Download } from "lucide-react";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isAvailable, setIsAvailable] = useState(user?.online || false);
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    setIsAvailable(user?.online || false);

    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/tutors/stats/${user._id}`
        );
        setStats(res.data);
      } catch (err) {
        setStats({
          upcomingSessions: 0,
          earnings: 0,
          students: 0,
          hoursTaught: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRecentOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/tutors/tutor/${
            user._id
          }/latest-zoom`
        );
        setRecentOrders(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        setRecentOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };

    if (user?._id) {
      fetchStats();
      fetchRecentOrders();
      const intervalId = setInterval(fetchRecentOrders, 60000); // Fetch orders every 60,000ms (1 minute)

      return () => clearInterval(intervalId); // Clean up interval on unmount
    }
  }, [user]);

  const handleToggle = async () => {
    const newStatus = !isAvailable;
    setIsAvailable(newStatus);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/tutors/online-status/${
          user._id
        }`,
        { isOnline: newStatus },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.success) dispatch(updateOnline(newStatus));
    } catch {
      setIsAvailable(!newStatus);
    }
  };

  return (
    <main className="min-h-screen w-full text-white p-4 mt-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Welcome Back, {user?.name || "Tutor"}!
              </h1>
              <p className="text-sm text-white mt-2">
                {isAvailable
                  ? "You're currently available for new sessions"
                  : "You're currently offline"}{" "}
                • Updated just now
              </p>
              <div className="mt-3">
                <ProfileWarning />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-blue-800 hover:bg-blue-700 rounded-lg text-sm font-medium flex items-center transition-colors hover:shadow-md">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </button>
              <div className="flex items-center gap-3 bg-blue-800 hover:bg-blue-700 p-3 rounded-lg shadow-lg transition-colors">
                <label className="text-gray-300 font-medium">
                  Availability:
                </label>
                <div
                  onClick={handleToggle}
                  className={`relative inline-block w-14 h-7 cursor-pointer rounded-full transition-all duration-300 ${
                    isAvailable ? "bg-green-700" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                      isAvailable ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </div>
                <div className="font-medium">
                  {isAvailable ? "Online" : "Offline"}
                </div>
              </div>
            </div>
          </div>
        </header>

        <TutorStats stats={stats} isLoading={isLoading} />
        <RecentSessions
          recentOrders={recentOrders}
          ordersLoading={ordersLoading}
        />
      </div>
    </main>
  );
};

export default Dashboard;
