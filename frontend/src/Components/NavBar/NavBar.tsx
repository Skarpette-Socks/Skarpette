import { Link } from "react-router-dom";
import "./NavBar.scss";

import search_icon from "../assets/img/icons/search.svg";
import heart_icon from "../assets/img/icons/heart.svg";
import logo from "../assets/img/icons/logo.svg";

import arrow_down from "../assets/img/icons/caret-down-filled.svg";

const NavBarMenu = () => (
  <ul className="navBar__menu">
    <li>
      <Link to="/catalog">
        <button className="navBar__menu-catalog">
          Каталог
          <span>
            <img src={arrow_down} alt="Dropdown arrow" />
          </span>
        </button>
      </Link>
    </li>
    <li className="navBar__item">
      <Link to="/offers">Акції</Link>
    </li>
    <li className="navBar__item">
      <Link to="/about-us">Про нас</Link>
    </li>
    <li className="navBar__item">
      <Link to="/payment-and-delivery">Оплата та доставка</Link>
    </li>
    <li className="navBar__item">
      <Link to="/contacts">Контакти</Link>
    </li>
  </ul>
);

const NavBarActions = () => (
  <div className="navBar__actions">
    <a href="#">
      <img src={search_icon} alt="Search" />
    </a>
    <Link to="/favorites">
      <img src={heart_icon} alt="Favorites" />
    </Link>
    <Link to="/cart">
      <div className="navBar__actions-cart">
        <p className="navBar__actions-cart-text">Кошик</p>
        <div className="navBar__actions-cart-count">2</div>
      </div>
    </Link>
  </div>
);

const NavBar = () => (
  <nav className="navBar">
    <Link to="/" className="navBar__logo">
      <img src={logo} alt="site logo" />
    </Link>
    <NavBarMenu />
    <NavBarActions />
  </nav>
);

export default NavBar;
