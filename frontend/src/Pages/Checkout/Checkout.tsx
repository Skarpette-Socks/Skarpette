import Delivery from "../../Components/Delivery/Delivery";
import "./Checkout.scss";

const Checkout = () => {
  return (
    <div className="checkout">
      <div className="checkout__delivery">
        <Delivery />
      </div>
    </div>
  );
};

export default Checkout;
