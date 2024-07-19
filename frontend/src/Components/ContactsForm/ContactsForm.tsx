import "./ContactsForm.scss";

const ContactsForm = () => {
  return (
    <form action="#" className="contacts-form">
      <p id="contacts-form__title">Форма для зв’язку</p>
      <input
        type="text"
        required
        placeholder="Ім’я"
        className="contacts-form__name"
      />

      <input
        type="text"
        required
        placeholder="Електронна пошта"
        className="contacts-form__email"
      />

      <input
        type="text"
        required
        placeholder="Повідомлення"
        className="contacts-form__message"
      />

      <input
        type="submit"
        value="Надіслати"
        className="contacts-form__button"
      />
    </form>
  );
};

export default ContactsForm;
