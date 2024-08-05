import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Импорты стилей
import './App.css';
import './Components/assets/styles/main.scss';

// Импорты компонентов
import Footer from './Components/Footer/Footer';
import NavBar from './Components/NavBar/NavBar';
import SubHeader from './Components/SubHeader/SubHeader';

// Импорты страниц
import AboutUs from "./Pages/AboutUs/AboutUs";
import Cart from "./Pages/Cart";
import Contacts from "./Pages/Contacts/Contacts";
import Favorites from "./Pages/Favorites";
import KidsSocks from "./Pages/KidsSocks/KidsSocks";
import MenSocks from "./Pages/MenSocks/MenSocks";
import PaymentDelivery from "./Pages/PaymentDelivery/PaymentDelivery";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import Product from "./Pages/Product";
import Promotions from "./Pages/Promotions";
import Returning from "./Pages/Returning/Returning";
import Shop from "./Pages/Shop";
import WomanSocks from "./Pages/WomanSocks/WomanSocks";

// Конфигурация маршрутов
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
  { path: "/womens-socks", element: <WomanSocks /> },
  { path: "/mens-socks", element: <MenSocks /> },
  { path: "/kids-socks", element: <KidsSocks /> },
];

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <SubHeader />
        <NavBar />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
