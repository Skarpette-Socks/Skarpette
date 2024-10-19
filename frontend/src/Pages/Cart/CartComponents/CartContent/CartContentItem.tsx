import CartItem from "../../../../types/CartItem";

import "./CartContent.scss"
import close from "../../../../assets/img/icons/close.svg";
import { useCartItems } from "../../../../Context/CartContext";
import CounterButtonCart from "../../../../Components/CounterButton/CounterButtonCart";

interface Props {
  cartItem: CartItem,
  index: number,
  priceLoading: boolean
}

const CartContentItem: React.FC<Props> = ({ 
    cartItem, 
    index,
    priceLoading 
  }) => {
  const { deleteCartItem } = useCartItems();

  let categoryName = '';

  switch (cartItem.type) {
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

  return (
    <div>
      <div className="cart__item">
        <div className="cart__item-bl1">
          <a href={`/product/${cartItem.vendor_code}`}>
            <img 
              src={cartItem.image} 
              alt={cartItem.name} 
              className="cart__item-image"
            />
          </a>
          <div className="cart__item-info">
            <div className="cart__item-minorinfo">
              <div className="cart__item-category">{categoryName}</div>
              <div className="cart__item-size">{cartItem.size}</div>
            </div>
            <a 
              href={`/product/${cartItem.vendor_code}`} 
              className="cart__item-name">{cartItem.name}              
            </a>
            <div>
              {cartItem.price2 ? (
                <>  
                  <div className="cart__item-price">{cartItem.price2} грн</div>
                  <div className="cart__item-price-old">{cartItem.price} грн</div>
                </>
                ) : (
                  <div className="cart__item-price">{cartItem.price} грн</div>
              )}
            </div>
          </div>
        </div>
        <div className="cart__item-bl2">
          <div className="cart__item-buttons-desktop">
            <CounterButtonCart 
              count={cartItem.count}
              index={index}
              priceLoading={priceLoading}
            />
          </div>
          <button 
            className="cart__item-delete"
            onClick={() => deleteCartItem(index)}
            disabled={priceLoading}
          >
            Видалити
          </button>
          <button 
            className="cart__item-close"
            onClick={() => deleteCartItem(index)}
            disabled={priceLoading}
          >
            <img src={close} alt="Minus" />
          </button>

        </div>
      </div>
      <div className="cart__item-buttons-mobile">
        <CounterButtonCart 
          count={cartItem.count}
          index={index}
          priceLoading={priceLoading}
        />
      </div>
    </div>
  );
};

export default CartContentItem;