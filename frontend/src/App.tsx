import React, { ReactNode, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { FavoritesProvider } from "./Context/FavoritesContext";
import "./App.css";
import "./Components/assets/styles/main.scss";

import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import SubHeader from "./Components/SubHeader/SubHeader";

import AboutUs from "./Pages/AboutUs/AboutUs";
import Cart from "./Pages/Cart";
import Contacts from "./Pages/Contacts/Contacts";
import Favorites from "./Pages/Favourites/Favorites";
import PaymentDelivery from "./Pages/PaymentDelivery/PaymentDelivery";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import Product from "./Pages/Product";
import Promotions from "./Pages/Promotions";
import Returning from "./Pages/Returning/Returning";
import Checkout from "./Pages/Checkout/Checkout";
import Shop from "./Pages/Shop";
import { CartProvider } from "./Context/CartContext";
import SocksPage from "./Components/SocksPage/SocksPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Search from "./Components/Search/Search";

// Список маршрутів
const routes = [
  { path: "/", element: <Shop /> },
  { path: "/offers", element: <Promotions /> },
  { path: "/about-us", element: <AboutUs /> },
  { path: "/payment-and-delivery", element: <PaymentDelivery /> },
  { path: "/contacts", element: <Contacts /> },
  { path: "/favorites", element: <Favorites /> },
  { path: "/cart", element: <Cart /> },
  { path: "/product/:VENDOR_CODE", element: <Product /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/return-of-goods", element: <Returning /> },
  { path: "/catalog/:TYPE_LINK", element: <SocksPage /> },
  { path: "/checkout", element: <Checkout /> },
];

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout";
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Состояние для показа поиска

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev); // Переключаем показ поиска
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />
      {!isCheckoutPage && <SubHeader />}
      {!isCheckoutPage && (
        <div style={{ position: "relative", height: "auto" }}>
          {isSearchOpen ? (
            <Search toggleSearch={toggleSearch} />
          ) : (
            <NavBar toggleSearch={toggleSearch} />
          )}
        </div>
      )}
      {children}
      {!isCheckoutPage && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </FavoritesProvider>
  );
};

export default App;
