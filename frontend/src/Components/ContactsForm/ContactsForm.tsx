import "./ContactsForm.scss";

const ContactsForm = () => {
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
      />

      <input
        type="email"
        required
        placeholder="Електронна пошта"
        className="contacts-form__email"
      />

      <textarea
        required
        placeholder="Повідомлення"
        className="contacts-form__message"
      ></textarea>

      <input
        type="submit"
        value="Надіслати"
        className="contacts-form__button"
      />
    </form>
  );
};

export default ContactsForm;
