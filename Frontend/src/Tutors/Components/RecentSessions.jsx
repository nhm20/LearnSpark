import React from "react";
import { FiClock, FiZoomIn, FiAlertCircle, FiUser } from "react-icons/fi";
import PropTypes from "prop-types";

const SkeletonLoader = ({ className }) => (
  <div className={`bg-blue-900/10 rounded-lg animate-pulse ${className}`} />
);

const SessionCard = ({ order }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <article className="p-4 bg-black rounded-lg border-l-4 border-teal-400 hover:border-amber-300 transition-all hover:translate-x-1 hover:shadow-lg group backdrop-blur-sm">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white truncate">
            {order.unitId?.name || "Tutoring Session"}
          </h3>
          <div className="flex items-center text-sm text-cyan-200 mt-1">
            <FiUser className="mr-2 opacity-80" />
            <p className="truncate">
              {order.userId?.name || "Student"}
            </p>
          </div>
          {order.zoomLink && (
            <a
              href={order.zoomLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-3 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 rounded-md text-xs transition-colors border border-amber-500/30"
            >
              <FiZoomIn className="mr-2" />
              Join Zoom Session
            </a>
          )}
        </div>
        <time className="flex items-center text-xs text-purple-100/80 whitespace-nowrap pl-2">
          <FiClock className="mr-2 opacity-70" />
          {formatDate(order.createdAt)}
        </time>
      </div>
    </article>
  );
};

const RecentSessions = ({ recentOrders = [], ordersLoading = false }) => {
  return (
    <section className="bg-gradient-to-b from-transparent via-[#0C014D] via-40% to-black rounded-xl p-6 shadow-xl ">
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-3">
          <FiClock className="text-teal-300" />
          Recent Sessions
        </h2>
        {!ordersLoading && recentOrders.length > 0 && (
          <div className="text-xs bg-blue-800/40 text-cyan-200 px-3 py-1 rounded-full">
            {recentOrders.length} session{recentOrders.length !== 1 ? "s" : ""}
          </div>
        )}
      </header>

      <div className="space-y-3">
        {ordersLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="p-4 rounded-lg">
              <SkeletonLoader className="h-16 w-full" />
            </div>
          ))
        ) : recentOrders.length > 0 ? (
          recentOrders.map((order) => (
            <SessionCard key={`session-${order._id}`} order={order} />
          ))
        ) : (
          <div className="p-6 text-center flex flex-col items-center justify-center bg-blue-900/20 rounded-lg border border-blue-800/30">
            <FiAlertCircle className="text-3xl text-amber-400/70 mb-3" />
            <p className="text-cyan-200 font-medium">No recent sessions</p>
            <p className="text-purple-100/60 text-sm mt-1">
              Your upcoming sessions will appear here
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

RecentSessions.propTypes = {
  recentOrders: PropTypes.array,
  ordersLoading: PropTypes.bool,
};

export default RecentSessions;