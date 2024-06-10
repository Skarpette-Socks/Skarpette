import './PromoCards.scss';

import promo_icon_1 from "../assets/img/icons/promo-icon-1.png";
import promo_icon_2 from "../assets/img/icons/promo-icon-2.png";
import promo_icon_3 from "../assets/img/icons/promo-icon-3.png";

const PromoCards: React.FC = () => {
  return (
    <div className="promo-cards">
      <div className="promo-cards__item">
        <img src={promo_icon_1} alt="" />
        <p className="promo-cards-title">Якісне виробництво</p>
        <p className="promo-cards-text">
          Найкращі матеріали, якість без компромісів та стильні дизайни — в
          нашому асортименті. Обери комфорт і стиль разом з Skarpette
        </p>
      </div>

      <div className="promo-cards__item">
        <img src={promo_icon_2} alt="" />
        <p className="promo-cards-title">Турбота про клієнтів</p>
        <p className="promo-cards-text">
          Ми створюємо всі продукти з думкою про твої потреби. Ми завжди на
          зв’язку і готові відповісти на всі твої запитання
        </p>
      </div>

      <div className="promo-cards__item">
        <img src={promo_icon_3} alt="" />
        <p className="promo-cards-title">Соціальна відповідальність</p>
        <p className="promo-cards-text">
          Ми впевнені, що український бізнес має велике значення для покращення
          життя суспільства та громадян
        </p>
      </div>
    </div>
  );
}

export default PromoCards