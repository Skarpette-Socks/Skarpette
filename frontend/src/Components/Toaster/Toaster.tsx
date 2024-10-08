import { toast } from "react-toastify";
import "./Toaster.scss";


interface ToasterProps {
  text: string;
  image: string;
  name: string;
  category: string;
  price: number;
  price2?: number;
  size?: string;
  count: number | ''
}

const Toaster: React.FC<ToasterProps> = ({
  text,
  image,
  name,
  category,
  price,
  price2,
  size,
  count
}) => {

  let categoryName = '';

  switch (category) {
    case 'Women':
      categoryName = 'Жіночі';
      break;
    case 'Men':
      categoryName = 'Чоловічі';
      break;
    case 'Child':
      categoryName = 'Дитячі';
      break;

    default:
      categoryName = '';
      break;
  }

  const position = window.innerWidth <= 767 ? "bottom-center" : "top-right";

  const showToast = () => {
    toast((
      <div className="toaster">
        <h3 className="toaster__text">{text}</h3>
        <div className="toaster__item">
          <div className="toaster__item-img-inf">
            <img src={image} alt={name} className="toaster__image"/>
            <div className="toaster__item-info">
              <h3 className="toaster__name">{name}</h3>
                <div className="toaster__minor-info">
                  <div className="toaster__category">
                    {categoryName}
                  </div>
                  <div className="toaster__size">
                    {size}
                  </div>
                  <div className="toaster__count">
                    {count} ШТ.
                  </div>
                </div>
            </div>
          </div>
          <div className="toaster__item-prices">
            {price2 ? (
              <>  
                <div className="toaster__item-price">{price2} грн</div>
                <div className="toaster__item-price-old">{price} грн</div>
              </>
              ) : (
                <div className="toaster__item-price">{price} грн</div>
            )}
          </div>
        </div>
        <a href='/cart'>
          <button className="toaster__button">
            <div className="toaster__button-text">
              Перейти в кошик
            </div>
          </button>
        </a>
      </div>
    ), {
      position: `${position}`,
    });
  };

  showToast();

  return null;
};

export default Toaster;
