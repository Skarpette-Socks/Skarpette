import  { useState } from "react";
import { toast } from "react-toastify";
import "./ContactsForm.scss";

const ContactsForm = () => {
  const [name, setName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [nameError, setNameError] = useState<string>('');
  const [mailError, setMailError] = useState<string>('');
  const [messageError, setMessageError] = useState<string>('');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isCyrillic = /^[\u0400-\u04FF-ʼ'/\s]*$/;


  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();
    let isValid = true;

    setNameError('');
    setMailError('');
    setMessageError('');

    if (name.trim() === '') {
      setNameError('Заповніть поле')
      isValid = false;
    }

    if (name.length > 50) {
      setNameError('Перевищено максимальну кільість символів')
      isValid = false;
    }

    if (!emailRegex.test(mail)) {
      setMailError('Невалідний мейл');
      isValid = false;
    }


    if (message.length <= 500) {
      setMessageError('');
    } else {
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
        const response = await fetch('http://185.237.207.177:5000/email/sendHelpForm', {
          method:'POST',
          headers: {
            'Content-Type':'application/json', 
          },
          body: JSON.stringify({
            firstname: name.trim(),
            email: mail.trim(),
            comment: message.trim()
          })
        })

        if (response.ok) {
          toast.update(toaster, { 
              render: "Повідомлення відправлено!", 
              type: "success", 
              isLoading: false, 
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          )

          setName('');
          setMail('');
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isCyrillic.test(value)) {
      setNameError('Лише кирилиця');
    } else if (value.length <= 50) {
      setName(value);
      setNameError('');
    }
  }

  const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length <= 100) {
      setMail(value);
      setMailError('')
    }
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 500) {
      setMessage(inputValue);
      setMessageError('');
    } else {
      setMessageError('Помилка: перевищено максимально допустиму кількість символів.');
    }
  };


  return (
    <form action="#" className="contacts-form">
      <p className="contacts-form__title" id="contacts-form__title">
        Форма для зв’язку
      </p>

      <input
        type="text"
        required
        placeholder="Ім’я"
        value={name}
        onChange={handleNameChange}
        className={`contacts-form__name ${nameError ? "contacts-form__message-error" : ""}`}
        maxLength={51}
      />

      {nameError && (
        <p className="contacts-form__error-message">
          {nameError}
        </p>
      )}

      <input
        type="email"
        required
        placeholder="Електронна пошта"
        value={mail}
        onChange={handleMailChange}
        className={`contacts-form__email ${mailError ? "contacts-form__message-error" : ""}`}
        maxLength={100}
      />

      {mailError && (
        <p className="contacts-form__error-message">
          {mailError}
        </p>
      )}

      <textarea
        required
        placeholder="Повідомлення"
        className={`contacts-form__message ${messageError ? "contacts-form__message-error" : ""}`}
        value={message}
        onChange={handleMessageChange}
        maxLength={500}
      ></textarea>

      {messageError && (
        <p className="contacts-form__error-message">
          {messageError}
        </p>
      )}

      <button
        // type="submit"
        className="contacts-form__button"
        disabled={!!messageError}
        onClick={handleSubmit}
      >
        Надіслати
      </button>
    </form>
  );
};

export default ContactsForm;
