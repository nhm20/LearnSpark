import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../../Components/Header";
import OrdersTable from "./OrdersTable";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, isAuthenticated } = useSelector((state) => state.user);

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
          throw new Error(data.error || "Failed to fetch orders");
        }
      } catch (err) {
        setError(
          err.message || "Something went wrong. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && user?._id) {
      fetchOrders();
    } else {
      setLoading(false);
      setError("You need to be logged in to view your orders.");
    }
  }, [user?._id, isAuthenticated]);

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#04012e] to-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center sm:text-left">
            <h1 className="text-4xl font-semibold text-white">Your Orders</h1>
            <p className="mt-2 text-base text-gray-400">
              Check out all the courses and sessions you've purchased.
            </p>
          </div>

          <div className="bg-black border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : (
              <OrdersTable orders={orders} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
