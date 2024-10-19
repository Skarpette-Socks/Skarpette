import "./PromoCards.scss";
import promo_icon_1 from "../../../../assets/img/icons/promo-icon-1.svg";
import promo_icon_2 from "../../../../assets/img/icons/promo-icon-2.svg";
import promo_icon_3 from "../../../../assets/img/icons/promo-icon-3.svg";

const promoData = [
  {
    id: 1,
    icon: promo_icon_1,
    title: "Якісне виробництво",
    text: "Найкращі матеріали, якість без компромісів та стильні дизайни — в нашому асортименті. Обери комфорт і стиль разом з Skarpette",
  },
  {
    id: 2,
    icon: promo_icon_2,
    title: "Турбота про клієнтів",
    text: "Ми створюємо всі продукти з думкою про твої потреби. Ми завжди на зв’язку і готові відповісти на всі твої запитання",
  },
  {
    id: 3,
    icon: promo_icon_3,
    title: "Соціальна відповідальність",
    text: "Ми впевнені, що український бізнес має велике значення для покращення життя суспільства та громадян",
  },
];

const PromoCards: React.FC = () => {
  return (
    <div className="promo-cards">
      {promoData.map((item) => (
        <div key={item.id} className="promo-cards__item">
          <img src={item.icon} alt="item icon" />
          <p className="promo-cards__title">{item.title}</p>
          <p className="promo-cards__text">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default PromoCards;
