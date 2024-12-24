import "./Item.scss";
import heartIcon from "../../assets/img/icons/heart.svg";
import fillHeartIcon from "../../assets/img/icons/heart-filled.svg";
import { useState, useEffect } from "react";
import { useFavorites } from "../../Context/FavoritesContext";
import { Link } from "react-router-dom";

interface ItemProps {
  vendor_code: number;
  image: string;
  category: string;
  name: string;
  price: number;
  discount_price?: number;
  isNew?: boolean;
  discountPercentage?: number;
  is_in_stock: boolean
}

const Item: React.FC<ItemProps> = ({
  vendor_code,
  image,
  category,
  name,
  price,
  discount_price,
  isNew,
  discountPercentage,
  is_in_stock,
}) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  let categoryName = '';

  switch (category) {
    case 'Women':
      categoryName = 'Жіночі';
      break;
    case 'Men':
      categoryName = 'Чоловічі';
      break;
    case 'Child':
      categoryName = 'Дитячі';
      break;

    default:
      categoryName = '';
      break;
  } 

  useEffect(() => {
    setIsFavorite(favorites.some((item) => item.vendor_code === vendor_code));
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
    setIsFavorite((prev) => !prev);
  };

  return (
    <Link to={`/product/${vendor_code}`} className="item">
      <div className="item__image-container">
        <img 
          src={image} 
          alt={name} 
          className={`item__image ${!is_in_stock ? 'out-of-stock' : ''}`} 
          loading="lazy"
        />

        <div className="item__info-buttons">
          {isNew && <span className="item__new">NEW</span>}

          {discountPercentage !== undefined && discountPercentage > 0 && (
            <span className="item__discount">-{discountPercentage}%</span>
          )}
        </div>
        {!is_in_stock && <span className="item__out-of-stock">Немає в наявності</span>}

        <button className="item__favorite" onClick={toggleFavorite}>
          <img
            src={isFavorite ? fillHeartIcon : heartIcon}
            alt={isFavorite ? "Filled heart icon" : "Heart icon"}
            className="item__favorite-icon"
          />
        </button>
      </div>

      <div className="item__info">
        <p className="item__category">{categoryName}</p>
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
    </Link>
  );
};

export default Item;
