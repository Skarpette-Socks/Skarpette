import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import cart from "../assets/img/icons/cart.svg";
import "./Menu.scss";
import { useCartItems } from "../../Context/CartContext";

interface MenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, toggleMenu }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    }
  }, [isOpen, scrollY]);

  const [topOffset, setTopOffset] = useState(0);

    const { cartItems } = useCartItems();

    // Подсчитываем количество товаров в корзине
    const countItems = cartItems.reduce((sum, item) => {
      const count = item.count ? item.count : 0;
      return sum + count;
    }, 0);

  useEffect(() => {
    const calculateTopOffset = () => {
      const banner = document.querySelector(".subHeader") as HTMLElement;
      const navbar = document.querySelector(".navBar") as HTMLElement;
      const totalOffset =
        (banner?.offsetHeight || 0) + (navbar?.offsetHeight || 0);
      setTopOffset(totalOffset);
    };

    calculateTopOffset();
    window.addEventListener("resize", calculateTopOffset);

    return () => window.removeEventListener("resize", calculateTopOffset);
  }, []);

  return (
    <>
      <div
        className={`overlay ${isOpen ? "overlay--active" : ""}`}
        style={{ top: `${topOffset}px` }}
        onClick={toggleMenu}
      ></div>
      <div
        className={`menu ${isOpen ? "menu--open" : ""}`}
        style={{ top: `${topOffset}px` }}
      >
        <ul>
          <li className="menu__button">
            <Dropdown toggleMenu={toggleMenu} />
          </li>
          <li className="menu__item">
            <Link to="/offers" onClick={toggleMenu}>
              Акції
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/about-us" onClick={toggleMenu}>
              Про нас
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/payment-and-delivery" onClick={toggleMenu}>
              Оплата та доставка
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/contacts" onClick={toggleMenu}>
              Контакти
            </Link>
          </li>
        </ul>
        <div className="menu__cart">
          <Link to="/cart" onClick={toggleMenu}>
            <div className="menu__cart-details">
              <img src={cart} alt="cart icon" className="menu__cart-icon" />
              <p className="menu__cart-text">Кошик</p>
              <div className="menu__cart-count">{countItems}</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Menu;
