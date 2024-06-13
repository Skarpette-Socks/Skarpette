import "./Footer.scss";

import logo from "../assets/img/icons/logo.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__main">
        <div className="footer__main-info">
          <img src={logo} alt="Skarpette logo" className="footer__logo" />

          <div className="footer__description">
            Skarpette — інтернет магазин шкарпеток найвищої якості.
          </div>

          <div className="footer__description2">Made with love ❤️</div>
        </div>

        <div className="footer__categories">
          <div className="footer__subtitle">Категорії</div>

          <ul className="footer__categories-list">
            <li className="footer__categories-item">
              <a href="#" className="footer__categories-link">
                Жіночі
              </a>
            </li>

            <li className="footer__categories-item">
              <a href="#" className="footer__categories-link">
                Чоловічі
              </a>
            </li>

            <li className="footer__categories-item">
              <a href="#" className="footer__categories-link">
                Дитячі
              </a>
            </li>

            <li className="footer__categories-item">
              <a href="#" className="footer__categories-link">
                Класичні
              </a>
            </li>

            <li className="footer__categories-item">
              <a href="#" className="footer__categories-link">
                Короткі
              </a>
            </li>

            <li className="footer__categories-item">
              <a href="#" className="footer__categories-link">
                Спортивні
              </a>
            </li>

            <li className="footer__categories-item">
              <a href="#" className="footer__categories-link">
                Медичні
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__about-us">
          <div className="footer__subtitle">Про компанію</div>

          <ul className="footer__about-us-list">
            <li className="footer__about-us-item">
              <a href="#about-us" className="footer__about-us-link">
                Про нас
              </a>
            </li>
            <li className="footer__about-us-item">
              <a href="#about-us" className="footer__about-us-link">
                Акції
              </a>
            </li>
            <li className="footer__about-us-item">
              <a href="#about-us" className="footer__about-us-link">
                Оплата та доставка
              </a>
            </li>
            <li className="footer__about-us-item">
              <a href="#about-us" className="footer__about-us-link">
                Повернення
              </a>
            </li>
            <li className="footer__about-us-item">
              <a href="#about-us" className="footer__about-us-link">
                Контакти
              </a>
            </li>
            <li className="footer__about-us-item">
              <a href="#about-us" className="footer__about-us-link">
                Написати відгук
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__dropdowns">
          <div className="footer__greyline"></div>

          <div className="footer__dropdown-catalog">
            <div className="footer__dropdown-catalog-title">
              Категорії
            </div>
          </div>

          <div className="footer__greyline"></div>

          <div className="footer__dropdown-about-us">
            <div className="footer__dropdown-about-us-title">
              Про компанію
            </div>
          </div>

          <div className="footer__greyline"></div>
        </div>

        <div className="footer__info">
          <div className="footer__subtitle">Інформація</div>

          <div className="footer__info-container">
            <div className="footer__info-worktime">
              Працюємо з 9:00 до 20:00
            </div>

            <div className="footer__phone-number">
              <div className="footer__phone-number-title footer__graytitle">
                Номер телефону
              </div>

              <a href="tel:+380983264872" className="footer__phone-number-item">
                +38 (098) 32-64-872
              </a>
            </div>

            <div className="footer__email">
              <div className="footer__email-title footer__graytitle">
                Пошта для зв’язку
              </div>

              <a href="mail:scarpettehelp@gmail.com">scarpettehelp@gmail.com</a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__minor-info"></div>
    </div>
  );
};

export default Footer;
