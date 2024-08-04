import React, { useEffect, useRef, useState } from "react";
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
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);


  const toggleFunc = () => {
    setIsActive(false);
    toggleMenu();
    window.scrollTo(0, 0);
  }

  return (
    <div className="dropdown" ref={menuRef}>
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
                <div className="dropdown-item-text">
                  {name} шкарпетки
                </div>
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
