import logo from "../assets/img/icons/logo-black.svg";
import search_icon from "../assets/img/icons/search.svg";
import close_icon from "../assets/img/icons/close.svg";

import "./Search.scss";

interface SearchProps {
  toggleSearch: () => void; // Пропс для переключения состояния поиска
}

const Search: React.FC<SearchProps> = ({ toggleSearch }) => {
  return (
    <div className="search">
      <div className="search__logo">
        <img
          src={logo}
          alt="site logo"
          className="search__logo-img"
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className="search__input">
        <div className="search__input-icon-wrapper">
          <img
            src={search_icon}
            alt="search_icon"
            className="search__input-icon"
          />
        </div>
        <div className="search__input-wrapper-text">
          <input
            type="text"
            className="search__input-text"
            placeholder="Пошук..."
          />
        </div>
        <div className="search__input-icon-wrapper">
          <img
            src={close_icon}
            alt="close_icon"
            className="search__input-icon"
            style={{ cursor: "pointer" }}
            onClick={toggleSearch} // Обработчик для закрытия поиска
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
