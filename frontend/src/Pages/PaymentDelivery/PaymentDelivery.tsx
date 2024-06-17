import PageNavigation from "../../Components/PageNavigation/PageNavigation";
import Questions from "../../Components/Questions/Questions";
import "./PaymentDelivery.scss";

import three_socks from '../../Components/assets/img/three-socks.png';
import PromoCards from "../../Components/PromoCards/PromoCards";

const PaymentDelivery: React.FC = () => {
  return (
    <>
      <PageNavigation
        linkText="Оплата та доставка"
        homeLink="/"
        linkHref="/payment-and-delivery"
      />
      <div className="payment-delivery">
        <div className="payment-delivery__questions">
          <Questions />
          <img src={three_socks} alt="socks" />
        </div>

        <div className="payment-delivery__info">
          <h5 className="payment-delivery__info-title">Оплата та доставка</h5>
          <section className="payment-delivery__info-section">
            <h6>Оплата</h6>
            <p>
              Оплата здійснюється через систему онлайн платежів Fondy на сайті.
            </p>
          </section>

          <section className="payment-delivery__info-section">
            <h6>Доставка</h6>
            <p>
              Товари надсилаються щоденно по буднях за допомогою служб доставки
              «Нова Пошта» та Укрпошта з 10:00 до 16:30.
            </p>
          </section>

          <section className="payment-delivery__info-post-office">
            <h5>Умови доставки Новою Поштою:</h5>
            <ul>
              <li>Термін доставки 1-3 дні</li>
              <li>Вартість доставки від 90 грн.</li>
              <li>
                Відправка замовлень з понеділку по пʼятницю, у вихідні відправок
                немає.
              </li>
            </ul>
          </section>
          <section className="payment-delivery__info-post-office">
            <h5>Умови доставки Укрпоштою:</h5>
            <ul>
              <li>Терміни доставки 2-7 днів.</li>
              <li>Вартість доставки від 65 грн.</li>
            </ul>
          </section>
        </div>
      </div>
      <PromoCards/>
    </>
  );
};

export default PaymentDelivery;
