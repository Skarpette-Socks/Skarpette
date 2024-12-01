import React from "react";
import "./TermsOfUse.scss";

const TermsOfUse: React.FC = () => {
  return (
    <div className="terms">
      <div className="terms__text">
        <h1 className="terms__title">Умови використання</h1>
      </div>
      <section className="terms__section">
        <h2 className="terms__section-title">1. Загальні положення</h2>
        <p className="terms__section-info">
          Ці Умови використання регулюють відносини між інтернет-магазином
          «Skarpette» (далі «Магазин») та користувачами (далі «Клієнт») під час
          використання сайту та оформлення замовлень. У разі використання сайту
          Клієнт погоджується з цими Умовами.
        </p>
      </section>
      <section className="terms__section">
        <h2 className="terms__section-title">2. Продукція і ціни</h2>
        <p className="terms__section-info">
          2.1. Магазин пропонує асортимент шкарпеткових виробів, представлених
          на сайті. Кожен товар має опис, ціну та фотографію.
        </p>
        <p className="terms__section-info">
          2.2. Ціни можуть змінюватися без попереднього повідомлення. Оплата
          здійснюється відповідно до ціни, актуальної на момент оформлення
          замовлення.
        </p>
        <p className="terms__section-info">
          2.3. Магазин не несе відповідальності за неточності в описах продукції
          через можливі технічні обмеження.
        </p>
      </section>

      <section className="terms__section">
        <h2 className="terms__section-title">
          3. Оформлення та оплата замовлення
        </h2>
        <p className="terms__section-info">
          3.1. Оформити замовлення можуть лише користувачі, які надали актуальні
          та достовірні контактні дані.
        </p>
        <p className="terms__section-info">
          3.2. Оплата можлива за допомогою банківських карт, електронних
          платежів та при отриманні товару. Умови доставки та оплати
          відображаються на сторінці «Доставка та оплата».
        </p>
      </section>

      <section className="terms__section">
        <h2 className="terms__section-title">
          4. Доставка та отримання товару
        </h2>
        <p className="terms__section-info">
          4.1. Доставка здійснюється за допомогою обраної Клієнтом кур’єрської
          служби.
        </p>
        <p className="terms__section-info">
          4.2. Час доставки залежить від обраного способу доставки та регіону
          отримувача.
        </p>
        <p className="terms__section-info">
          4.3. У разі пошкодження або недостачі товару Клієнт повинен зв’язатися
          з Магазином для вирішення ситуації.
        </p>
      </section>

      <section className="terms__section">
        <h2 className="terms__section-title">5. Обмін та повернення</h2>
        <p className="terms__section-info">
          5.1. Клієнт має право повернути товар протягом 14 днів з моменту
          отримання, якщо товар не був у використанні та збережено його товарний
          вигляд.
        </p>
        <p className="terms__section-info">
          5.2. У разі браку або невідповідності товару Клієнт має право на
          безкоштовний обмін або повернення коштів.
        </p>
      </section>

      <section className="terms__section">
        <h2 className="terms__section-title">6. Політика конфіденційності</h2>
        <p className="terms__section-info">
          6.1.Магазин зобов’язується не передавати особисту інформацію Клієнтів
          третім особам, за винятком випадків, передбачених законом.
        </p>
        <p className="terms__section-info">
          6.2. Особиста інформація використовується виключно для обробки
          замовлень і покращення якості обслуговування.
        </p>
      </section>

      <section className="terms__section">
        <h2 className="terms__section-title">7. Відповідальність Сторінка </h2>
        <p className="terms__section-info">
          7.1. Магазин не несе відповідальності за збитки, спричинені
          неправильним використанням продукції.
        </p>
        <p className="terms__section-info">
          7.2. Усі конфлікти та спори , які можуть виникнути між Клієнтом та
          Магазином, вирішуються шляхом переговорів або в порядку, передбаченим
          законодавством.
        </p>
      </section>

      <section className="terms__section">
        <h2 className="terms__section-title">8. Зміни в Умовах використання</h2>
        <p className="terms__section-info">
          Магазин залишає за собою право змінювати ці Умови без попереднього
          повідомлення. Оновлені Умови набирають чинності з моменту їх
          публікації на сайті. <br />
          <u>
            Ці Умови допоможуть встановити правила користування нашим сайтом, а
            також забезпечити захист прав як Клієнта так і Магазину.
          </u>
        </p>
      </section>
    </div>
  );
};

export default TermsOfUse;
