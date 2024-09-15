import {  forwardRef, useImperativeHandle, useState } from "react";
import cn from 'classnames';
import "./ContactInfo.scss";
import InputMask from 'react-input-mask';
import Tooltip from "../Tooltip/Tooltip";

const ContactInfo: React.FC = forwardRef((_, ref) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('+38 (0__) ___-__-__');
  const [mail, setMail] = useState('');

  const [nameTouched, setNameTouched] = useState(false);
  const [surnameTouched, setSurnameTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [mailTouched, setMailTouched] = useState(false);

  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [mailError, setMailError] = useState('');

  const engRegex = /^[\u0400-\u04FF]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  useImperativeHandle(ref, () => ({
    isValid() {
      return isValidForm();
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
    getMail() {
      return mail;
    }
  }));
  

  const isValidForm = () => {
    let error = false;
  
    if (!name || !engRegex.test(name)) {
      setNameTouched(true);
      setNameError(!name ? 'Заповніть поле' : 'Лише кирилиця');
      error = true;
    }
  
    if (!surname || !engRegex.test(surname)) {
      setSurnameTouched(true);
      setSurnameError(!surname ? 'Заповніть поле' : 'Лише кирилиця');
      error = true;
    }
  
    if (phone.includes('_')) {
      setPhoneTouched(true);
      setPhoneError('Неправильний номер телефону');
      error = true;
    }
  
    if (!mail || !emailRegex.test(mail)) {
      setMailTouched(true);
      setMailError(!mail ? 'Заповніть поле' : 'Неправильний мейл');
      error = true;
    }
  
    if (error) {
      const el = document.querySelector('.contact-info__title');
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
  
  const setMailFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    setMail(() => {
      if (value === '') {
        setMailError('Заповніть поле');
      } else if (!emailRegex.test(value)) {
        setMailError('Неправильний мейл');
      } else {
        setMailError('');
        setMailTouched(false);
      }
      return value;
    });
  };
  

  return (
    <div className="contact-info">
      <div className="contact-info__title">
        Контактна інформація
      </div>

      <div className="contact-info__inputs-cont"> 
        <div className="contact-info__input contact-info__input-name">
          <input 
            type="name" 
            name="name"
            className={cn(`
              contact-info__field
              ${(nameError && nameTouched) ? 'error' : ''}
              `)}  
            placeholder="Імʼя"
            value={name}
            maxLength={30}
            onChange={setNameFunc}
            onBlur={() => setNameTouched(true)}
            required
          />
          {(nameError && nameTouched) && 
            <div className="contact-info__error">{nameError}</div>
          }
        </div>

        <div className="contact-info__input contact-info__input-surname">
          <input 
            type="surname" 
            name="surname"
            className={cn(`
              contact-info__field
              ${(surnameError && surnameTouched) ? 'error' : ''}
              `)} 
            placeholder="Прізвище"
            value={surname}
            maxLength={40}
            onChange={setSurnameFunc}
            onBlur={() => setSurnameTouched(true)}
            required
          />
          {(surnameError && surnameTouched) && 
            <div className="contact-info__error">{surnameError}</div>
          }
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
              ${(phoneError && phoneTouched) ? 'error' : ''}
              `)} 
            required 
          />
          {(phoneError && phoneTouched) && 
            <div className="contact-info__error">{phoneError}</div>
          }
          <div className="contact-info__tooltip">
            <Tooltip text='Для зв’язку з Вами' />     
          </div>
        </div>

        <div className="contact-info__input contact-info__input-mail">
          <input 
            type="email" 
            name="email"
            className={cn(`
              contact-info__field
              ${(mailError && mailTouched) ? 'error' : ''}
              `)} 
            placeholder="Електронна пошта"
            value={mail}
            onChange={setMailFunc}
            onBlur={() => setMailTouched(true)}
            required
          />
          {(mailError && mailTouched) && 
            <div className="contact-info__error">{mailError}</div>
          }
        </div>
      </div>
    </div>
  );
});

export default ContactInfo;