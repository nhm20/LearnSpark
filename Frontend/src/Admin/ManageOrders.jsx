import React, { useEffect, useState } from "react";
import axios from "axios";
import OrdersTable from "./Components/OrdersTable";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/users/orders`
      );

      const ordersData = Array.isArray(res.data.orders)
        ? res.data.orders
        : Array.isArray(res.data)
        ? res.data
        : [];

      setOrders(ordersData);
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchOrders();
      } catch (error) {
        return;
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="text-white ml-4">Loading orders...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-5">
      <div className="max-w-6xl mx-auto bg-black p-6">
        <h2 className="text-2xl font-medium mb-4 text-white">Manage Orders</h2>
        <div className="text-white mb-4">Total Orders: {orders.length}</div>
        <OrdersTable orders={orders} loading={loading} />
      </div>
    </div>
  );
};

export default ManageOrders;
