import React from 'react'

const CourseTabs = ({ activeTab, setActiveTab }) => {
  return <>
  <div className="border-b border-gray-800/50 mb-8 w-full">
    <nav className="flex space-x-8 w-full">
      {["overview", "curriculum", "instructor", "reviews"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
            activeTab === tab
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-400"
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  </div></>;
};

export default CourseTabs
