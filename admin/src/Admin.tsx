import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./Admin.css";
import AdminAuth from "./Pages/AdminAuth/AdminAuth";
import AdminPage from "./Pages/AdminPage/AdminPage";
import MainPage from "./Pages/Main/MainPage";

const Admin = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminAuth />} />
        <Route path="/admin-page" element={<AdminPage />} />
        <Route path="/admin-main" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default Admin;
