import { forwardRef, useImperativeHandle, useState } from "react";

import "./CheckoutPayment.scss";

const PaymentType = {
  CARD: 'Card',
  CASH: 'Cash'
}

interface PaymentRef {
  getPaymentType: () => string;
}

const CheckoutPayment = forwardRef<PaymentRef> (( _ , ref) => {
  const [selectedOption, setSelectedOption] = useState(PaymentType.CARD);

  useImperativeHandle(ref, () => ({
    getPaymentType() {
      return selectedOption;
    }
  }));

  const options = [
    {
      id: PaymentType.CARD,
      title: "Онлайн-оплата банківською картою",
    },
    {
      id: PaymentType.CASH,
      title: "Післяплата",
    },
  ];

  return (
    <div className="checkout-payment">
      <h3 className="checkout-payment__title">Оплата</h3>
      <div className="checkout-payment__options">
        {options.map((option) => {
          return (
            <label key={option.id} className="checkout-payment__option">
              <div className="checkout-payment__option-checkbox">
                <input
                  type="radio"
                  name="payment"
                  checked={selectedOption === option.id}
                  onClick={() => setSelectedOption(option.id)}
                  onChange={() => {}}
                />
                <span className="checkout-payment__option-checkmark"></span>
              </div>
              <div className="checkout-payment__option-content">
                <div className="checkout-payment__option-title">
                  {option.title}
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
});

export default CheckoutPayment;
