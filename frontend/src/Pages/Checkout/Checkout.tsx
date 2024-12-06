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

const Checkout = () => {
  const { cartItems, deleteCartItem } = useCartItems();
  const isItemsDeleted = useRef<boolean>(false);
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
      alert("Сума замовлення має бути не менше 500 грн.");
      navigate(-1); // Повертаємо користувача до кошика
    }
  }, [totalPrice, navigate]);

  // #endregion

  const [selectedOption, setSelectedOption] = useState("self-receiver");
  const [selectedDeliveryType, setSelectedDeliveryType] =
    useState<string>("nova-poshta-office");
  let userData = {};
  let deliveryData = {};

  const contactInfoRef = useRef<ContactInfoRef>(null);
  const receiverInfoRef = useRef<ReceiverInfoRef>(null);
  const deliveryRef = useRef<DeliveryRef>(null);
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
      const matchedItem = socksDb.find(dbItem => cartItem.vendor_code === dbItem.vendor_code);
      if(!matchedItem) { 
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
    })

    console.log('unavailableItems', unavailableItems)

    return unavailableItems.length === 0;
  }

  const handleCheckout = async () => {
    // await availabilityCheck();
    setHandleDialog(!await availabilityCheck())
    let isValidContactInfo = false;
    let isValidReceiverInfo = false;
    let isValidDeliveryRef = false;
    if (selectedOption === "another-receiver" && receiverInfoRef.current) {
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
      if (selectedOption === "self-receiver") {
        userData = {
          name: contactInfoRef.current?.getName(),
          surname: contactInfoRef.current?.getSurname(),
          mail: contactInfoRef.current?.getMail(),
          phone: contactInfoRef.current?.getPhone(),
        };
      } else {
        userData = {
          name: receiverInfoRef.current?.getName(),
          surname: receiverInfoRef.current?.getSurname(),
          mail: contactInfoRef.current?.getMail(),
          phone: receiverInfoRef.current?.getPhone(),
          payerName: contactInfoRef.current?.getName(),
          payerSurname: contactInfoRef.current?.getSurname(),
          payerPhone: contactInfoRef.current?.getPhone(),
        };
      }
      switch (selectedDeliveryType) {
        case "nova-poshta-office":
          deliveryData = {
            deliveryType: "Відділення Нової Пошти",
            city: deliveryRef.current?.getCity(),
            warehouse: deliveryRef.current?.getWarehouseNovaPost(),
          };
          break;
        case "nova-poshta-courier":
          deliveryData = {
            deliveryType: "Кур'єр Нової Пошти",
            city: deliveryRef.current?.getCity(),
            street: deliveryRef.current?.getStreet(),
            building: deliveryRef.current?.getBuilding(),
            flat: deliveryRef.current?.getFlat(),
          };
          break;
        case "nova-poshta-poshtamat":
          deliveryData = {
            deliveryType: "Поштомат Нової Пошти",
            city: deliveryRef.current?.getCity(),
            warehouse: deliveryRef.current?.getWarehouseNovaPost(),
          };
          break;
        case "ukrposhta-office":
          deliveryData = {
            deliveryType: "Відділення Укрпошти",
            city: deliveryRef.current?.getCity(),
            warehouse: deliveryRef.current?.getWarehouseUkrPost(),
          };
          break;
        default:
          break;
      }
      if (
        !Object.values(userData).includes('') && 
        !Object.values(deliveryData).includes('') &&
        isItemsDeleted.current === false
      ) {
        postData();
        navigate("/success-order");
        console.log("posted");
      } else {
        isItemsDeleted.current = false;
        console.log('Заповніть усі поля або спробуйте ще раз');
      }
    } else {
      console.log("Форма не пройшла валідацію");
    }
  
    console.log('userData', userData);
    console.log('deliveryData', deliveryData);
    console.log('')
  };

  const postData = async () => {
    console.log(cartItems)
    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: cartItems,
          userData: userData,
          deliveryData: deliveryData,
        }),
      });

      if (response.ok) {
        console.log("Дані успішно відправлені!");
      } else {
        console.error("Помилка при відправці даних");
      }
    } catch (error) {
      console.error("Сталася помилка:", error);
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
        <CheckoutPayment />
        <CheckoutReceiver
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          ref={receiverInfoRef}
        />
        <CheckoutOrderPhone
          totalPrice={totalPrice}
          totalDiscount={totalDiscount}
        />
      </div>

      <button 
        className="checkout__button" 
        onClick={handleCheckout}
        disabled={loading}
      >
        Створити замовлення
      </button>

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
