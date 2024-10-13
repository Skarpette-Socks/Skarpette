import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../../../Context/FavoritesContext";
import "./NavBar.scss";

import search_icon from "../../../Components/assets/img/icons/search.svg";
import heart_icon from "../../../Components/assets/img/icons/heart.svg";
import logo from "../../../Components/assets/img/icons/logo-black.svg";
import menu from "../../../Components/assets/img/icons/menu.svg";
import close_icon from "../../../Components/assets/img/icons/close.svg";
import cart from "../../../Components/assets/img/icons/cart.svg";
import Menu from "../../../Components/Menu/Menu";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import { useCartItems } from "../../../Context/CartContext";

interface NavBarProps {
  toggleSearch: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1279);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1279);
      if (window.innerWidth > 1279 && isMenuOpen) {
        setIsMenuOpen(false); // Закрываем меню, если оно открыто на большом экране
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (isMobile) {
      setIsMenuOpen((prev) => !prev);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (isMenuOpen) {
      closeMenu(); // Закрываем меню, если оно открыто
    }
    navigate("/"); // Переход на главную страницу
  };

  return (
    <nav className="navBar">
      <div className="navBar__logo">
        {isMobile && ( // Бургер-меню отображается только на мобильных устройствах
          <img
            src={isMenuOpen ? close_icon : menu}
            alt="burger menu"
            className="navBar__burger-menu"
            onClick={toggleMenu}
          />
        )}
        <img
          src={logo}
          alt="site logo"
          className="navBar__logo-img"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        />
      </div>
      <NavBarMenu toggleMenu={toggleMenu} />
      <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <NavBarActions toggleMenu={closeMenu} toggleSearch={toggleSearch} />
    </nav>
  );
};

const NavBarMenu: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => {
  return (
    <ul className="navBar__menu">
      <li>
        <Dropdown toggleMenu={toggleMenu} />
      </li>
      <li>
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

const NavBarActions: React.FC<{
  toggleMenu: () => void;
  toggleSearch: () => void;
}> = ({ toggleMenu, toggleSearch }) => {
  const { favorites } = useFavorites();
  const { cartItems } = useCartItems();

  const countItems = cartItems.reduce((sum, item) => {
    const count = item.count ? item.count : 0;
    return sum + count;
  }, 0);

  const handleLinkClick = () => {
    toggleMenu();
  };

  return (
    <div className="navBar__actions">
      <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          toggleSearch();
        }}
      >
        <img src={search_icon} alt="Search" />
      </Link>
      <Link
        to="/favorites"
        className="navBar__actions-favorites"
        onClick={handleLinkClick}
      >
        <img src={heart_icon} alt="Favorites" />
        {favorites.length > 0 && (
          <div className="navBar__actions-favorites-count">
            {favorites.length}
          </div>
        )}
      </Link>
      <Link to="/cart" onClick={handleLinkClick}>
        <div className="navBar__actions-cart">
          <img
            src={cart}
            alt="cart icon"
            className="navBar__actions-cart-icon"
          />
          <p className="navBar__actions-cart-text">Кошик</p>
          <div className="navBar__actions-cart-count">{countItems}</div>
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
