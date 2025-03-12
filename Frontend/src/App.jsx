import { Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import DashBoard from "./Pages/Admin/AdminDashBoard";
import LoginPage from "./Pages/LoginPage/LoginPage";

function App() {
  return (<>
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<DashBoard/>} />
    </Routes>
  </>);
}

export default App;
