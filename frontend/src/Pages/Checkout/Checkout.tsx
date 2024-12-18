import CheckoutOrderMain from "./CheckoutComponents/CheckoutOrder/CheckoutOrderMain";
import CheckoutOrderPhone from "./CheckoutComponents/CheckoutOrder/CheckoutOrderPhone";
import CheckoutPayment from "./CheckoutComponents/CheckoutPayment/CheckoutPayment";
import CheckoutReceiver from "./CheckoutComponents/CheckoutReceiver/CheckoutReceiver";
import ContactInfo from "./CheckoutComponents/ContactInfo/ContactInfo";
import Delivery from "./CheckoutComponents/Delivery/Delivery";
import arrowLeft from "../../assets/img/icons/arrow-left.svg";
import logo from "../../assets/img/icons/logo-green.svg";

import { useCartItems } from "../../Context/CartContext";
import "./Checkout.scss";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FooterMinorInfo from "../../App/AppComponents/Footer/FooterMinorInfo";
import { fetchAllData } from "../../api/fetchAllData";
import DataItem from "../../types/DataItem";
import CommentInput from "./CheckoutComponents/CommentInput/CommentInput";
import { toast } from "react-toastify";

interface ContactInfoRef {
  isValid: () => boolean;
  getName: () => string;
  getSurname: () => string;
  getPhone: () => string;
  getMail: () => string;
}

interface ReceiverInfoRef {
  isValid: () => boolean;
  getName: () => string;
  getSurname: () => string;
  getPhone: () => string;
}

interface DeliveryRef {
  isValid: () => boolean;
  getCity: () => string;
  getBuilding: () => string;
  getFlat: () => string;
  getWarehouseUkrPost: () => string;
  getWarehouseNovaPost: () => string;
  getStreet: () => string;
}

interface CommentRef {
  isValid: () => boolean;
  getComment: () => string;
}

interface PaymentRef {
  getPaymentType: () => string;
}

interface Items {
  skarpetteVendorCode: number,
  size: string,
  quantity: number | ''
}

const ReceiverOption = {
  SELF:'self-receiver',
  ANOTHER: 'another-receiver'
}

const Checkout = () => {
  const { cartItems, deleteCartItem } = useCartItems();
  const isItemsDeleted = useRef<boolean>(false);
  const [underBurronError, setUnderButonError] = useState<string>('');

  // #region CheckoutOrderRegion
  const navigate = useNavigate();

  let newTotalPrice = 0;
  let newTotalDiscount = 0;

  for (const cartItem of cartItems) {
    try {
      if (cartItem) {
        const itemTotalPrice =
          +cartItem.count * (cartItem.price2 || cartItem.price);
        newTotalPrice += itemTotalPrice;

        if (cartItem.price2) {
          const discountForItem =
            +cartItem.count * (cartItem.price - cartItem.price2);
          newTotalDiscount += discountForItem;
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching item:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  }

  const totalPrice = parseFloat(newTotalPrice.toFixed(2));
  const totalDiscount = parseFloat(newTotalDiscount.toFixed(2));

  useEffect(() => {
    const isPriceValid = () => totalPrice >= 500;

    if (!isPriceValid()) {
      setUnderButonError("Мінімальна сума замовлення 500грн");
    } else {
      setUnderButonError('');
    }
  }, [totalPrice]);

  // #endregion

  const [selectedOption, setSelectedOption] = useState(ReceiverOption.SELF);
  const [selectedDeliveryType, setSelectedDeliveryType] =
    useState<string>("nova-poshta-office");

  let customerData = {};
  let recipientData = {};
  let deliveryData = {};
  let comment = '';

  const contactInfoRef = useRef<ContactInfoRef>(null);
  const receiverInfoRef = useRef<ReceiverInfoRef>(null);
  const commentRef = useRef<CommentRef>(null);
  const deliveryRef = useRef<DeliveryRef>(null);
  const paymentTypeRef = useRef<PaymentRef>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [handleDialog, setHandleDialog] = useState<boolean>(false);

  const availabilityCheck = async () => {
    let socksDb: DataItem[] = [];

    setLoading(true);
    try {
      socksDb = await fetchAllData();
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
    
    const unavailableItems = cartItems.filter((cartItem, index) => {
      const matchedItem = socksDb
        .find(dbItem => cartItem.vendor_code === dbItem.vendor_code);
      if(!matchedItem || !matchedItem.is_in_stock) { 
        deleteCartItem(index);
        isItemsDeleted.current = true;
        return true;
      }

      const sizeItem = matchedItem.size.find(curSize => curSize.size === cartItem.size);
      if (!sizeItem || !sizeItem.is_available) {
        deleteCartItem(index);
        isItemsDeleted.current = true;
        return true;
      }

      return false;
    });

    console.log('unavailableItems', unavailableItems)

    return unavailableItems.length === 0;
  }

  const handleCheckout = async () => {
    setHandleDialog(!await availabilityCheck())
    let isValidContactInfo = false;
    let isValidReceiverInfo = false;
    let isValidDeliveryRef = false;
    if (selectedOption === ReceiverOption.ANOTHER && receiverInfoRef.current) {
      isValidReceiverInfo = receiverInfoRef.current.isValid();
    } else {
      isValidReceiverInfo = true;
    }
    if (deliveryRef.current) {
      isValidDeliveryRef = deliveryRef.current.isValid();
    }

    if (contactInfoRef.current) {
      isValidContactInfo = contactInfoRef.current.isValid();
    }

    if (isValidContactInfo && isValidReceiverInfo && isValidDeliveryRef) {
      customerData = {
        firstName: contactInfoRef.current?.getName(),
        lastName: contactInfoRef.current?.getSurname(),
        phoneNumber: contactInfoRef.current?.getPhone(),
        email: contactInfoRef.current?.getMail(),
      };
      if (selectedOption === ReceiverOption.ANOTHER) {
        recipientData = {
          firstName: receiverInfoRef.current?.getName(),
          lastName: receiverInfoRef.current?.getSurname(),
          phoneNumber: receiverInfoRef.current?.getPhone(),
        };
      } else {
        recipientData = false
      }
      switch (selectedDeliveryType) {
        case "nova-poshta-office":
          deliveryData = {
            deliveryType: "НПВідділення",
            city: deliveryRef.current?.getCity(),
            departmentNumber: deliveryRef.current?.getWarehouseNovaPost(),
          };
          break;
        case "nova-poshta-courier":
          deliveryData = {
            deliveryType: "НПКур'єр",
            city: deliveryRef.current?.getCity(),
            street: deliveryRef.current?.getStreet(),
            houseNumber: deliveryRef.current?.getBuilding(),
            apartmentNumber: deliveryRef.current?.getFlat(),
          };
          break;
        case "nova-poshta-poshtamat":
          deliveryData = {
            deliveryType: "НППоштомат",
            city: deliveryRef.current?.getCity(),
            departmentNumber: deliveryRef.current?.getWarehouseNovaPost(),
          };
          break;
        case "ukrposhta-office":
          deliveryData = {
            deliveryType: "УПВідділення",
            city: deliveryRef.current?.getCity(),
            departmentNumber: deliveryRef.current?.getWarehouseUkrPost(),
          };
          break;
        default:
          break;
      }

      if (commentRef.current && commentRef.current.isValid()) {
        comment = commentRef.current.getComment();
      }
      if (
        !Object.values(customerData).includes('') && 
        !Object.values(deliveryData).includes('') &&
        isItemsDeleted.current === false
      ) {
        postData();
        console.log("posted");
      } else {
        isItemsDeleted.current = false;
        console.log('Заповніть усі поля або спробуйте ще раз');
      }
    } else {
      console.log("Форма не пройшла валідацію");
    }
  
    console.log('customerData', customerData);
    console.log('deliveryData', deliveryData);
    console.log('comment', comment)
    console.log('')
  };

  const postData = async () => {
    console.log(cartItems)
    const items: Items[] = [];

    cartItems.map((cartItem) => {
      items.push({
        skarpetteVendorCode: cartItem.vendor_code,
        size: cartItem.size,
        quantity: cartItem.count
      });
    });
    
    const isDifferentRecipient = selectedOption === ReceiverOption.ANOTHER;
    const paymentType = paymentTypeRef.current?.getPaymentType();
    
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          customerData,
          deliveryData,
          paymentType,
          recipientData,
          isDifferentRecipient,
          comment,
          totalPrice
        }),
      });

      if (response.ok) {
        console.log("Дані успішно відправлені!");
        const responseData = await response.json();
        console.log('Дані з відповіді:', responseData.orderNumber);
        navigate("/success-order", {
          state: { orderNumber: responseData.orderNumber },
        });
      } else {
        console.error("Помилка при відправці даних");
        toast.error("Помилка при відправці даних", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Сталася помилка:", error);
      toast.error(`Сталася помилка: ${error}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout">
      <div className="checkout__header">
        <div className="checkout__header-info">
          <div className="checkout__header-title">Оформлення замовлення</div>
          <a href="/cart" className="checkout__header-back">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              className="checkout__header-back-arrow"
            />
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
        <ContactInfo ref={contactInfoRef} />
        <Delivery
          ref={deliveryRef}
          selectedDeliveryType={selectedDeliveryType}
          setSelectedDeliveryType={setSelectedDeliveryType}
        />
        <CheckoutPayment 
          ref={paymentTypeRef}
        />
        <CheckoutReceiver
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          ref={receiverInfoRef}
        />
        <CheckoutOrderPhone
          totalPrice={totalPrice}
          totalDiscount={totalDiscount}
        />

        <CommentInput 
          ref={commentRef}
        />
      </div>

      <button 
        className={`checkout__button ${loading || underBurronError ? 'disabled' : ''}`}
        onClick={handleCheckout}
        disabled={loading}
      >
        Створити замовлення
      </button>
      {underBurronError && (
        <p className="checkout__button-error">
          {underBurronError}
        </p>
      )}

      {handleDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog__content">
              <h1>Кошик оновився</h1>
              <h3>Деяких товарів немає в наявності</h3>
              <button 
                className="dialog__button" 
                onClick={() => setHandleDialog(false)}
              >
                OК
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="checkout__footer">
        <FooterMinorInfo />
      </div>
    </div>
  );
};

export default Checkout;
