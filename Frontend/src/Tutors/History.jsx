import React, { useEffect, useState } from "react";
import axios from "axios";

const TeachingHistory = ({ tutorId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`/api/teachingHistory/${tutorId}`);
        setHistory(response.data.history);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, [tutorId]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Teaching History</h2>
      <div className="mt-4">
        {history.length > 0 ? (
          history.map((record) => (
            <div
              key={record._id}
              className="p-4 bg-gray-50 rounded-lg shadow-sm mb-2"
            >
              <h3 className="text-lg font-medium">{record.unit}</h3>
              <p className="text-sm text-gray-500">
                Date: {new Date(record.date).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No teaching history available.</p>
        )}
      </div>
    </div>
  );
};

export default TeachingHistory;
