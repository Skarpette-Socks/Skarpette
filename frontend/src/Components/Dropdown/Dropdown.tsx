import React, { useState } from "react";
import "./Dropdown.scss";

import arrow_right from "../assets/img/icons/chevron-right.svg";
import arrow_up from "../assets/img/icons/caret-up-filled.svg";
import arrow_down from "../assets/img/icons/caret-down-filled.svg";

const Dropdown: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const options = [
    { name: "Жіночі шкарпетки", link: "/womens-socks" },
    { name: "Чоловічі шкарпетки", link: "/mens-socks" },
    { name: "Дитячі шкарпетки", link: "/kids-socks" },
    { name: "Короткі", link: "/short-socks" },
    { name: "Моно", link: "/mono-socks" },
    { name: "Веселі", link: "/funny-socks" },
    { name: "Непарні", link: "/odd-socks" },
    { name: "Класичні", link: "/classic-socks" },
  ];

  return (
    <div className="dropdown">
      <div
        className="dropdown-btn"
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        Каталог
        <span className="dropdown-btn-icon">
          {isActive ? (
            <img src={arrow_up} alt="arrow up" />
          ) : (
            <img src={arrow_down} alt="arrow down" />
          )}
        </span>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <a
              key={option.name}
              className="dropdown-item"
              href={option.link}
              onClick={() => {
                setIsActive(false);
              }}
            >
              {option.name}
              <span className="dropdown-item-icon">
                <img src={arrow_right} alt="arrow right" />
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
