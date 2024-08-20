import "./Footer.scss";

import { useState } from "react";

import logo from "../assets/img/icons/logo-green.svg";
import plus from "../assets/img/icons/plus.svg";
import minus from "../assets/img/icons/minus.svg";
import visa from "../assets/img/icons/visa.svg";
import mastercard from "../assets/img/icons/mastercard.svg";
import fondy from "../assets/img/icons/fondy.svg";


import categories from "../../../json_links/categories.json";
import usefulLinks from "../../../json_links/useful-links.json";

import FooterLinks from "./FooterLinks";

const Footer = () => {
  const [categoriesOpened, setCategoriesOpened] = useState(false);
  const [aboutUsOpened, setAboutUsOpened] = useState(false);
  const newCategories = []

  for (const category of categories) {
    newCategories.push({
      name: category.footer_name,
      link: category.link
    })
    
  }

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

          <FooterLinks items={newCategories}/>
        </div>

        <div className="footer__about-us">
          <div className="footer__subtitle">Про компанію</div>

          <FooterLinks items={usefulLinks}/>
        </div>

        <div className="footer__dropdowns">
          <div className="footer__greyline"></div>

          <div 
            className="footer__dropdown-catalog"
            onClick={() => setCategoriesOpened(!categoriesOpened)}
          >
            <div className="footer__dropdown-container">
              <div className="footer__dropdown-catalog-title">Категорії</div>

              <span className="footer__dropdown-button">
                {categoriesOpened ? (
                  <img src={minus} alt="Minus" />
                ) : (
                  <img src={plus} alt="Plus" />
                )}
              </span>

            </div>

            {categoriesOpened && <FooterLinks items={categories}/>}
          </div>

          <div className="footer__greyline"></div>

          <div 
            className="footer__dropdown-about-us" 
            onClick={() => setAboutUsOpened(!aboutUsOpened)}
          >
            <div className="footer__dropdown-container">
              <div className="footer__dropdown-about-us-title">
                Про компанію
              </div>

              <span className="footer__dropdown-button">
                {aboutUsOpened ? (
                  <img src={minus} alt="Minus" />
                ) : (
                  <img src={plus} alt="Plus" />
                )}
              </span>
            </div>

            {aboutUsOpened && <FooterLinks items={usefulLinks}/>}

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

            <div className="footer__address">
              <div className="footer__address-title footer__graytitle">
                Фізична адреса
              </div>

              <div className="footer__address-info">
                Київ, вул. Антоновича 24/10
              </div>
              <div className="footer__address-fop">
                ФОП Ковальчук Марина Андріївна
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__minor-info">
        <div className="footer__greyline"></div>

        <div className="footer__company-name">
          ©2024 Scarpette Socks
        </div>

        <div className="footer__terms-privacy-container">
          <a href="/privacy-policy" className="footer__privacy-link">
            Політика&nbsp;конфіденційності
          </a>

          <a href="/privacy-policy" className="footer__terms-link">
            Умови&nbsp;використання
          </a>
        </div>

        <div className="footer__payment-logos">
          <img src={visa} alt="visa logo" className="footer__visa-logo" />
          <img src={mastercard} alt="mastercard logo" className="footer__mastercard-logo" />
          <img src={fondy} alt="fondy logo" className="footer__fondy-logo" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
