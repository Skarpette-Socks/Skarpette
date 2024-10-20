import React, { useEffect, useState } from "react";
import "./AdminPage.scss";
import { useNavigate } from "react-router-dom";
import MainPage from "../Main/MainPage";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        console.log("Токен не знайдено у localStorage");
        setIsLoggedIn(false);
        navigate("/login");
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
          navigate("/login");
        }
      } catch (error) {
        console.error("Помилка при виконанні запиту:", error);
        setIsLoggedIn(false);
        navigate("/login");
      }
    };

    fetchAdminData();
  }, [navigate]);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? <MainPage /> : <AdminNotLogged />;
};

const AdminNotLogged = () => {
  return <div className="admin">Hi, Not Admin</div>;
};

export default AdminPage;
