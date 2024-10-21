import { BrowserRouter as Router, Route, Routes, Outlet, useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminAuth from "./Pages/AdminAuth/AdminAuth";
import React, { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Aside/Aside";
import NotFound from "./Pages/NotFound/NotFound";
import MainPage from "./Pages/Main/MainPage";
import Orders from "./Pages/Orders/Orders";
// import MainPage from "./Pages/Main/MainPage";

const Admin = () => {
  const Layout: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchAdminData = async () => {
        const token = localStorage.getItem("authToken");
        
        if (!token) {
          console.log("Токен не знайдено у localStorage");
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
  
          if (response.ok) {
            const data = await response.json();
            console.log("Дані адміністратора:", data);
            setIsLoggedIn(true);
          } else {
            console.log("Запит не успішний, статус:", response.status);
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error("Помилка при виконанні запиту:", error);
          setIsLoggedIn(false);
        }
      };
  
      fetchAdminData();
    }, [navigate]);
  
    if (isLoggedIn === null) {
      return <div>Завантаження...</div>;
    }

    return isLoggedIn ? 
      <>
        <Header />
        <Sidebar />
        <Outlet />
      </>
    : <AdminAuth />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="orders" element={<Orders />} />

            
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </Router>
  );
};

export default Admin;
