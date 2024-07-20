import PageNavigation from "../../Components/PageNavigation/PageNavigation";
import "./AboutUs.scss";

import about_us_title from "../../Components/assets/img/about-us-1.png";
import about_us_socks from "../../Components/assets/img/about-us-2.png";
import about_us_white_socks from "../../Components/assets/img/about-us-3.png";
import PromoCards from "../../Components/PromoCards/PromoCards";
// import DataFetchingComponent from "../../Components/TryFetch/TryFetch";

const AboutUs: React.FC = () => {
  return (
    <>
      <PageNavigation linkText="Про нас" homeLink="/" linkHref="/about-us" />

      <div className="about-us">
        <div className="about-us__title">
          <h1>Про Scarpette</h1>
          <img src={about_us_title} alt="about us main photo" />
        </div>

        <article className="about-us__main-info">
          <section>
            Scarpette — український бренд шкарпеток та базової білизни. До 2022
            року наша продукція виготовлялась в Рубіжному Луганської області.
            Тепер виробництво зосереджене у Львові.
          </section>
          <section>
            Місія бренду — популяризувати українське та робити позитивний внесок
            в добробут суспільства.
          </section>
          <section>
            Зараз ми працюємо заради перемоги України — протягом 2022 року ми
            передали 11 мільйонів гривень на потреби української армії.
          </section>
          <section>
            Робота нашого бренду ґрунтується на трьох головних цінностях:
            українська ідентичність, локальне виробництво та соціальна
            відповідальність.
          </section>
        </article>

        <div className="about-us__socks">
          <img src={about_us_socks} alt="about_us_socks" />
        </div>

        <article className="about-us__detailed-info">
          <section>
            Scarpette — бренд народжений в Україні й створений людьми з усіх
            куточків країни. Ми захоплюємось багатогранністю нашої Батьківщини
            та прагнемо популяризувати її культуру. Наша продукція натхнена
            подіями, місцями та людьми, які разом творять українську
            ідентичність та національну свідомість.
          </section>
          <section>
            Ми шануємо українських діячів, які своєю працею творили й захищали
            нашу ідентичність i хочемо, щоб більше людей дізнавались про їхню
            творчість. Це прагнення втілилось в шкарпетках присвячених Івану
            Пулюю, Марії Примаченко, Соні Делоне, Івану Левинському, Лесі
            Українці, Григорію Сковороді. А цитата українського футуриста
            Михайля Семенка стала основою дизайну нашої хустки «Patagonia».
          </section>
          <section>
            Серед наших колекцій можна знайти багато дизайнів натхненних
            подорожами Україною — від мальовничих хребтів українських Карпат до
            просторих берегів Херсонщини та затишних хуторів Полтавщини.
          </section>
        </article>

        <div className="about-us__socks about-us__socks--last-img ">
          <img src={about_us_white_socks} alt="about_us_socks" />
        </div>
      </div>

      <PromoCards />
      {/* <DataFetchingComponent /> */}
    </>
  );
};

export default AboutUs;
