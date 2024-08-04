import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dropdown.scss";

import arrow_right from "../assets/img/icons/chevron-right.svg";
import arrow_up from "../assets/img/icons/caret-up-filled.svg";
import arrow_down from "../assets/img/icons/caret-down-filled.svg";
import options from "../../../../backend/bd/categories.json";

interface Props {
  toggleMenu: () => void;
}

const Dropdown: React.FC<Props> = ({ toggleMenu }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleFunc = () => {
    setIsActive(false);
    toggleMenu();
    window.scrollTo(0, 0);
  }

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
          {options.map((option) => {
            const {name, link} = option;

            return (
              <Link
                key={name}
                className="dropdown-item"
                to={link}
                onClick={toggleFunc}
              >
                {name}
                <span className="dropdown-item-icon">
                  <img src={arrow_right} alt="arrow right" />
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
