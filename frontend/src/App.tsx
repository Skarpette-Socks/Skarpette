// Импорты библиотек
import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

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
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <SubHeader />
        <NavBar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/offers" element={<Promotions />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/payment-and-delivery" element={<PaymentDelivery />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product" element={<Product />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/return-of-goods" element={<Returning />} />
          <Route path="/womens-socks" element={<WomanSocks />} />
          <Route path="/mens-socks" element={<MenSocks />} />
          <Route path="/kids-socks" element={<KidsSocks />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
