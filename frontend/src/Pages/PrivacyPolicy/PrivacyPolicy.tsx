import PageNavigation from "../../Components/PageNavigation/PageNavigation";
import Questions from "../../Components/Questions/Questions";
import "./PrivacyPolicy.scss";

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <PageNavigation
        linkText="Політика конфіденційності"
        homeLink="/"
        linkHref="/privacy-policy"
      />

      <div className="privacy">
        <div className="privacy__text">
          <h2 className="privacy__title">
            Політика конфіденційності та захисту персональних даних.
          </h2>

          <section className="privacy__section">
            <h6 className="privacy__section-title">Загальне</h6>
            <p className="privacy__section-info">
              Ця Політика конфіденційності описує, як ми збираємо,
              використовуємо та захищаємо персональні дані користувачів нашого
              сайту, який займається торгівлею панчішно - шкарпетковими виробами
              ( далі - Сайт). Ми зобов’язуємось забезпечити захист і
              конфіденційність Ваших даних відповідно до чинного законодавства
              та міжнародних стандартів.
            </p>
          </section>

          <section className="privacy__section">
            <h6 className="privacy__section-title">
              1. Збір персональних даних.
            </h6>
            <p className="privacy__section-info">
              Ми можемо збирати такі види персональних даних:
              <ul className="privacy__section-info-list">
                <li>Ім’я та прізвище;</li>
                <li>Контактна інформація (адреса електронної пошти);</li>
                <li>Поштова адреса для доставки;</li>
                <li>Інформація про платіжні реквізити;</li>
                <li>
                  IP- адреса та інформація про використання сайту (файли
                  cookie).
                </li>
              </ul>
            </p>
          </section>

          <section className="privacy__section">
            <h6 className="privacy__section-title">2. Мета збору даних.</h6>
            <p className="privacy__section-info">
              <ul className="privacy__section-info-list">
                <li>Обробка та виконання замовлень;</li>
                <li>Надання інформації про статус замовлень;</li>
                <li>
                  Поліпшення роботи нашого сайту та обслуговування клієнтів;
                </li>
                <li>Відправка рекламних пропозицій (за вашої згоди);</li>
                <li>
                  Дотримання вимог законодавства(наприклад, для ведення
                  бухгалтерського обліку).
                </li>
              </ul>
            </p>
          </section>

          <section className="privacy__section">
            <h6 className="privacy__section-title">
              3. Обробка та зберігання даних.
            </h6>
            <p className="privacy__section-info">
              Ваші дані обробляються та зберігається протягом періоду,
              необхідного для виконання зазначених цілей або до моменту, поки ви
              не відкличете свою згоду на їх обробку. Ми використовуємо сучасні
              методи захисту даних для запобігання несанкціонованому доступу,
              зміни або видалення інформації.
            </p>
          </section>

          <section className="privacy__section">
            <h6 className="privacy__section-title">
              4. Передача даних третім особам.
            </h6>
            <p className="privacy__section-info">
              Ми не передаємо Ваші персональні дані третім сторонам, за винятком
              таких випадків:
              <ul className="privacy__section-info-list">
                <li>
                  Для обробки замовлень(кур’єрські служби, платіжні системи);
                </li>
                <li>
                  Якщо це вимагається законом(наприклад, за запитом
                  правоохоронних органів).
                </li>
              </ul>
            </p>
          </section>

          <section className="privacy__section">
            <h6 className="privacy__section-title">5. Захист даних.</h6>
            <p className="privacy__section-info">
              Ми впроваджуємо технічні та організаційні заходи для захисту Ваших
              персональних даних, включаючи використання шифрування під час
              передачі даних і обмеження доступу до даних лише для уповноважених
              співробітників.
            </p>
          </section>

          <section className="privacy__section">
            <h6 className="privacy__section-title">6. Права користувачів.</h6>
            <p className="privacy__section-info">
              Ви маєте право:
              <ul className="privacy__section-info-list">
                <li>Отримати доступ до своїх персональних даних;</li>
                <li>Вимагати виправлення або видалення своїх даних;</li>
                <li>Відкликати згоду на обробку даних;</li>
                <li>Подати скаргу до наглядового органу з захисту даних.</li>
              </ul>
            </p>
          </section>

          <section className="privacy__section">
            <h6 className="privacy__section-title">7. Файли cookie.</h6>
            <p className="privacy__section-info">
              Наш сайт використовує файли cookie для покращення користувацького
              досвіду. Ви можете кeрувати налаштуваннями файлів cookie у своєму
              браузері.
            </p>
          </section>

          <section className="privacy__section">
            <h6 className="privacy__section-title">
              8. Зміни до Політики конфіденційності.
            </h6>
            <p className="privacy__section-info">
              Ми залишаємо за собою право змінювати цю Політику
              конфіденційності. Усі зміни будуть публікуватися на цій сторінці.
              Ми рекомендуємо регулярно переглядати цю сторінку для ознайомлення
              з оновленнями. Контактна інформація. Якщо у вас виникли питання
              щодо цієї Політики конфіденційності, будь-ласка, зв’яжіться з нами
              за електронною адресою: shop.skarpette@gmail.com
            </p>
          </section>
        </div>

        <div className="privacy__questions">
          <Questions />
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
