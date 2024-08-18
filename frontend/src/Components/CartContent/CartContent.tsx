import { useEffect, useState } from "react";
import { fetchDataItem } from "../../api/fetchDataItem";
import { useCartItems } from "../../Context/CartContext";
import "./CartContent.scss";
import CartContentItem from "./CartContentItem";

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
        if (cartItem.vendor_code) {
          try {
            const result = await fetchDataItem(cartItem.vendor_code);
            const item = result[0];

            if (item) {
              const itemTotalPrice = +cartItem.count * (item.price2 || item.price);
              newTotalPrice += itemTotalPrice;

              if (item.price2) {
                const discountForItem = +cartItem.count * (item.price - item.price2);
                newTotalDiscount += discountForItem;
              }
            }
          } catch (error: any) {
            console.error("Error fetching item:", error.message);
          }
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
        <div className="cart__items">
          {cartItems.map((cartItem, index) => {
            let key = cartItem.id
            if (cartItem.id && cartItem.size) {
              key = cartItem.id + cartItem.size;
            }

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
                    <div className="cart__greytext">-{totalDiscount} грн</div>
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
          <button className="cart__button">Оформити замовлення</button>
        </div>
      </div>
    </div>
  );
};

export default CartContent;
