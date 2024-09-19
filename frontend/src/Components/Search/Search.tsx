import React, { useState, KeyboardEvent, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/icons/logo-black.svg";
import search_icon from "../assets/img/icons/search.svg";
import close_icon from "../assets/img/icons/close.svg";
import "./Search.scss";

interface SearchProps {
  toggleSearch: () => void;
  isOpen: boolean;
}

const Search: React.FC<SearchProps> = ({ toggleSearch, isOpen }) => {
  // Инициализируем query из localStorage, если оно есть
  const [query, setQuery] = useState<string>(() => {
    return localStorage.getItem("searchQuery") || "";
  });
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    localStorage.setItem("searchQuery", value); // Сохраняем введённое значение в localStorage
  };

  const handleSearch = () => {
    if (query) {
      // Переход на страницу с результатами
      navigate(`/search-results?query=${encodeURIComponent(query)}`);
      // Удаляем query из localStorage
      localStorage.removeItem("searchQuery");
      // Закрываем окно поиска
      toggleSearch();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search">
      <div className="search__logo">
        <img src={logo} alt="site logo" className="search__logo-img" />
      </div>

      <div className="search__input">
        <div className="search__input-icon-wrapper">
          <img
            src={search_icon}
            alt="search_icon"
            className="search__input-icon"
            onClick={handleSearch}
          />
        </div>
        <div className="search__input-wrapper-text">
          <input
            ref={inputRef}
            type="text"
            className="search__input-text"
            placeholder="Пошук..."
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="search__input-icon-wrapper">
          <img
            src={close_icon}
            alt="close_icon"
            className="search__input-icon"
            onClick={toggleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
