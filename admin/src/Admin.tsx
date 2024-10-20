import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./Admin.css";
import AdminAuth from "./Pages/AdminAuth/AdminAuth";
import AdminPage from "./Pages/AdminPage/AdminPage";
import React, { ReactNode } from "react";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Aside/Aside";
import ProductTable from "./Components/Table/ProductTable";
// import MainPage from "./Pages/Main/MainPage";

interface LayoutProps {
  children: ReactNode;
}

const Admin = () => {

  
  const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const noHeaderPaths = ["/login"];
    const showHeader = noHeaderPaths.includes(location.pathname);

    return (
      <>
        {!showHeader && 
        <>
          <Header />
          <Sidebar />
        </>}
          {children}
      </>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<AdminAuth />} />
          <Route path="/admin" element={<AdminPage />} >
            <Route path="/admin/goods" element={<ProductTable />}/>
            <Route path="*" element={<ProductTable />}/>

          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default Admin;
