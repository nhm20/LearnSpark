import React from "react";
import { FiCalendar, FiClock, FiDollarSign, FiUserCheck } from "react-icons/fi";
import PropTypes from "prop-types";

const SkeletonLoader = ({ className }) => (
  <div className={`bg-white/30 rounded animate-pulse ${className}`} />
);

const StatCard = ({ title, value, icon, color, isLoading }) => (
  <div
    className={`${color} p-6 rounded-xl shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl`}
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-200 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-2 text-white">
          {isLoading ? <SkeletonLoader className="h-8 w-16" /> : value}
        </h3>
      </div>
      <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
        {React.cloneElement(icon, { className: "text-xl text-white" })}
      </div>
    </div>
  </div>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

const TutorStats = ({ stats, isLoading }) => {
  const statCards = [
    {
      title: "Upcoming Sessions",
      value: stats?.upcomingSessions ?? 0,
      icon: <FiCalendar />,
      color: "bg-indigo-600 hover:bg-indigo-700",
    },
    {
      title: "Total Earnings",
      value: stats?.earnings ? `$${stats.earnings.toLocaleString()}` : "$0",
      icon: <FiDollarSign />,
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Active Students",
      value: stats?.students ?? 0,
      icon: <FiUserCheck />,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Hours Taught",
      value: stats?.hoursTaught ?? 0,
      icon: <FiClock />,
      color: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {statCards.map((card, index) => (
        <StatCard
          key={`stat-card-${index}`}
          title={card.title}
          value={card.value}
          icon={card.icon}
          color={card.color}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

TutorStats.propTypes = {
  stats: PropTypes.shape({
    upcomingSessions: PropTypes.number,
    earnings: PropTypes.number,
    students: PropTypes.number,
    hoursTaught: PropTypes.number,
  }),
  isLoading: PropTypes.bool,
};

TutorStats.defaultProps = {
  stats: {},
  isLoading: false,
};

export default TutorStats;
