import React, { useState } from "react";
import "./ProductOrder.scss";

import productImage from "../assets/img/velo_rezym_01.png";
import product2 from "../assets/img/product2.png";
import product3 from "../assets/img/product3.png";
import product4 from "../assets/img/product4.png";
import product5 from "../assets/img/product5.png";

import chevronLeft from "../assets/img/icons/chevron-left.svg";
import chevronRight from "../assets/img/icons/chevron-right.svg";


import heart from "../assets/img/icons/heart.svg";
import plus from "../assets/img/icons/plus.svg";
import close from "../assets/img/icons/close.svg";
import ProductSizeButton from "./ProductSizeButton";
import ProductImages from "./ProductImages";
import ProductImageCircle from "./ProductImageCircle";
import ProductZoom from "./ProductZoom";

interface Props {
  name: string;
}

const ProductOrder: React.FC<Props> = ({ name }) => {
  const [descriptionOpened, setDescriptionOpened] = useState(false);
  const [warehouseOpened, setWarehouseOpened] = useState(false);
  const [paymentOpened, setPaymentOpened] = useState(false);
  const [zoomImageOpened, setZoomImageOpened] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number>(0);
  
  
  
  const imgArr = [productImage, product2, product3, product4, product5];

  const article = "0883291";
  const price = 120;

  const sizeButtons = [
    {
      size: "25-27",
      disabled: false,
    },
    {
      size: "27-29",
      disabled: false,
    },
    {
      size: "29-31",
      disabled: true,
    },
  ];

  const selectPhoto = ( num:number ) => {
    if (num >= 1) {
      if (selectedPhoto >= imgArr.length - 1) {
        setSelectedPhoto(0);

        return;
      }
    } else {
      if (selectedPhoto === 0) {
        setSelectedPhoto(imgArr.length - 1);

        return;
      }
    }

    setSelectedPhoto(selectedPhoto + num);
  }

  const handleZoom = () => {
    if (window.innerWidth >= 768) {
      setZoomImageOpened(true)
    }
  }

  return (
    <div className="product">
      {zoomImageOpened && 
        <ProductZoom 
          isOpen={setZoomImageOpened}
          selectedPhoto={selectedPhoto}
          imgArr={imgArr}
        />
      }
      <div className="product__container">
        <div className="product__images">
          <div className="product__main-image">
            <div className="product__image-container">
              <img
                src={imgArr[selectedPhoto]}
                alt="product image"
                onClick={handleZoom}
              />

              {imgArr.length > 1 && 
                <div className="product__image-circle-container">
                  {imgArr.map((item, index) => (
                    <ProductImageCircle 
                      key={item} 
                      index={index}
                      selectedPhoto={selectedPhoto}
                    />
                  ))}
                </div>
              }

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
          <div className="product__article">Артикул {article}</div>
          <h1 className="product__title">{name}</h1>
          <div className="product__price">{price} грн</div>
          <div className="product__price-detail">
            Без урахування ціни доставки
          </div>

          {false && <div className="product__colors-container">Колір:</div>}

          <div className="product__sizes-container">
            <div className="product__sizes-title">Розмір:</div>

            <div className="product__sizes-buttons">
              {sizeButtons.map((size, index) => (
                <ProductSizeButton
                  button={size}
                  key={index}
                  index={index}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
              ))}
            </div>
          </div>

          <div className="product__buttons-cart-fav">
            <button className="product__add-to-cart">Додати у кошик</button>
            <button className="product__add-to-fav">
              <img src={heart} className="product__heart-img"></img>
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
                    <img src={close} alt="Minus" />
                  ) : (
                    <img src={plus} alt="Plus" />
                  )}
                </span>
              </div>

              {descriptionOpened && (
                <div className="product__dropdown-text">
                  Тут буде опис товару
                </div>
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
                  Тут буде склад товару
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
