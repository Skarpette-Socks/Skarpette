import React, { useState } from "react";
import "./CheckoutOrder.scss";
import CartItem from "../../types/CartItem";

interface CheckoutOrderMainProps {
  cartItems: CartItem[]
  totalPrice: number,
  totalDiscount: number
}

const CheckoutOrderMain: React.FC<CheckoutOrderMainProps> = ({ cartItems, totalPrice, totalDiscount }) => {
  const countItems = cartItems.reduce((sum, item) => {
    const count = item.count ? item.count : 0;
    return sum + count;
  }, 0);

  return (
    <div className="checkout-order checkout-order-main">
      <div className="checkout-order__goods-text">
        <div className="checkout-order__text">Товари</div>
        <div className="checkout-order__greytext">{countItems} шт.</div>
    </div>
      <div className="checkout-order__goods">
        {cartItems.map((cartItem) => {  
          const {  
            image,
            name,
            type,
            price,
            price2,
            size,
            count
          } = cartItem;
          return (
            <div className="checkout-order__item">
              <div className="checkout-order__item-img-inf">
                <img src={image} alt={name} className="checkout-order__image"/>
                <div className="checkout-order__item-info">
                  <h3 className="checkout-order__name">{name}</h3>
                  <div className="checkout-order__minor-info">
                    <div className="checkout-order__category">
                      {type}
                    </div>
                    <div className="checkout-order__size">
                      {size}
                    </div>
                    <div className="checkout-order__count">
                      {count} ШТ.
                    </div>
                  </div>
                </div>
              </div>
              <div className="checkout-order__item-prices">
                {price2 ? (
                  <>  
                    <div className="checkout-order__item-price">{price2} грн</div>
                    <div className="checkout-order__item-price-old">{price} грн</div>
                  </>
                  ) : (
                    <div className="checkout-order__item-price">{price} грн</div>
                )}
              </div>
            </div>
          )
        })} 
      </div>
      <div className="checkout-order__summary">
        <div className="checkout-order__to-pay">
          <div className="checkout-order__order-title">Всього:</div>
          <div className="checkout-order__price">{totalPrice} грн</div>
        </div>

        <div className="checkout-order__info">
          {totalDiscount > 0 && (
            <>
              <div className="checkout-order__dishes">
                <div className="checkout-order__text">Товарів</div>
                <div className="checkout-order__greytext">{totalPrice + totalDiscount} грн</div>
              </div>
              <div className="checkout-order__disc">
                <div className="checkout-order__text">Знижка</div>
                <div className="checkout-order__greytext">-{totalDiscount} грн</div>
              </div>
            </>
          )}
          <div className="checkout-order__delivery">
            <div className="checkout-order__text">Доставка</div>
            <div className="checkout-order__greytext">
              Розраховується під час оформлення товарів
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutOrderMain;