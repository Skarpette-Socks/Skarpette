/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useCartItems } from "../../../../Context/CartContext";
import "./CartContent.scss";
import CartContentItem from "./CartContentItem";
import { Link } from "react-router-dom";

import no_cart from '../../../../Components/assets/img/NoItemsCart.svg';

const CartContent: React.FC = () => {
  const { cartItems } = useCartItems();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTotalPrice(0);
    setTotalDiscount(0);
    setLoading(true);

    const calculatePrices = async () => {
      let newTotalPrice = 0;
      let newTotalDiscount = 0;

      for (const cartItem of cartItems) {
        try {
          if (cartItem) {
            const itemTotalPrice = +cartItem.count * (cartItem.price2 || cartItem.price);
            newTotalPrice += itemTotalPrice;

            if (cartItem.price2) {
              const discountForItem = +cartItem.count * (cartItem.price - cartItem.price2);
              newTotalDiscount += discountForItem;
            }
          }
        } catch (error: any) {
          console.error("Error fetching item:", error.message);
        }
      }
      
      setTotalPrice(parseFloat(newTotalPrice.toFixed(2)));
      setTotalDiscount(parseFloat(newTotalDiscount.toFixed(2)));
      setLoading(false);
    };
    
    calculatePrices();
  }, [cartItems]);

  return (
    <div className="cart">
      <div className="cart__container">
        <div className="cart__title">Ваш кошик</div>
        {cartItems.length ? (
          <>
            <div className="cart__items">
              {cartItems.map((cartItem, index) => {
                const key = cartItem.vendor_code + cartItem.size;

                return (
                  <CartContentItem
                    key={key}
                    cartItem={cartItem}
                    index={index}
                    priceLoading={loading}
                  />
                );
              })}
            </div>
            <div className="cart__order">
              <div className="cart__info">
                {loading ? (
                  <div className="">Раухємо...</div>
                ) : (
                  <>
                    <div className="cart__to-pay">
                      <div className="cart__order-title">Всього:</div>
                      <div className="cart__price">{totalPrice} грн</div>
                    </div>
                    {totalDiscount > 0 && (
                      <div className="cart__disc">
                        <div className="cart__text">Знижка</div>
                        <div className="cart__greytext">
                          -{totalDiscount} грн
                        </div>
                      </div>
                    )}
                  </>
                )}
                <div className="cart__delivery">
                  <div className="cart__text">Доставка</div>
                  <div className="cart__greytext">
                    Розраховується під час оформлення товарів
                  </div>
                </div>
              </div>
              <Link to="/checkout">
                <button className="cart__button">
                  <div className="cart__button-text">Оформити замовлення</div>
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div className="cart__no-item">
            <img
              src={no_cart}
              alt="no_fav"
              className="cart__no-item-img"
            />
            <h3 className="cart__no-item-main-text">Кошик порожній</h3>
            <p className="cart__no-item-paragraph">
              Кошик нудьгує на самоті... час це змінити :)
            </p>
            <Link to="/catalog/all-socks">
              <button className="cart__no-item-button">
                Перейти до каталогу
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartContent;
