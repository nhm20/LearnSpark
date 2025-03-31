import { Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import DashBoard from "./Admin/AdminDashBoard";
import Homepage from "./Pages/HomePage/Homepage";
import CoursesPage from "./User/CoursesPage/Courses";
import Payment from "./User/Payment";
import OrdersPage from "./User/OrdersPage/OrdersPage";
import CourseDetails from "./User/CoursePage/CoursePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/" element={<DashBoard />} />
      </Routes>
    </>
  );
}

export default App;
