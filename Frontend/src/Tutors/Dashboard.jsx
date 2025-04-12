import React from "react";
import { useSelector } from "react-redux"; // Import the useSelector hook from Redux
import ProfileWarning from "./Components/ProfileWarning";

const Dashboard = () => {
  // Get the user's name from the Redux store
  const { user } = useSelector((state) => state.user);

  return (
    <main className="min-h-screen w-full text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <div className="mt-2">
                <ProfileWarning />
              </div>
            </div>
          </div>
        </header>
        <section>
          <p className="text-gray-300">
            {user
              ? `Hey ${user.name}, how are you doing?`
              : "Welcome to your tutor dashboard."}
          </p>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
