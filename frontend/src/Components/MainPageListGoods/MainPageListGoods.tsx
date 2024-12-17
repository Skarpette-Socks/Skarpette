import React, { useEffect, useState } from "react";
import "./MainPageListGoods.scss";
import chevron from "../../../src/assets/img/icons/chevron-right.svg";

import Item from "../Item/Item";
import DataItem from "../../types/DataItem";
import { fetchGoods } from "../../api/fetchGoodsAtMainPage";

interface Props {
  title: string;
  catalogButton?: boolean;
  goods?: DataItem[];
  loading?: boolean;
}

const MainPageListGoods: React.FC<Props> = ({
  title,
  catalogButton = false,
  goods = [],
  loading,
}) => {
  const visibleGoods = goods.slice(0, 4);
  const [goodsToShow, setGoodsToShow] = useState<DataItem[]>(visibleGoods);

  useEffect(() => {
    if (!loading && goods.length === 0) {
      fetchGoods("hit")
        .then((data) => {
          const filteredHitGoods = data.map((item) => item.skarpette);
          setGoodsToShow(filteredHitGoods);
        })
        .catch((error) => {
          console.error("Помилка:", error);
        });
    } else if (goods.length > 0) {
      setGoodsToShow(goods.slice(0, 4));
    }
  }, [loading, goods]);

  return (
    <div className="list-goods">
      <div className="list-goods__container">
        <div className="list-goods__head">
          <div className="list-goods__title">{title}</div>
          {catalogButton && (
            <a href="/catalog" className="list-goods__button">
              <img
                className="list-goods__mob-button"
                src={chevron}
                alt="button img"
              />
              <div className="list-goods__tablet-button">Подивитись всі</div>
            </a>
          )}
        </div>

        <div className="list-goods__goods-list items-list">
          {loading ? (
            <div>Loading...</div>
          ) : (
            goodsToShow.map((item) => (
              <Item
                key={item._id}
                vendor_code={item.vendor_code}
                image={item.images_urls?.[0] || ""}
                category={item.type}
                name={item.name}
                price={item.price}
                discount_price={item.price2}
                isNew={item.is_new}
                is_in_stock={item.is_in_stock}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPageListGoods;
