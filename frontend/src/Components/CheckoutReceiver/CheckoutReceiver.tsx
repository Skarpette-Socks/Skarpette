import react, { useState } from "react";

import "./CheckoutReceiver.scss";
import cn from "classnames";
import InputMask from "react-input-mask";
import tooltip from '../../Components/assets/img/icons/tooltip.svg'


const CheckoutReceiver: React.FC = () => {
  //#region inputs
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('+380 (__) __-__-___');

  const [nameTouched, setNameTouched] = useState(false);
  const [surnameTouched, setSurnameTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const setNameFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);

    const engRegex = /^[\u0400-\u04FF]+$/;
  
    if (e.target.value === '') {
      setNameError('Поле не може бути пустим');
    } else if (!engRegex.test(e.target.value)) {
      setNameError('Лише кирилиця');
    } else {
      setNameError('');
      setNameTouched(false);
    }
  }

  const setSurnameFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);

    const engRegex = /^[\u0400-\u04FF]+$/;
    
    if (e.target.value === '') {
      setSurnameError('Поле не може бути пустим');
    } else if (!engRegex.test(e.target.value)) {
      setSurnameError('Лише кирилиця');
    } else {
      setSurnameError('');
      setSurnameTouched(false);
    }
  }

  const setPhoneFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 4) {
      setPhone(e.target.value);
    }
    
    for (const char of e.target.value) {
      if (char === '_') {
        setPhoneError('Неправильний номер телефону');
      } else {
        setPhoneError('');
        setPhoneTouched(false);
      }
    }
  }

  //#endregion

  const [selectedOption, setSelectedOption] = useState("self-receiver");

  const options = [
    {
      id: "self-receiver",
      title: "Я отримувач",
    },
    {
      id: "another-receiver",
      title: "Отримувач інша людина",
    },
  ];

  return (
    <div className="checkout-receiver">
      <h3 className="checkout-receiver__title">Отримувач</h3>
      <div className="checkout-receiver__options">
        {options.map((option) => {
          return (
            <label key={option.id} className="checkout-receiver__option">
              <div className="checkout-receiver__option-checkbox">
                <input
                  type="radio"
                  name="receiver"
                  checked={selectedOption === option.id}
                  onClick={() => setSelectedOption(option.id)}
                />
                <span className="checkout-receiver__option-checkmark"></span>
              </div>
              <div className="checkout-receiver__option-content">
                <div className="checkout-receiver__option-title">
                  {option.title}
                </div>
              </div>
            </label>
          );
        })}
      </div>
      {(selectedOption === "another-receiver") && (
        <div className="checkout-receiver__option-another-customer">
          <div className="contact-info__inputs-cont">
            <div className="contact-info__input contact-info__input-name">
              <input
                type="name"
                name="name"
                className={cn(`
              contact-info__field
              ${nameError && nameTouched ? "error" : ""}
              `)}
                placeholder="Імʼя"
                value={name}
                maxLength={30}
                onChange={setNameFunc}
                onBlur={() => setNameTouched(true)}
                required
              />
              {nameError && nameTouched && (
                <div className="contact-info__error">{nameError}</div>
              )}
            </div>

            <div className="contact-info__input contact-info__input-surname">
              <input
                type="surname"
                name="surname"
                className={cn(`
              contact-info__field
              ${surnameError && surnameTouched ? "error" : ""}
              `)}
                placeholder="Прізвище"
                value={surname}
                maxLength={40}
                onChange={setSurnameFunc}
                onBlur={() => setSurnameTouched(true)}
                required
              />
              {surnameError && surnameTouched && (
                <div className="contact-info__error">{surnameError}</div>
              )}
            </div>

            <div className="contact-info__input contact-info__input-phone">
              <InputMask
                type="tel"
                name="tel"
                mask="+380 (99) 99-99-999"
                value={phone}
                onChange={setPhoneFunc}
                onBlur={() => setPhoneTouched(true)}
                placeholder="+380 (__) __-__-___"
                className={cn(`
              contact-info__field
              ${phoneError && phoneTouched ? "error" : ""}
              `)}
                required
              />
              {phoneError && phoneTouched && (
                <div className="contact-info__error">{phoneError}</div>
              )}
              <img
                src={tooltip}
                alt="tooltip icon"
                className="contact-info__input-phone--icon"
              />

              <div className="contact-info__input-phone--tooltip">
                Для зв’язку з Вами
              </div>

              <div className="contact-info__input-phone--tooltip-icon"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutReceiver;
