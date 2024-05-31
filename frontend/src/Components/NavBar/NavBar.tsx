import "./NavBar.scss";

import search_icon from '../assets/img/icons/search.svg';
import heart_icon from "../assets/img/icons/heart.svg";
import arrow_down from '../assets/img/icons/caret-down-filled.svg'

const NavBar = () => {
  return (
    <div className="navBar">
      <a href="#" className="navBar__logo">
        Skarpette
      </a>
      <ul className="navBar__menu">
        <li>
          <button className="navBar__menu-catalog">
            Каталог
            <span>
              <img src={arrow_down} alt="arrow_down" />
            </span>
          </button>
        </li>
        <li className="navBar__item">Акції</li>
        <li className="navBar__item">Про нас</li>
        <li className="navBar__item">Оплата та доставка</li>
        <li className="navBar__item">Контакти</li>
      </ul>
      <div className="navBar__actions">
        <a href="#">
          <img src={search_icon} alt="search_icon" />
        </a>
        <a href="#">
          <img src={heart_icon} alt="heart_icon" />
        </a>
        <div className="navBar__actions-cart">
          <p className="navBar__actions-cart-text">Кошик</p>
          <div className="navBar__actions-cart-count">2</div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
