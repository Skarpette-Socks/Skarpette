import React, { useState } from "react";
import "./NavBar.scss";
import Menu from "../Menu/Menu"; // Adjust the path as necessary

import search_icon from "../assets/img/icons/search.svg";
import heart_icon from "../assets/img/icons/heart.svg";
import logo from "../assets/img/icons/logo-black.svg";
import menu from "../assets/img/icons/menu.svg";
import close_icon from "../assets/img/icons/close.svg";
import cart from "../assets/img/icons/cart.svg";
import Dropdown from "../Dropdown/Dropdown";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navBar">
      <div className="navBar__logo">
        <img
          src={isMenuOpen ? close_icon : menu}
          alt="burger menu"
          className="navBar__burger-menu"
          onClick={toggleMenu}
        />
        <Link to="/">
          <img src={logo} alt="site logo" className="navBar__logo-img" />
        </Link>
      </div>
      <NavBarMenu />
      <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <NavBarActions />
    </nav>
  );
};

const NavBarMenu: React.FC = () => {
  return (
    <ul className="navBar__menu">
      <li>
        <Dropdown />
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
};

const NavBarActions: React.FC = () => (
  <div className="navBar__actions">
    <Link to="#">
      <img src={search_icon} alt="Search" />
    </Link>
    <Link to="/favorites">
      <img src={heart_icon} alt="Favorites" />
    </Link>
    <Link to="/cart">
      <div className="navBar__actions-cart">
        <img src={cart} alt="cart icon" className="navBar__actions-cart-icon" />
        <p className="navBar__actions-cart-text">Кошик</p>
        <div className="navBar__actions-cart-count">2</div>
      </div>
    </Link>
  </div>
);

export default NavBar;
