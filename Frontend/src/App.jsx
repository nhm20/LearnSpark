import { Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import DashBoard from "./Admin/AdminDashBoard";
import Homepage from "./Pages/HomePage/Homepage";
import CourseDetails from "./User/CourseDetails";
import CoursesPage from "./User/CoursePage/Courses";
import Payment from "./User/Payment";

function App() {
  return (<>
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/" element={<DashBoard/>} />
    </Routes>
  </>);
}

export default App;
