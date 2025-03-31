import React, { useState, useEffect } from "react";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/api/orders?page=${page}&limit=10`);
        setOrders((prevOrders) => [...prevOrders, ...response.data.orders]);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [page]);

  const loadMoreOrders = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {orders.length === 0 && !loading && <p>No orders found.</p>}

      <ul>
        {orders.map((order, index) => (
          <li key={index} className="border p-4 mb-4">
            <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
            <p><strong>Tutor:</strong> {order.tutor?.name || "N/A"}</p>
          </li>
        ))}
      </ul>

      {loading && <p>Loading...</p>}

      {!loading && page < totalPages && (
        <div className="text-center py-4">
          <button onClick={loadMoreOrders} className="px-6 py-2 bg-blue-500 text-white rounded">
            Load More
          </button>
        </div>
      )}

      {!loading && page >= totalPages && <p className="text-center py-4">No more orders.</p>}
    </div>
  );
};

export default OrdersPage;
