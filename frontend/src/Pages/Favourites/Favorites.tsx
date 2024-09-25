import React from "react";
import { useFavorites } from "../../Context/FavoritesContext";
import Item from "../../Components/Item/Item"; // импортируйте ваш компонент Item
import "./Favorites.scss";
import PageNavigation from "../../Components/PageNavigation/PageNavigation";
import MainPageListGoods from "../../Components/MainPageListGoods/MainPageListGoods";
import no_fav from '../../Components/assets/img/no selected items.svg';
import { Link } from "react-router-dom";

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();


  return (
    <>
      <PageNavigation linkText="Обране" homeLink="/" linkHref="/favorites" />
      <div className="favorites">
        <h1 className="favorites__title">Обрані товари</h1>
        {/* <p className="favorites__text">
          Тут зібрані товари, які ви зберегли на майбутнє. Щоб видалити товар із
          обраного, просто натисніть на серденько на ньому :)
        </p> */}
        <div className="favorites__items-container">
          {favorites.length > 0 ? (
            <div className="favorites__items">
              {favorites.map((item) => (
                <Item key={item.vendor_code} {...item} />
              ))}
            </div>
          ) : (
            <div className="favorites__no-item">
              <img
                src={no_fav}
                alt="no_fav"
                className="favorites__no-item-img"
              />
              <h3 className="favorites__no-item-main-text">
                Немає обраних товарів
              </h3>
              <p className="favorites__no-item-paragraph">
                Час обрати щось особливе!
              </p>
              <Link to="/catalog/all-socks">
                <button className="favorites__no-item-button">
                  Перейти до каталогу
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <MainPageListGoods title="Вам може сподобатись" catalogButton={false} />
    </>
  );
}

export default Favorites