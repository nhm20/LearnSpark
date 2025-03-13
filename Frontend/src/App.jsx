import { Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import DashBoard from "./Admin/AdminDashBoard";

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
