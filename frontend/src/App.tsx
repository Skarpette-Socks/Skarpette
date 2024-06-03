import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Promoitons from "./Pages/Promoitons";
import AboutUs from "./Pages/AboutUs";
import PaymentDelivery from "./Pages/PaymentDelivery";
import Contacts from "./Pages/Contacts";
import SubHeader from "./Components/SubHeader/SubHeader";
import Cart from "./Pages/Cart";
import Favorites from "./Pages/Favorites";
import Catalog from "./Pages/Catalog";
import Shop from "./Pages/Shop";

const App = () => (
  <Router>
    <SubHeader />
    <NavBar />
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/offers" element={<Promoitons />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/payment-and-delivery" element={<PaymentDelivery />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </Router>
);

export default App;
