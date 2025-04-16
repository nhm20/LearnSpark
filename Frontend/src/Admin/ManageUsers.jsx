import React, { useEffect, useState } from "react";
import axios from "axios";
import UsersTable from "./Components/UsersTable";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/users`
      );

      const usersData = Array.isArray(res.data.users)
        ? res.data.users
        : Array.isArray(res.data)
        ? res.data
        : [];

      setUsers(usersData);
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchUsers();
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
        <span className="text-white ml-4">Loading users...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-5">
      <div className="max-w-6xl mx-auto bg-black p-6">
        <h2 className="text-2xl font-medium mb-4 text-white">Manage Users</h2>
        <div className="text-white mb-4">Total Users: {users.length}</div>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default ManageUsers;
