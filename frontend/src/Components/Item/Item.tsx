import "./Item.scss";

interface ItemProps {
  image: string;
  category: string;
  name: string;
  new_price: number;
  old_price?: number;
}

const Item: React.FC<ItemProps> = ({
  image,
  category,
  name,
  new_price,
  old_price,
}) => {
  return (
    <div className="item">
      <img src={image} alt="item image" className="item__image" />
      <p className="item__category">{category}</p>
      <p className="item__name">{name}</p>
      <div className="item__prices">
        <div className="item__price-new">{new_price} грн</div>
        {old_price !== undefined && (
          <div className="item__price-old">{old_price} грн</div>
        )}
      </div>
    </div>
  );
};

export default Item;
