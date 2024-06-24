import React, { useState } from "react";
import "./NavBar.scss";
import Menu from "../Menu/Menu"; // Adjust the path as necessary

import search_icon from "../assets/img/icons/search.svg";
import heart_icon from "../assets/img/icons/heart.svg";
import logo from "../assets/img/icons/logo-black.svg";
import menu from "../assets/img/icons/menu.svg";
import cart from "../assets/img/icons/cart.svg";
import Dropdown from "../Dropdown/Dropdown";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navBar">
      <div className="navBar__logo">
        <img
          src={menu}
          alt="burger menu"
          className="navBar__burger-menu"
          onClick={toggleMenu}
        />
        <a href="/">
          <img src={logo} alt="site logo" className="navBar__logo-img" />
        </a>
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
        <a href="/offers">Акції</a>
      </li>
      <li className="navBar__item">
        <a href="/about-us">Про нас</a>
      </li>
      <li className="navBar__item">
        <a href="/payment-and-delivery">Оплата та доставка</a>
      </li>
      <li className="navBar__item">
        <a href="/contacts">Контакти</a>
      </li>
    </ul>
  );
};

const NavBarActions: React.FC = () => (
  <div className="navBar__actions">
    <a href="#">
      <img src={search_icon} alt="Search" />
    </a>
    <a href="/favorites">
      <img src={heart_icon} alt="Favorites" />
    </a>
    <a href="/cart">
      <div className="navBar__actions-cart">
        <img src={cart} alt="cart icon" className="navBar__actions-cart-icon" />
        <p className="navBar__actions-cart-text">Кошик</p>
        <div className="navBar__actions-cart-count">2</div>
      </div>
    </a>
  </div>
);

export default NavBar;
