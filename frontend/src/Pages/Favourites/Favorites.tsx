import React from "react";
import { useFavorites } from "../../Context/FavoritesContext";
import Item from "../../Components/Item/Item"; // импортируйте ваш компонент Item
import "./Favorites.scss";
import PageNavigation from "../../Components/PageNavigation/PageNavigation";
import MainPageListGoods from "../../Components/MainPageListGoods/MainPageListGoods";

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();


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
      <MainPageListGoods title="Вам може сподобатись" catalogButton={false} />
    </>
  );
};

export default Favorites;
