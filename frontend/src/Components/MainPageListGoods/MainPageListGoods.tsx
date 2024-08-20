import React, { useEffect, useState } from "react";

import "./MainPageListGoods.scss";
import chevron from "../assets/img/icons/chevron-right.svg";
import Item from "../Item/Item";
import { fetchDataWithNewLabel } from "../../api/fetchDataWithNewLabel";
import DataItem from "../../types/DataItem";

interface Props {
  title: string;
  catalogButton?: boolean;
}

const MainPageListGoods: React.FC<Props> = ({
  title,
  catalogButton = false,
}) => {
  const [goods, setGoods] = useState<DataItem[]>([]); // состояние для товаров
  const [loading, setLoading] = useState<boolean>(true); // состояние для загрузки

  useEffect(() => {
    // загрузка данных при монтировании компонента
    fetchDataWithNewLabel()
      .then((data) => {
        setGoods(data); // обновление состояния товаров
        setLoading(false); // завершение загрузки
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // завершение загрузки, даже если произошла ошибка
      });
  }, []);

  const visibleGoods = goods.slice(0, 4);
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
            visibleGoods.map((item) => (
              <Item
                key={item._id}
                vendor_code={item.vendor_code}
                image={item.images_urls?.[0] || ""}
                category={item.type}
                name={item.name}
                price={item.price}
                discount_price={item.price2}
                isNew={item.is_new}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPageListGoods;
