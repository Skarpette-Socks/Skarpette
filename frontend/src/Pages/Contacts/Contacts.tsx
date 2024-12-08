import PageNavigation from "../../Components/PageNavigation/PageNavigation";
import ContactsForm from "../../Components/ContactsForm/ContactsForm";
import "./Contacts.scss";

const Contacts: React.FC = () => {
  return (
    <>
      <PageNavigation linkText="Контакти" homeLink="/" linkHref="/contacts" />
      <div className="container">
        <div className="contacts">
          <div className="contacts__left-column">
            <div className="contacts__title">Напишіть нам</div>
            <p className="contacts__greeting">
              Будемо раді поспілкуватись з вами та відповісти на всі ваші
              питання.
            </p>

            <div className="contacts__info">
              <div className="contacts__working-hours">
                <h3 className="contacts__subtitle">ГРАФІК РОБОТИ</h3>
                <p>
                  з 9:00 до 16:00 <span>замовлення</span>
                </p>
                <p>
                  з 9:00 до 20:00 <span>колл-центр</span>
                </p>
              </div>
              <div className="contacts__numbers">
                <h3 className="contacts__subtitle">НОМЕР ТЕЛЕФОНУ</h3>
                <p>+38 (098) 32-64-872</p>
                <p>+38 (093) 42-80-091</p>
              </div>
            </div>

            <div className="contacts__email">
              <h3 className="contacts__subtitle">ПОШТА ДЛЯ ЗВ'ЯЗКУ</h3>
              <p>
                <a href="mailto:scarpettehelp@gmail.com">
                  shop.skarpette@gmail.com
                </a>
              </p>
            </div>

            <div className="contacts__adress">
              <h3 className="contacts__subtitle">ФІЗИЧНА АДРЕСА</h3>
              <p>Львівська обл., м. Шептицький, вул. Шептицького</p>
              <p>ФОП Ковальчук Марина Андріївна</p>
            </div>
          </div>

          <div className="contacts__form">
            <ContactsForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
