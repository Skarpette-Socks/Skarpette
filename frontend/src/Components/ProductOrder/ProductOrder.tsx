/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";
import "./ProductOrder.scss";

import chevronLeft from "../assets/img/icons/chevron-left.svg";
import chevronRight from "../assets/img/icons/chevron-right.svg";

import heartIcon from "../assets/img/icons/heart.svg";
import fillHeartIcon from "../assets/img/icons/heart-filled.svg";

import plus from "../assets/img/icons/plus.svg";
import close from "../assets/img/icons/close.svg";
import ProductSizeButton from "./ProductSizeButton";
import ProductImages from "./ProductImages";
import ProductImageCircle from "./ProductImageCircle";
import ProductZoom from "./ProductZoom";
import DataItem from "../../types/DataItem";
import { useFavorites } from "../../Context/FavoritesContext";
import { useCartItems } from "../../Context/CartContext";
import CounterButtonProduct from "../CounterButton/CounterButtonProduct";
import FavoriteItem from "../../types/FavoriteItem";
import CartItem from "../../types/CartItem";

interface Props {
  item: DataItem;
}

const ProductOrder: React.FC<Props> = ({ item }) => {
  const [descriptionOpened, setDescriptionOpened] = useState(false);
  const [warehouseOpened, setWarehouseOpened] = useState(false);
  const [paymentOpened, setPaymentOpened] = useState(false);
  const [zoomImageOpened, setZoomImageOpened] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | undefined>();
  const [imgHeight, setImgHeight] = useState(0);
  const [counter, setCounter] = useState<number | "">(1);
  const productImage = useRef<HTMLImageElement>(null);

  const imgArr = item?.images_urls;

  useEffect(() => {
    if (productImage.current) {
      const handleResize = () => {
        const imgWidth = productImage.current!.offsetWidth;
        setImgHeight(imgWidth + imgWidth / 8);
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [productImage.current]);

  if (!imgArr || !item) {
    return (
      <>
        <h1 style={{ textAlign: "center", margin: "50px" }}>
          <strong>Щось пішло не так ;&#40;</strong>
        </h1>
      </>
    );
  }

  const selectPhoto = (num: number) => {
    if (num >= 1) {
      if (selectedPhoto >= imgArr.length - 1) {
        setSelectedPhoto(0);

        return;
      }
    } else {
      if (selectedPhoto <= 0) {
        setSelectedPhoto(imgArr.length - 1);

        return;
      }
    }

    setSelectedPhoto(selectedPhoto + num);
  };

  const handleZoom = () => {
    if (window.innerWidth >= 768) {
      setZoomImageOpened(true);
    }
  };

  const setSize = (index: number, is_available: boolean) => {
    if (is_available) {
      if (index === selectedSize) {
        setSelectedSize(undefined);
      } else {
        setSelectedSize(index);
      }
    }
  };

  const { addToFavorites, removeFromFavorites, favorites } = useFavorites();

  const isFavorite = favorites.some(
    (favoriteItem) => favoriteItem.vendor_code === item.vendor_code
  );

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(item.vendor_code);
    } else {
      const newItem: FavoriteItem = {
        vendor_code: item.vendor_code,
        image: item.images_urls[0],
        category: item.type,
        name: item.name,
        price: item.price,
        discount_price: item.price2,
      }
      addToFavorites(newItem);
    }
  }; 

  const { cartItems, addCartItem } = useCartItems();
  const [cartItem, setCartItem] = useState<CartItem | undefined>();
  
  useEffect(() => {
    
    if (selectedSize !== undefined) {
      setCartItem(
        cartItems.find((cartItem) => {
        const cartItemKey = cartItem.vendor_code + cartItem.size;
        const itemKey = item.vendor_code + item.size[selectedSize].size;
        
        if (cartItem.count !== '') {
          return (cartItemKey === itemKey);
        }
      }))
    } else {
      setCartItem(undefined);
    }
  }, [selectedSize, cartItems])


  return (
    <div className="product">
      {zoomImageOpened && (
        <ProductZoom
          isOpen={setZoomImageOpened}
          selectedPhoto={selectedPhoto}
          imgArr={imgArr}
        />
      )}
      <div className="product__container">
        <div className="product__images">
          <div
            className="product__image-container"
            style={{ height: `${imgHeight}px` }}
          >
            <img
              ref={productImage}
              src={imgArr[selectedPhoto]}
              alt="product image"
              onClick={handleZoom}
              style={{ height: `${imgHeight}px` }}
            />

            {imgArr.length > 1 && (
              <div className="product__image-circle-container">
                {imgArr.map((item, index) => (
                  <ProductImageCircle
                    key={item}
                    index={index}
                    selectedPhoto={selectedPhoto}
                  />
                ))}
              </div>
            )}

            <div
              className="product__img-button left"
              onClick={() => selectPhoto(-1)}
            >
              <img
                src={chevronLeft}
                alt="chevronLeft"
                className="product__img-button-chevron"
              />
            </div>

            <div
              className="product__img-button right"
              onClick={() => selectPhoto(1)}
            >
              <img
                src={chevronRight}
                alt="chevronRight"
                className="product__img-button-chevron"
              />
            </div>
          </div>

          <div className="product__minor-img-container">
            {imgArr.map((image, index) => (
              <ProductImages
                image={image}
                key={index}
                index={index}
                selectedPhoto={selectedPhoto}
                setSelectedPhoto={setSelectedPhoto}
              />
            ))}
          </div>
        </div>

        <div className="product__info">
          <div className="product__article">Артикул {item.vendor_code}</div>
          <h1 className="product__title">{item.name}</h1>
          {item.price2 ? (
            <>
              <div className="product__price">{item.price2} грн</div>
              <div className="product__price-old">{item.price} грн</div>
            </>
          ) : (
            <div className="product__price">{item.price} грн</div>
          )}
          <div className="product__price-detail">
            Без урахування ціни доставки
          </div>

          {false && <div className="product__colors-container">Колір:</div>}

          <div className="product__sizes-container">
            <div className="product__sizes-title">Розмір(см):</div>

            <div className="product__sizes-buttons">
              {item.size.map((size, index) => (
                <ProductSizeButton
                  button={size}
                  key={index}
                  index={index}
                  selectedSize={selectedSize}
                  setSize={setSize}
                />
              ))}
            </div>

            {cartItem && (
              <div className="product__good-in-cart">
                У кошику вже {cartItem.count}шт
              </div>
            )}

          </div>

          

          <div className="product__counter">
            <div className="product__counter-title">Кількість:</div>
            <CounterButtonProduct 
              count={counter}
              setCount={setCounter}
              cartItemCount={cartItem?.count}
            />
            
            {cartItem?.count === 99 && (
              <div className="product__max-count">
                Максимальна кількість у кошику 99шт
              </div>
            )}
          </div>

          <div className="product__buttons-cart-fav">
            <button
              className={`product__add-to-cart 
                ${selectedSize === undefined || counter === 0 ? `disabled` : ``}
              `}
              onClick={() => addCartItem( item, counter, selectedSize )}
              disabled={selectedSize === undefined || counter === 0}
            >
              Додати у кошик
            </button>
            <button
              className="product__add-to-fav"
              onClick={handleFavoriteClick}
            >
              {isFavorite ? (
                <img
                  src={fillHeartIcon}
                  alt="Filled heart icon"
                  className="item__favorite-icon"
                />
              ) : (
                <img
                  src={heartIcon}
                  alt="Heart icon"
                  className="item__favorite-icon"
                />
              )}
            </button>
          </div>

          <div className="product__dropdowns">
            <div className="product__greyline"></div>

            <div
              className="product__dropdown-description"
              onClick={() => setDescriptionOpened(!descriptionOpened)}
            >
              <div className="product__dropdown-container">
                <div className="product__dropdown-description-title">Опис</div>

                <span className="product__dropdown-button">
                  {descriptionOpened ? (
                    <img src={close} alt="Close" />
                  ) : (
                    <img src={plus} alt="Open" />
                  )}
                </span>
              </div>

              {descriptionOpened && (
                <div className="product__dropdown-text">{item.description}</div>
              )}
            </div>

            <div className="product__greyline"></div>

            <div
              className="product__dropdown-warehouse"
              onClick={() => setWarehouseOpened(!warehouseOpened)}
            >
              <div className="product__dropdown-container">
                <div className="product__dropdown-description-title">
                  Склад та догляд
                </div>

                <span className="product__dropdown-button">
                  {warehouseOpened ? (
                    <img src={close} alt="Minus" />
                  ) : (
                    <img src={plus} alt="Plus" />
                  )}
                </span>
              </div>

              {warehouseOpened && (
                <div className="product__dropdown-text">
                  {item.composition_and_care}
                </div>
              )}
            </div>

            <div className="product__greyline"></div>

            <div
              className="product__dropdown-payment"
              onClick={() => setPaymentOpened(!paymentOpened)}
            >
              <div className="product__dropdown-container">
                <div className="product__dropdown-description-title">
                  Оплата та доставка
                </div>

                <span className="product__dropdown-button">
                  {paymentOpened ? (
                    <img src={close} alt="Minus" />
                  ) : (
                    <img src={plus} alt="Plus" />
                  )}
                </span>
              </div>

              {paymentOpened && (
                <div className="product__dropdown-text">
                  Оплата здійснюється через систему онлайн платежів Fondy на
                  сайті.
                  <br />
                  <br />
                  Товари надсилаються щоденно по буднях за допомогою служб
                  доставки «Нова Пошта» та Укрпошта з 10:00 до 16:30.
                </div>
              )}
            </div>

            <div className="product__greyline"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOrder;
