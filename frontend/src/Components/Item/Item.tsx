import "./Item.scss";
import heart_icon from "../assets/img/icons/heart.svg";
import fill_heart_icon from "../assets/img/icons/heart-filled.svg";
import { useState, useEffect } from "react";
import { useFavorites } from "../../Context/FavoritesContext";

interface ItemProps {
  vendor_code: number;
  image: string;
  category: string;
  name: string;
  price: number;
  discount_price?: number;
  isNew?: boolean;
}

const Item: React.FC<ItemProps> = ({
  vendor_code,
  image,
  category,
  name,
  price,
  discount_price,
  isNew,
}) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.some((item: { vendor_code: number; }) => item.vendor_code === vendor_code));
  }, [favorites, vendor_code]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite) {
      removeFromFavorites(vendor_code);
    } else {
      addToFavorites({
        vendor_code,
        image,
        category,
        name,
        price,
        discount_price,
      });
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <a href={`/product/${vendor_code}`} className="item">
      <div className="item__image-container">
        <img src={image} alt="item image" className="item__image" />
        {isNew && <span className="item__new">NEW</span>}

        <button className="item__favorite" onClick={toggleFavorite}>
          {isFavorite ? (
            <img
              src={fill_heart_icon}
              alt="Filled heart icon"
              className="item__favorite-icon"
            />
          ) : (
            <img
              src={heart_icon}
              alt="Heart icon"
              className="item__favorite-icon"
            />
          )}
        </button>
      </div>
      <div className="item__info">
        <p className="item__category">{category}</p>
        <p className="item__name" title={name}>
          {name}
        </p>
        <div className="item__prices">
          {discount_price ? (
            <>
              <div className="item__price-new">{discount_price} грн</div>
              <div className="item__price-old">{price} грн</div>
            </>
          ) : (
            <div className="item__price-new">{price} грн</div>
          )}
        </div>
      </div>
    </a>
  );
};

export default Item;
