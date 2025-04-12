import React, { useEffect, useState, useRef } from "react";
import {
  Activity,
  BarChart2,
  TrendingUp,
  PieChart,
  ChevronRight,
  Download,
  ArrowUp,
  ArrowDown,
  Clock,
  Percent,
  Users,
} from "lucide-react";

// Animated number component
const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateNumber();
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const animateNumber = () => {
    const isPercentage = value.includes("%");
    const isTimeValue = value.includes("m") && value.includes("s");

    let numericValue;
    if (isPercentage) {
      numericValue = parseFloat(value.replace("%", ""));
    } else if (isTimeValue) {
      // Handle time values like "4m 32s"
      const [minutes, seconds] = value
        .split(" ")
        .map((part) => parseFloat(part.replace(/[^\d.]/g, "")));
      numericValue = minutes * 60 + seconds;
    } else {
      // Handle comma-separated numbers like "1,248"
      numericValue = parseFloat(value.replace(/,/g, ""));
    }

    const duration = 1500; // Animation duration in ms
    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutQuad(progress);

      let currentDisplayValue;
      if (isTimeValue) {
        // For time values, animate the total seconds then convert back to minutes:seconds
        currentDisplayValue =
          startValue + (numericValue - startValue) * easedProgress;
        const minutes = Math.floor(currentDisplayValue / 60);
        const seconds = Math.floor(currentDisplayValue % 60);
        setDisplayValue(`${minutes}m ${seconds}s`);
      } else if (isPercentage) {
        currentDisplayValue =
          startValue + (numericValue - startValue) * easedProgress;
        setDisplayValue(`${Math.round(currentDisplayValue)}%`);
      } else {
        currentDisplayValue =
          startValue + (numericValue - startValue) * easedProgress;
        setDisplayValue(Math.round(currentDisplayValue).toLocaleString());
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const easeOutQuad = (t) => {
    return t * (2 - t);
  };

  return <div ref={ref}>{displayValue}</div>;
};

const stats = [
  {
    title: "Platform Visits",
    value: "12k",
    change: "+23%",
    trend: "up",
    icon: <Activity className="w-5 h-5 text-emerald-400" />,
    chart: (
      <div className="flex items-end h-12 mt-2 space-x-1">
        {[4, 6, 10, 8, 5].map((height, i) => (
          <div
            key={i}
            className={`w-3 rounded-t-sm transition-all duration-300 ${
              i === 2 ? "bg-emerald-400" : "bg-gray-600/50"
            }`}
            style={{ height: `${height * 4}px` }}
          ></div>
        ))}
      </div>
    ),
    breakdown: [
      { label: "Social Media", value: "78%", color: "bg-emerald-400" },
      { label: "Search Engines", value: "22%", color: "bg-gray-600" },
    ],
  },
  {
    title: "Course Bounce Rate",
    value: "7%",
    change: "+23%",
    trend: "down",
    icon: <BarChart2 className="w-5 h-5 text-rose-400" />,
    chart: (
      <div className="flex items-end h-12 mt-2 space-x-1">
        {[8, 6, 4, 7, 5].map((height, i) => (
          <div
            key={i}
            className={`w-3 rounded-t-sm transition-all duration-300 ${
              i === 0 || i === 3 ? "bg-rose-400" : "bg-gray-600/50"
            }`}
            style={{ height: `${height * 4}px` }}
          ></div>
        ))}
      </div>
    ),
    days: ["Mon 2", "Tue 3", "Wed 4"],
  },
  {
    title: "Course ROI",
    value: "283%",
    change: "+42%",
    trend: "up",
    icon: <TrendingUp className="w-5 h-5 text-purple-400" />,
    chart: (
      <div className="flex items-end h-12 mt-2 space-x-1">
        {[3, 5, 8, 10, 12].map((height) => (
          <div
            key={height}
            className="w-3 bg-purple-400 rounded-t-sm transition-all duration-300"
            style={{ height: `${height * 4}px` }}
          ></div>
        ))}
      </div>
    ),
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+0.8%",
    trend: "up",
    icon: <Percent className="w-5 h-5 text-blue-400" />,
    chart: (
      <div className="flex items-end h-12 mt-2 space-x-1">
        {[5, 4, 7, 3, 9].map((height, i) => (
          <div
            key={i}
            className={`w-3 rounded-t-sm transition-all duration-300 ${
              i % 2 === 0 ? "bg-blue-400" : "bg-gray-600/50"
            }`}
            style={{ height: `${height * 4}px` }}
          ></div>
        ))}
      </div>
    ),
    breakdown: [
      { label: "Mobile Users", value: "2.1%", color: "bg-blue-400" },
      { label: "Desktop Users", value: "4.3%", color: "bg-gray-600" },
    ],
  },
  {
    title: "Avg. Learning Session",
    value: "4m 32s",
    change: "+1m 12s",
    trend: "up",
    icon: <Clock className="w-5 h-5 text-teal-400" />,
    chart: (
      <div className="flex items-end h-12 mt-2 space-x-1">
        {[4, 6, 3, 7, 5].map((height, i) => (
          <div
            key={i}
            className={`w-3 rounded-t-sm transition-all duration-300 ${
              i !== 2 && i !== 4 ? "bg-teal-400" : "bg-gray-600/50"
            }`}
            style={{ height: `${height * 4}px` }}
          ></div>
        ))}
      </div>
    ),
    days: ["Mon 3m", "Tue 4m", "Wed 5m"],
  },
  {
    title: "New Learners",
    value: "1,248",
    change: "+18%",
    trend: "up",
    icon: <Users className="w-5 h-5 text-amber-400" />,
    chart: (
      <div className="flex items-end h-12 mt-2 space-x-1">
        {[5, 7, 4, 9, 6].map((height, i) => (
          <div
            key={i}
            className={`w-3 rounded-t-sm transition-all duration-300 ${
              i === 1 || i === 3 ? "bg-amber-400" : "bg-gray-600/50"
            }`}
            style={{ height: `${height * 4}px` }}
          ></div>
        ))}
      </div>
    ),
    breakdown: [
      { label: "Direct Signup", value: "32%", color: "bg-amber-400" },
      { label: "Referral", value: "68%", color: "bg-gray-600" },
    ],
  },
];
const StatCard = ({ stat }) => {
  return (
    <div className="rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-blue-500 hover:border-blue-400 group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-white text-sm font-medium mb-1">{stat.title}</p>
          <div className="flex items-end gap-2">
            <h3 className="text-2xl font-medium text-white">
              <AnimatedNumber value={stat.value} />
            </h3>
            <div
              className={`flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                stat.trend === "up"
                  ? "bg-emerald-400/10 text-emerald-400"
                  : "bg-rose-400/10 text-rose-400"
              }`}
            >
              {stat.trend === "up" ? (
                <ArrowUp className="w-3 h-3 mr-1" />
              ) : (
                <ArrowDown className="w-3 h-3 mr-1" />
              )}
              {stat.change}
            </div>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-gray-800 transition-colors">
          {stat.icon}
        </div>
      </div>

      <div className="flex-grow mt-4">
        {stat.chart}

        {stat.breakdown && (
          <div className="mt-4 space-y-2">
            {stat.breakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full ${item.color} mr-2`}
                  ></div>
                  <p className="text-xs text-white">{item.label}</p>
                </div>
                <p className="text-xs font-medium text-white">{item.value}</p>
              </div>
            ))}
          </div>
        )}

        {stat.days && (
          <div className="flex justify-between mt-4 text-xs text-white">
            {stat.days.map((day, idx) => (
              <div key={idx}>{day}</div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-blue-500/50 flex justify-between items-center">
        <button className="text-xs text-white hover:text-blue-300 transition-colors flex items-center">
          View Insights
        </button>
        <button className="text-xs flex items-center text-white hover:text-blue-300 transition-colors">
          Details <ChevronRight className="w-3 h-3 ml-1" />
        </button>
      </div>
    </div>
  );
};

const Analytics = () => {
  return (
    <main className="min-h-screen w-full text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-sm text-white mt-2">
                Performance & learner insights • Updated 2 hours ago
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium flex items-center transition-colors hover:shadow-md">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg text-sm font-medium transition-all hover:shadow-lg shadow-blue-500/20">
                Upgrade Plan
              </button>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Analytics;
