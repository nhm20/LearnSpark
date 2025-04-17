import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import HistoryTable from "./Components/HistoryTable";

const TeachingHistory = () => {
  const { user } = useSelector((state) => state.user);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:8000/api/tutors/history/${user._id}`
        );
        setHistory(data.data);
      } catch (error) {
        return;
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchHistory();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="text-white ml-4">Loading teaching history...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-5 bg-black text-white">
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-medium mb-4">Teaching History</h2>
        <div className="mb-4">Total Records: {history?.length}</div>
        <HistoryTable records={history} />
      </div>
    </div>
  );
};

export default TeachingHistory;
