import CheckoutOrderMain from "../../Components/CheckoutOrder/CheckoutOrderMain";
import CheckoutOrderPhone from "../../Components/CheckoutOrder/CheckoutOrderPhone";
import CheckoutPayment from "../../Components/CheckoutPayment/CheckoutPayment";
import CheckoutReceiver from "../../Components/CheckoutReceiver/CheckoutReceiver";
import ContactInfo from "../../Components/ContactInfo/ContactInfo";
import Delivery from "../../Components/Delivery/Delivery";
import visa from "../../Components/assets/img/icons/visa.svg";
import mastercard from "../../Components/assets/img/icons/mastercard.svg";
import fondy from "../../Components/assets/img/icons/fondy.svg";
import arrowLeft from '../../Components/assets/img/icons/arrow-left.svg';
import logo from '../../Components/assets/img/icons/logo-green.svg';

import { useCartItems } from "../../Context/CartContext";
import "./Checkout.scss";

const Checkout = () => {
  // #region CheckoutOrderRegion
  const { cartItems } = useCartItems();

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
  
  const totalPrice = parseFloat(newTotalPrice.toFixed(2));
  const totalDiscount = parseFloat(newTotalDiscount.toFixed(2));
  // #endregion
 
  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: cartItems,
        }),
      });

      if (response.ok) {
        console.log('Дані успішно відправлені!');
      } else {
        console.error('Помилка при відправці даних');
      }
    } catch (error) {
      console.error('Сталася помилка:', error);
    }
  };

  return (
    <div className="checkout">
      <div className="checkout__header">
        <div className="checkout__header-info">
          <div className="checkout__header-title">Оформлення замовлення</div>
          <a href="/cart" className="checkout__header-back">
            <img src={arrowLeft} alt="arrowLeft" className="checkout__header-back-arrow" />
            <span className="checkout__header-back-text"> Назад до кошика</span>
          </a>
        </div>
        <img src={logo} alt="logo" className="checkout__header-logo" />
      </div>

      <div className="checkout__order">
        <CheckoutOrderMain 
          cartItems={cartItems}
          totalPrice={totalPrice}
          totalDiscount={totalDiscount}
        />
      </div>
      <div className="checkout__delivery">
        <ContactInfo />
        <Delivery />
        <CheckoutPayment />
        <CheckoutReceiver />
        <CheckoutOrderPhone 
          totalPrice={totalPrice}
          totalDiscount={totalDiscount}
        />
      </div>
      <button className="checkout__button" onClick={handleCheckout}>
        Оплатити замовлення
      </button>
      <div className="checkout__footer footer__minor-info">
        <div className="footer__greyline"></div>

        <div className="footer__company-name">
          ©2024 Scarpette Socks
        </div>

        <div className="footer__terms-privacy-container">
          <a href="/privacy-policy" className="footer__privacy-link">
            Політика&nbsp;конфіденційності
          </a>

          <a href="/privacy-policy" className="footer__terms-link">
            Умови&nbsp;використання
          </a>
        </div>

        <div className="footer__payment-logos">
          <img src={visa} alt="visa logo" className="footer__visa-logo" />
          <img src={mastercard} alt="mastercard logo" className="footer__mastercard-logo" />
          <img src={fondy} alt="fondy logo" className="footer__fondy-logo" />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
