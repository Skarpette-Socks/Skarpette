import React, { useState } from "react";
import "./ReviewModal.scss";
import { toast } from 'react-toastify';

import icon_close from "../../../../assets/img/icons/close.svg";
import star_icon_active from "../../../../assets/img/icons/star.svg";
import star_icon_inactive from "../../../../assets/img/icons/star_unactive.svg";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState<number>(3);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [firstNameError, setFirstNameError] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [messageError, setMessageError] = useState<string>('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isCyrillic = /^[\u0400-\u04FF-ʼ'/\s]*$/;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
  
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setMessageError('');
  
    if (firstName.trim() === '') {
      setFirstNameError('Заповніть поле')
      isValid = false;
    }

    if (lastName.trim() === '') {
      setLastNameError('Заповніть поле')
      isValid = false;
    }

    if (firstName.length > 50) {
      setFirstNameError('Перевищено максимальну кільість символів')
      isValid = false;
    }

    if (lastName.length > 50) {
      setLastNameError('Перевищено максимальну кільість символів')
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      setEmailError('Невалідний мейл');
      isValid = false;
    }

    if (message.length > 500) {
      isValid = false;
      setMessageError('Помилка: перевищено максимально допустиму кількість символів.');
    }
    
    if (message.trim() === '') {
      setMessageError('Заповніть поле')
      isValid = false;
    }

    if (isValid) {
      const toaster = toast.loading('Відправляємо...', {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })

      try {
        const response = await fetch('http://localhost:5000/email/sendFeedback', {
          method:'POST',
          headers: {
            'Content-Type':'application/json', 
          },
          body: JSON.stringify({
            score: rating,
            firstname: firstName.trim(),
            lastname: lastName.trim(),
            email: email.trim(),
            comment: message.trim()
          })
        })
        onClose();

        if (response.ok) {
          toast.update(toaster, { 
              render: "Повідомлення відправлено та згодом зʼявиться на сайті!", 
              type: "success", 
              isLoading: false, 
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          )

          setFirstName('');
          setLastName('');
          setEmail('');
          setMessage('');
        } else {
          toast.update(toaster, { 
              render: "Помилка при відправці повідомлення", 
              type: "error", 
              isLoading: false, 
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          )
        }
      } catch(error) {
        console.log(error);
      }
    }
  }

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    if (!isCyrillic.test(value)) {
      setFirstNameError('Лише кирилиця');
    } else if (value.length <= 50) {
      setFirstName(value);
      setFirstNameError('');
    }
  };
  
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    if (!isCyrillic.test(value)) {
      setLastNameError('Лише кирилиця');
    } else if (value.length <= 50) {
      setLastName(value);
      setLastNameError('');
    }
  };
  

  const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length <= 100) {
      setEmail(value);
      setEmailError('')
    }
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 300) {
      setMessage(inputValue);
      setMessageError('');
    } else {
      setMessageError('Помилка: перевищено максимально допустиму кількість символів.');
    }
  };

  return (
    <div className="review-modal-overlay" onClick={onClose}>
      <div className="review-modal" onClick={(e) => e.stopPropagation()}>
        <div className="review-modal__top">
          <h2>Залишити відгук</h2>
          <button className="review-modal__close" onClick={onClose}>
            <img src={icon_close} alt="close icon" />
          </button>
        </div>

        <form>
          <div className="review-modal__stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? "active" : ""}`}
                onClick={() => setRating(star)}
              >
                <img
                  src={rating >= star ? star_icon_active : star_icon_inactive}
                  alt={`Star ${star}`}
                />
              </span>
            ))}
          </div>
          <div className="review-modal__input-group">
            <div className="">
              <input
                type="text"
                placeholder="Ім'я"
                value={firstName}
                onChange={handleFirstNameChange}
                required
                className="review-modal__input-group-name"
                maxLength={50}
              />
              {firstNameError && (
                <p className="review-modal__error-message">
                  {firstNameError}
                </p>
              )}
            </div>
            <div className="">
              <input
                type="text"
                placeholder="Прізвище"
                value={lastName}
                onChange={handleLastNameChange}
                className="review-modal__input-group-surname"
                maxLength={50}
              />
              {lastNameError && (
                <p className="review-modal__error-message">
                  {lastNameError}
                </p>
              )}
            </div>
          </div>

          <input
            type="email"
            placeholder="Електронна пошта"
            value={email}
            onChange={handleMailChange}
            required
            maxLength={100}
          />
            {emailError && (
              <p className="review-modal__error-message">
                {emailError}
              </p>
            )}
          <textarea
            placeholder="Текст відгуку"
            value={message}
            onChange={handleMessageChange}
            required
            maxLength={300}
          />
            {messageError && (
              <p className="review-modal__error-message">
                {messageError}
              </p>
            )}
          <button
            onClick={(e) => handleSubmit(e)}
            className="review-modal__submit"
          >
            Надіслати
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
