import {  useState } from "react";
import cn from 'classnames';
import "./ContactInfo.scss";
import InputMask from 'react-input-mask';
import Tooltip from "../Tooltip/Tooltip";



const ContactInfo: React.FC = () => {
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

  const setNameFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);

    const engRegex = /^[\u0400-\u04FF]+$/;
  
    if (e.target.value === '') {
      setNameError('Заповніть поле');
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
      setSurnameError('Заповніть поле');
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

  const setMailFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (e.target.value === '') {
      setMailError('Заповніть поле');
    } else if (!emailRegex.test(e.target.value)) {
      setMailError('Неправильний мейл');
    } else {
      setMailError('');
      setMailTouched(false);
    }

  }

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
}

export default ContactInfo;