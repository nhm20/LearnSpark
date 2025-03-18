import React, { useEffect, useState } from "react";
import axios from "axios";

const Earnings = ({ tutorId }) => {
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await axios.get(`/api/tutorEarnings/${tutorId}`);
        setEarnings(response.data.totalEarnings);
      } catch (error) {
        console.error("Error fetching earnings:", error);
      }
    };

    fetchEarnings();
  }, [tutorId]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Total Earnings</h2>
      <p className="mt-4 text-3xl font-bold text-green-600">${earnings}</p>
    </div>
  );
};

export default Earnings;
