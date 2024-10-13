import { forwardRef, useImperativeHandle, useState } from "react";

import "./CheckoutReceiver.scss";
import cn from "classnames";
import InputMask from "react-input-mask";
import Tooltip from "../../../../Components/Tooltip/Tooltip";

interface ReceiverInfoRef {
  isValid: () => boolean;
  getName: () => string;
  getSurname: () => string;
  getPhone: () => string;
}

interface ContactInfoProps {
  selectedOption: string,
  setSelectedOption: (e: string) => void;

}

const CheckoutReceiver = forwardRef<ReceiverInfoRef, ContactInfoProps>((
  { 
    selectedOption,
    setSelectedOption
  }, 
  ref
) => {
  
  //#region inputs
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('+38 (0__) ___-__-__');

  const [nameTouched, setNameTouched] = useState(false);
  const [surnameTouched, setSurnameTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const engRegex = /^[\u0400-\u04FF]+$/;

  useImperativeHandle(ref, () => ({
    isValid() {
      if (selectedOption === 'another-receiver') {
       return isValidForm();
      }

      return true;
    },
    getName() {
      return name;
    },
    getSurname() {
      return surname;
    },
    getPhone() {
      return phone;
    },
  }));

  const isValidForm = () => {
    let error = false;
  
    if (!name || !engRegex.test(name)) {
      setNameTouched(true);
      setNameError(name === '' ? 'Заповніть поле' : 'Лише кирилиця');
      error = true;
    }
  
    if (!surname || !engRegex.test(surname)) {
      setSurnameTouched(true);
      setSurnameError(surname === '' ? 'Заповніть поле' : 'Лише кирилиця');
      error = true;
    }
  
    if (phone.includes('_')) {
      setPhoneTouched(true);
      setPhoneError('Неправильний номер телефону');
      error = true;
    }
  
    if (error) {
      const el = document.querySelector('.checkout-receiver__title');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  
    return !error;
  }

  const setNameFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    setName(() => {
      if (value === '') {
        setNameError('Заповніть поле');
      } else if (!engRegex.test(value)) {
        setNameError('Лише кирилиця');
      } else {
        setNameError('');
        setNameTouched(false);
      }
      return value;
    });
  };
  
  const setSurnameFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    setSurname(() => {
      if (value === '') {
        setSurnameError('Заповніть поле');
      } else if (!engRegex.test(value)) {
        setSurnameError('Лише кирилиця');
      } else {
        setSurnameError('');
        setSurnameTouched(false);
      }
      return value;
    });
  };
  
  const setPhoneFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    setPhone(() => {
      if (value.length >= 4) {
        for (const char of value) {
          if (char === '_') {
            setPhoneError('Неправильний номер телефону');
          } else {
            setPhoneError('');
            setPhoneTouched(false);
          }
        }
      }
      return value;
    });
  };

  //#endregion

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
            <div 
              className={cn(`
                contact-info__input 
                contact-info__input-name 
                ${nameError && nameTouched ? "error" : ""}`
              )}
            >
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
                mask="+38 (099) 999-99-99"
                value={phone}
                onChange={setPhoneFunc}
                onBlur={() => setPhoneTouched(true)}
                placeholder="+38 (0__) ___-__-__"
                className={cn(`
              contact-info__field
              ${phoneError && phoneTouched ? "error" : ""}
              `)}
                required
              />
              {phoneError && phoneTouched && (
                <div className="contact-info__error">{phoneError}</div>
              )}
              
              <div className="contact-info__tooltip">
                <Tooltip text='Для зв’язку з Вами' />     
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default CheckoutReceiver;
