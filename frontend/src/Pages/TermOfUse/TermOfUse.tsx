import React from "react";
import "./TermsOfUse.scss";
import PageNavigation from "../../Components/PageNavigation/PageNavigation";
import Questions from "../../Components/Questions/Questions";

const TermsOfUse: React.FC = () => {
  return (
    <>
      <PageNavigation
        linkText="Умови використання"
        homeLink="/"
        linkHref="/terms-of-use"
      />

      <div className="terms">
        <div className="terms__text">
          <h2 className="terms__title">Умови використання</h2>

          <section className="terms__section">
            <h6 className="terms__section-title">1. Загальні положення</h6>
            <p className="terms__section-info">
              Ці Умови використання регулюють відносини між інтернет-магазином
              «Skarpette» (далі «Магазин») та користувачами (далі «Клієнт») під
              час використання сайту та оформлення замовлень. У разі
              використання сайту Клієнт погоджується з цими Умовами.
            </p>
          </section>

          <section className="terms__section">
            <h6 className="terms__section-title">2. Продукція і ціни</h6>
            <p className="terms__section-info">
              <ol className="terms__section-info-list">
                <li>
                  Магазин пропонує асортимент шкарпеткових виробів,
                  представлених на сайті. Кожен товар має опис, ціну та
                  фотографію.
                </li>
                <li>
                  Ціни можуть змінюватися без попереднього повідомлення. Оплата
                  здійснюється відповідно до ціни, актуальної на момент
                  оформлення замовлення.
                </li>
                <li>
                  Магазин не несе відповідальності за неточності в описах
                  продукції через можливі технічні обмеження.
                </li>
              </ol>
            </p>
          </section>

          <section className="terms__section">
            <h6 className="terms__section-title">
              3. Оформлення та оплата замовлення
            </h6>
            <p className="terms__section-info">
              <ol className="terms__section-info-list">
                <li>
                  Оформити замовлення можуть лише користувачі, які надали
                  актуальні та достовірні контактні дані.
                </li>
                <li>
                  Оплата можлива за допомогою банківських карт, електронних
                  платежів та при отриманні товару. Умови доставки та оплати
                  відображаються на сторінці «Доставка та оплата».
                </li>
              </ol>
            </p>
          </section>

          <section className="terms__section">
            <h6 className="terms__section-title">
              4. Доставка та отримання товару
            </h6>
            <p className="terms__section-info">
              <ol className="terms__section-info-list">
                <li>
                  Доставка здійснюється за допомогою обраної Клієнтом
                  кур’єрської служби.
                </li>
                <li>
                  Час доставки залежить від обраного способу доставки та регіону
                  отримувача.
                </li>
                <li>
                  У разі пошкодження або недостачі товару Клієнт повинен
                  зв’язатися з Магазином для вирішення ситуації.
                </li>
              </ol>
            </p>
          </section>

          <section className="terms__section">
            <h6 className="terms__section-title">5. Обмін та повернення</h6>
            <p className="terms__section-info">
              <ol className="terms__section-info-list">
                <li>
                  Клієнт має право повернути товар протягом 14 днів з моменту
                  отримання, якщо товар не був у використанні та збережено його
                  товарний вигляд.
                </li>
                <li>
                  У разі браку або невідповідності товару Клієнт має право на
                  безкоштовний обмін або повернення коштів.
                </li>
              </ol>
            </p>
          </section>

          <section className="terms__section">
            <h6 className="terms__section-title">
              6. Політика конфіденційності
            </h6>
            <p className="terms__section-info">
              <ol className="terms__section-info-list">
                <li>
                  Магазин зобов’язується не передавати особисту інформацію
                  Клієнтів третім особам, за винятком випадків, передбачених
                  законом.
                </li>
                <li>
                  Особиста інформація використовується виключно для обробки
                  замовлень і покращення якості обслуговування.
                </li>
              </ol>
            </p>
          </section>

          <section className="terms__section">
            <h6 className="terms__section-title">7. Відповідальність сторін</h6>
            <p className="terms__section-info">
              <ol className="terms__section-info-list">
                <li>
                  Магазин не несе відповідальності за збитки, спричинені
                  неправильним використанням продукції.
                </li>
                <li>
                  Усі конфлікти та спори, які можуть виникнути між Клієнтом та
                  Магазином, вирішуються шляхом переговорів або в порядку,
                  передбаченим законодавством.
                </li>
              </ol>
            </p>
          </section>

          <section className="terms__section">
            <h6 className="terms__section-title">
              8. Зміни в Умовах використання
            </h6>
            <p className="terms__section-info">
              Магазин залишає за собою право змінювати ці Умови без попереднього
              повідомлення. Оновлені Умови набирають чинності з моменту їх
              публікації на сайті.
            </p>
          </section>
        </div>

        <div className="terms__questions">
          <Questions />
        </div>
      </div>
    </>
  );
};

export default TermsOfUse;
