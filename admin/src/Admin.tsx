import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminAuth from "./Pages/AdminAuth/AdminAuth";
import React, { useEffect, useState } from "react";
import NotFound from "./Pages/NotFound/NotFound";
import MainPage from "./Pages/Main/MainPage";
import Orders from "./Pages/Orders/Orders";
import AdminPage from "./Pages/AdminPage/AdminPage";
import AddProduct from "./Pages/AddProduct/AddProduct";
import EditProduct from "./Pages/EditProduct/EditProduct";
import { ToastContainer } from "react-toastify";


const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/admin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        setIsLoggedIn(response.ok);
      } catch (error) {
        console.error("Помилка при виконанні запиту:", error);
        setIsLoggedIn(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  if (isLoggedIn === null) return <div>Завантаження...</div>;

  return isLoggedIn ? <>{children}</> : <AdminAuth />;
};

const Admin = () => {
  return (
    <Router>
      <ToastContainer 
        pauseOnFocusLoss={false} 
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={
          <AuthWrapper>
            <AdminPage />
          </AuthWrapper>
        }>
          <Route index element={<MainPage />} />
          <Route path="orders" element={<Orders />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:VENDOR_CODE" element={<EditProduct />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Admin;
