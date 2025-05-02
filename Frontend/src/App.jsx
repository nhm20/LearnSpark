import { Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Homepage from "./Pages/HomePage/Homepage";
import CoursesPage from "./User/CoursesPage/Courses";
import OrdersPage from "./User/OrdersPage/OrdersPage";
import CourseDetails from "./User/CoursePage/CoursePage";
import ResetPassword from "./Pages/LoginPage/ResetPassword";
import AdminRoute from "./ProtectedRoutes/AdminRoute";

import AdminDashBoard from "./Admin/AdminDashBoard";
import Courses from "./Admin/Courses";
import Users from "./Admin/Users";
import Tutors from "./Admin/Tutors";
import Orders from "./Admin/Orders";
import TutorRoute from "./ProtectedRoutes/TutorRoute";
import TutorDashboard from "./Tutors/TutorDashboard";
import Profile from "./Tutors/Profile";
import History from './Tutors/History';
import UserProfile from "./User/Profile";


function App() {
  return (
    <>
      <Routes>
        <Route path="/user-signup" element={<RegisterPage />} />
        <Route path="/tutor-signup" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<UserProfile />} />

        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="users" element={<Users />} />
          <Route path="tutors" element={<Tutors />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="/tutor" element={<TutorRoute />}>
          <Route path="dashboard" element={<TutorDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<History/>}/>
        </Route>
        </Routes>
    </>
  );
}
export default App;
