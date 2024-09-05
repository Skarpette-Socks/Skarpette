import CheckoutOrderMain from "../../Components/CheckoutOrder/CheckoutOrderMain";
import CheckoutOrderPhone from "../../Components/CheckoutOrder/CheckoutOrderPhone";
import CheckoutPayment from "../../Components/CheckoutPayment/CheckoutPayment";
import CheckoutReceiver from "../../Components/CheckoutReceiver/CheckoutReceiver";
import ContactInfo from "../../Components/ContactInfo/ContactInfo";
import Delivery from "../../Components/Delivery/Delivery";
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
 
  return (
    <div className="checkout">
      <div className="checkout__delivery">
        <CheckoutOrderMain 
          cartItems={cartItems}
          totalPrice={totalPrice}
          totalDiscount={totalDiscount}
        />
        <ContactInfo />
        <Delivery />
        <CheckoutPayment />
        <CheckoutReceiver />
        <CheckoutOrderPhone 
          totalPrice={totalPrice}
          totalDiscount={totalDiscount}
        />
      </div>
    </div>
  );
};

export default Checkout;
