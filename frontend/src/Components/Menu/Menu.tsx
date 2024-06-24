import React, { useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import cart from "../assets/img/icons/cart.svg";
import "./Menu.scss";

interface MenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, toggleMenu }) => {
  useEffect(() => {
    if (isOpen) {
      // Сохраняем текущую позицию прокрутки
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Восстанавливаем позицию прокрутки
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [isOpen]);

  return (
    <div className={`menu ${isOpen ? "menu--open" : ""}`}>
      <ul>
        <li className="menu__button">
          <Dropdown />
        </li>
        <li className="menu__item">
          <a href="/offers" onClick={toggleMenu}>
            Акції
          </a>
        </li>
        <li className="menu__item">
          <a href="/about-us" onClick={toggleMenu}>
            Про нас
          </a>
        </li>
        <li className="menu__item">
          <a href="/payment-and-delivery" onClick={toggleMenu}>
            Оплата та доставка
          </a>
        </li>
        <li className="menu__item">
          <a href="/contacts" onClick={toggleMenu}>
            Контакти
          </a>
        </li>
      </ul>
      <div className="menu__cart">
        <a href="/cart" onClick={toggleMenu}>
          <div className="menu__cart-details">
            <img src={cart} alt="cart icon" className="menu__cart-icon" />
            <p className="menu__cart-text">Кошик</p>
            <div className="menu__cart-count">2</div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Menu;
