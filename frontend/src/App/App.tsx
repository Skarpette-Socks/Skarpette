import React, { ReactNode, useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { FavoritesProvider } from "../Context/FavoritesContext";
import { CartProvider } from "../Context/CartContext";
// import "./App.css";
import "../Components/assets/styles/main.scss";
import Footer from "./Components/Footer/Footer";
// import Admin from "../../../admin/src/Admin";

import NavBar from "./Components/NavBar/NavBar";
import SubHeader from "./Components/SubHeader/SubHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Search from "./Components/Search/Search";
import Loader from "../Components/Loader/Loader";
import AdminPage from "../../../admin/src/Pages/AdminPage/AdminPage";
import AdminAuth from "../../../admin/src/Pages/AdminAuth/AdminAuth";

const AboutUs = lazy(() => import("../Pages/AboutUs/AboutUs"));
const Cart = lazy(() => import("../Pages/Cart/Cart"));
const Contacts = lazy(() => import("../Pages/Contacts/Contacts"));
const Favorites = lazy(() => import("../Pages/Favourites/Favorites"));
const PaymentDelivery = lazy(
  () => import("../Pages/PaymentDelivery/PaymentDelivery")
);
const PrivacyPolicy = lazy(() => import("../Pages/PrivacyPolicy/PrivacyPolicy"));
const Product = lazy(() => import("../Pages/Product/Product"));
const Promotions = lazy(() => import("../Pages/Promotions"));
const Returning = lazy(() => import("../Pages/Returning/Returning"));
const Checkout = lazy(() => import("../Pages/Checkout/Checkout"));
const Shop = lazy(() => import("../Pages/Shop"));
const SocksPage = lazy(() => import("../Pages/Catalog/Catalog"));
const SearchResults = lazy(() => import("../Pages/SearchResults/SearchResults"));

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
  { path: "/search-results", element: <SearchResults /> },
  { path: "/admin", element: <AdminAuth /> },
  { path: "/admin-page", element: <AdminPage /> },

];

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const noHeaderPaths = ["/checkout", "/admin", "/admin-page"];
  const showHeader = noHeaderPaths.includes(location.pathname);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />
      {!showHeader && <SubHeader />}
      {!showHeader && (
        <div>
          {isSearchOpen ? (
            <Search toggleSearch={toggleSearch} isOpen={isSearchOpen} />
          ) : (
            <NavBar toggleSearch={toggleSearch} />
          )}
        </div>
      )}
      {children}
      {!showHeader && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Suspense fallback={<Loader />}>
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </CartProvider>
    </FavoritesProvider>
  );
};

export default App;
