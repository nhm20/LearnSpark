import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../../Components/Header";
import OrdersTable from "./OrdersTable";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/orders/${user._id}`
        );

        if (data.success) {
          setOrders(data.data || []);
        } else {
          setError(new Error(data.error || "Failed to fetch orders"));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchOrders();
    }
  }, [user?._id]);

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#04012e] to-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center sm:text-left">
            <h1 className="text-4xl font-semibold text-white">Order History</h1>
            <p className="mt-2 text-base text-gray-400">
              View all your purchased courses and sessions
            </p>
          </div>

          <div className="bg-black border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <OrdersTable orders={orders} loading={loading} error={error} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
