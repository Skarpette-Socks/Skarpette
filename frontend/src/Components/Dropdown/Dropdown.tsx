import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Dropdown.scss";

import arrow_right from "../../assets/img/icons/chevron-right.svg";
import arrow_up from "../../assets/img/icons/caret-up-filled.svg";
import arrow_down from "../../assets/img/icons/caret-down-filled.svg";
import options from "../../../json_links/categories.json";

interface Props {
  toggleMenu: () => void;
}

const Dropdown: React.FC<Props> = ({ toggleMenu }) => {
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setTimeout(() => {
        setIsActive(false);
      },0)
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, handleClickOutside]);

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  const handleItemClick = () => {
    setIsActive(false);
    toggleMenu();
    window.scrollTo(0, 0);
  };

  const renderedOptions = React.useMemo(() => {
    return options.map((option) => (
      <Link
        key={option.dropdown_name}
        className="dropdown-item"
        to={option.link}
        onClick={handleItemClick}
      >
        <div className="dropdown-item-text">{option.dropdown_name}</div>
        <span className="dropdown-item-icon">
          <img src={arrow_right} alt="arrow right" />
        </span>
      </Link>
    ));
  }, [handleItemClick]); // Обязательно добавляем handleItemClick в зависимости

  return (
    <div className="dropdown" ref={menuRef}>
      <div className="dropdown-btn" onClick={handleToggle}>
        Каталог
        <span className="dropdown-btn-icon">
          <img src={isActive ? arrow_up : arrow_down} alt="toggle" />
        </span>
      </div>
      {isActive && <div className="dropdown-content">{renderedOptions}</div>}
    </div>
  );
};

export default Dropdown;
