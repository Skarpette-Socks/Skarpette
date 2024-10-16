import React, { useEffect, useState } from "react";
import "./AdminPage.scss";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("authToken");

      const response = await fetch("https://api.example.com/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        navigate("/admin")
      }
    };

    fetchAdminData();
  }, []);

  return isLoggedIn ? <AdminLogged /> : <AdminNotLogged />;

  // if (isLoggedIn === null) {
  //   return <div>Loading...</div>;
  // }

};

const AdminLogged = () => {
  return <div className="admin">Hi, Admin</div>;
};

const AdminNotLogged = () => {
  return <div className="admin">Hi, Not Admin</div>;
};

export default AdminPage;
