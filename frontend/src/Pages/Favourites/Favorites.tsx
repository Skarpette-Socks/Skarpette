import React from "react";
import { useFavorites } from "../../Context/FavoritesContext";
import Item from "../../Components/Item/Item"; // импортируйте ваш компонент Item
import "./Favorites.scss";
import PageNavigation from "../../Components/PageNavigation/PageNavigation";

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <p className="favorites__text favorites__text--error">No items</p>;
  }

  return (
    <>
      <PageNavigation linkText="Обране" homeLink="/" linkHref="/favorites" />
      <div className="favorites">
        <h1 className="favorites__title">Обрані товари</h1>
        <p className="favorites__text">
          Тут зібрані товари, які ви зберегли на майбутнє. Щоб видалити товар із
          обраного, просто натисніть на серденько на ньому :)
        </p>
        <div className="favorites__items">
          {favorites.map((item) => (
            <Item key={item.vendor_code} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Favorites;
