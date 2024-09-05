import  { useState } from "react";
import "./ContactsForm.scss";

const ContactsForm = () => {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 500) {
      setMessage(inputValue);
      setError(false);
    } else {
      setError(true);
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
        className="contacts-form__name"
        maxLength={100}
      />

      <input
        type="email"
        required
        placeholder="Електронна пошта"
        className="contacts-form__email"
        maxLength={100}
      />

      <textarea
        required
        placeholder="Повідомлення"
        className={`contacts-form__message ${error ? "contacts-form__message-error" : ""}`}
        value={message}
        onChange={handleMessageChange}
      ></textarea>

      {error && (
        <p className="contacts-form__error-message">
          Помилка: перевищено максимально допустиму кількість символів.
        </p>
      )}

      <input
        type="submit"
        value="Надіслати"
        className="contacts-form__button"
        disabled={error}
      />
    </form>
  );
};

export default ContactsForm;
