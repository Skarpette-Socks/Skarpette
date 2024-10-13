import React from "react";
import "./CheckoutOrder.scss";

interface CheckoutOrderPhoneProps {
  totalPrice: number,
  totalDiscount: number
}


const CheckoutOrderPhone: React.FC<CheckoutOrderPhoneProps> = ({ totalPrice, totalDiscount }) => {
  
  return (
    <>
      <div className="checkout-order checkout__order-phone">
      <div className="checkout-order__summary">
        <div className="checkout-order__to-pay">
          <div className="checkout-order__order-title">Разом:</div>
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
              За тарифами пошти
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default CheckoutOrderPhone;