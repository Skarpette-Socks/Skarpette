import react, { useState } from 'react';

import './CheckoutPayment.scss'

const CheckoutPayment: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('fondy');

  const options = [
    {
      id: "fondy",
      title: "Картками Visa та MasterCard через Fondy",
      subtitle: "На сайті сервісу",
    },
    {
      id: "on-card",
      title: "На картку",
      subtitle: "Через дзвінок",
    },
  ]

  return (
    <div className="checkout-payment">
      <h3 className="checkout-payment__title">
        Оплата
      </h3>
      <div className="checkout-payment__options">
        {options.map((option) => {
          return (
            <label
              key={option.id}
              className='checkout-payment__option'
            >
              <div className="checkout-payment__option-checkbox">
                <input
                  type="radio"
                  name="payment"
                  checked={selectedOption === option.id}
                  onClick={() => setSelectedOption(option.id)}
                />
                <span className="checkout-payment__option-checkmark"></span>
              </div>
              <div className="checkout-payment__option-content">
                <div className="checkout-payment__option-title">
                  {option.title}
                </div>
                <div className="checkout-payment__option-subtitle">
                  {option.subtitle}
                </div>
              </div>
            </label>
          )
        })}
      </div>

    </div>
  );
}

export default CheckoutPayment;