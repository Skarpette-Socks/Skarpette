// Импорты стилей
import "./App.css";
import "./Components/assets/styles/main.scss";

// Импорты компонентов
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import SubHeader from "./Components/SubHeader/SubHeader";

// Импорты страниц
import AboutUs from "./Pages/AboutUs/AboutUs";
import Cart from "./Pages/Cart";
import Catalog from "./Pages/Catalog";
import Contacts from "./Pages/Contacts/Contacts";
import Favorites from "./Pages/Favorites";
import PaymentDelivery from "./Pages/PaymentDelivery/PaymentDelivery";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import Product from "./Pages/Product";
import Promotions from "./Pages/Promotions";
import Returning from "./Pages/Returning/Returning";
import Shop from "./Pages/Shop";

// Конфигурация маршрутов
const routes = [
  { path: "/", element: <Shop /> },
  { path: "/catalog", element: <Catalog /> },
  { path: "/offers", element: <Promotions /> },
  { path: "/about-us", element: <AboutUs /> },
  { path: "/payment-and-delivery", element: <PaymentDelivery /> },
  { path: "/contacts", element: <Contacts /> },
  { path: "/favorites", element: <Favorites /> },
  { path: "/cart", element: <Cart /> },
  { path: "/product", element: <Product /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/return-of-goods", element: <Returning /> },
];

const App: React.FC = () => {
  const currentPath = window.location.pathname;
  const currentRoute =
    routes.find((route) => route.path === currentPath) || routes[0];

  return (
    <div className="App">
      <SubHeader />
      <NavBar />
      {currentRoute.element}
      <Footer />
    </div>
  );
};

export default App;
