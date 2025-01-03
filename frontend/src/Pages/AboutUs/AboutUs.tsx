import PageNavigation from "../../Components/PageNavigation/PageNavigation";
import "./AboutUs.scss";

import about_us_title from "../../assets/img/about-us-1.png";
import about_us_socks from "../../assets/img/about-us-2.png";
import about_us_white_socks from "../../assets/img/about-us-3.png";
import PromoCards from "../MainPage/MainPageComponents/PromoCards/PromoCards";

const AboutUs: React.FC = () => {
  return (
    <>
      <PageNavigation linkText="Про нас" homeLink="/" linkHref="/about-us" />

      <div className="about-us">
        <div className="about-us__title">
          <h1>Про Skarpette</h1>
          <img src={about_us_title} alt="about us main photo" />
        </div>

        <article className="about-us__main-info">
          <h2>
            <b>Шкарпетки від виробника</b>
          </h2>
          <section>
            Підприємство «ЛЯМІНОР» – це сучасне підприємство, що спеціалізується
            на виготовленні якісної шкарпеткової продукції за доступними цінами.
          </section>
          <section>
            У нас можна вигідно придбати шкарпетки оптом від виробника для
            роздрібних торгових точок або онлайн-магазинів, а також вигідно
            скупитися роздрібним покупцям невеликою компанією.
          </section>
          <section>
            Ми виготовляємо панчішно-шкарпеткові вироби на сучасному
            високотехнологічному обладнанні, маємо складські приміщення та
            відділ збуту, що дозволяє забезпечити повний цикл виробництва
            якісної продукції та її збуту.
          </section>
        </article>

        <div className="about-us__socks">
          <img src={about_us_socks} alt="about_us_socks" />
        </div>

        <article className="about-us__detailed-info">
          <h2>
            Чоловічі, жіночі, а також дитячі шкарпеткові вироби, оптом від
            виробника
          </h2>
          <section>
            Весь колектив підприємства спрямовує свої сили на створення стильних
            та якісних виробів, що дарує комфорт покупцеві, впродовж тривалого
            терміну використання. Для вдосконалення нашого асортименту , ми
            регулярно оновлюємо обладнання, покращуємо технологію виробництва.
            І, для створення шкарпеток по європейським стандартам, ми велику
            увагу приділяємо якості сировини з Індії, Туреччини, Польщі та інших
            країн.
          </section>
        </article>

        <article className="about-us__detailed-info">
          <h2>Ми пропонуємо:</h2>
          <section>
            <ol>
              <li>
                <u>Шкарпетки чоловічі</u>, які ми виробляємо, ідеально підходять
                для сильної статі, тому ми пропонуємо великий асортимент з
                моделями на всі пори року.
              </li>
              <li>
                <u>Шкарпетки жіночі</u>, представленні в нашому
                інтернет-магазині широким асортиментом моделей, різних кольорів,
                матеріалів, довжини.
              </li>
              <li>
                <u>Шкарпетки дитячі</u> відіграють для дітей найважливішу роль в
                зручності і якості. Для виготовлення шкарпеток, ми
                використовуємо натуральні матеріали, для практичності, комфорту
                і зносостійкості. В асортименті багато, цікавих, яскравих
                шкарпеток.
              </li>
            </ol>
          </section>
        </article>

        <article className="about-us__detailed-info">
          <h2>Купити шкарпетки дрібним оптом – вигідно і зручно!</h2>
          <section>
            Незважаючи на те, що більшість виробників практикують продажу у
            великій кількості, співпрацюючи тільки з <b>великими оптовиками</b>{" "}
            , ми пропонуємо також <b>придбати шкарпетки дрібним гуртом.</b> Цей
            варіант оптимальний для роздрібних торгових точок,
            інтернет-магазинів і людей, які купують наш продукт в особистих
            цілях. Мінімальна сума замовлення 500грн. Для уточнення подробиць
            звертайтесь до наших менеджерів.
          </section>
        </article>

        <article className="about-us__detailed-info">
          <h2>Чому з нами вигідно!</h2>
          <section>
            Підприємство займається виготовленням високоякісної продукції, яка
            користується попитом у великої кількості роздрібних продавців. Адже
            такий товар, як шкарпетки, буде затребуваний в будь-який час,
            незалежно від сезону, фінансового стану і стану економіки в країні.
            Обравши співпрацю з нами, ви отримуєте відмінну можливість почати
            свій невеликий, але прибутковий бізнес. <br /> Чому нас обирають:
          </section>
          <section>
            <ul>
              <li>доступні ціни;</li>
              <li>висока якість товару;</li>
              <li>великий досвід роботи;</li>
              <li>індивідуальний підхід до кожного клієнта;</li>
              <li>швидкість виконання замовлення.</li>
            </ul>
            Червоноградська шкарпеткова фабрика «ЛЯМІНОР» – якість за доступною
            ціною!
          </section>
        </article>

        <div className="about-us__socks about-us__socks--last-img ">
          <img src={about_us_white_socks} alt="about_us_socks" />
        </div>
      </div>

      <PromoCards />
    </>
  );
};

export default AboutUs;
