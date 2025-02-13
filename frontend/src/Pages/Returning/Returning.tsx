import PageNavigation from "../../Components/PageNavigation/PageNavigation";
import Questions from "../../Components/Questions/Questions";
import "./Returning.scss";

const Returning: React.FC = () => {
  return (
    <>
      <PageNavigation
        linkText="Повернення товару"
        homeLink="/"
        linkHref="/return-of-goods"
      />

      <div className="returning">
        <div className="returning__container">
          <div className="returning__questions">
            <Questions />
          </div>

          <div className="returning__text">
            <h1>Терміни повернення і обміну</h1>
            <p>
              Компанія здійснює повернення і обмін товарів належної якості
              згідно Закону{" "}
              <a href="https://zakon.rada.gov.ua/laws/show/1023-12#Text">
                "Про захист прав споживачів"
              </a>{" "}
              .
            </p>
            <br />
            <p>
              Повернення та обмін товарів можливий протягом 14 днів після
              отримання товару покупцем.
            </p>
            <p>
              <span>Зворотня доставка товарів</span> здійснюється за
              домовленістю.
            </p>
            <h3>Умови повернення товарів належної якості</h3>
            <p>
              Ви можете повернути товар або обміняти його, якщо:
            </p>
            <ul>
              <li>
                товар не був у вживанні і не має слідів використання споживачем;
              </li>
              <li>
                товар повністю укомплектований і збережена фабрична упаковка;
              </li>
              <li>збережені всі ярлики і заводське маркування;</li>
              <li>
                товар зберігає товарний вигляд і свої споживчі властивості.
              </li>
            </ul>
            <h3>Повернення товару неналежної якості</h3>
            <p>
              Ви повинні звернутися до працівника пошти і в його присутності
              оглянути товар та зафіксувати брак товару, або ж оформити
              повернення, якщо він не підійшов.{" "}
            </p>
            <br />
            <p>
              Повернення товару, що не підійшов, здійснюється на відділення
              поштової служби, з якого був надісланий товар.
            </p>{" "}
            <br />
            <p>
              Повернення коштів здійснюється протягом 3-х днів з моменту, коли
              продавець забрав товар з відділення перевізника. У разі виявлення
              пошкодження упаковки або товару при його огляді у відділенні
              обов'язково складається відповідний Акт та про інцидент
              повідомляється по телефону, вказаному на сайті нашої компанії. Ми
              покриваємо витрати доставки тільки в тому випадку, коли товар був
              неналежної якості. Якщо товар належної якості, всі витрати несе
              покупець.
            </p>
            <div className="returning__line"></div>
            <h4>
              Відповідно закону{" "}
              <a href="https://zakon.rada.gov.ua/laws/show/1023-12#Text">
                "Про захист прав споживачів"
              </a>
              , компанія може відмовити споживачеві в обміні та поверненні
              товарів належної якості, якщо вони відносяться до категорій,
              зазначених у чинному{" "}
              <a href="https://zakon.rada.gov.ua/laws/show/172-94-%D0%BF">
                Переліку непродовольчих товарів належної якості, що не
                підлягають поверненню та обміну
              </a>
              .
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Returning;
