import ContactInfo from "../../Components/ContactInfo/ContactInfo";
import Delivery from "../../Components/Delivery/Delivery";
import "./Checkout.scss";

const Checkout = () => {
  return (
    <div className="checkout">
      <div className="checkout__delivery">
        <ContactInfo />
        <Delivery />
      </div>
    </div>
  );
};

export default Checkout;
