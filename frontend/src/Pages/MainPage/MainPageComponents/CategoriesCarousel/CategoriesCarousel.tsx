import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import "./CategoriesCarousel.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import scroll from "../../../../assets/img/icons/scroll.svg";


import items from "../../../../../json_links/categories.json";


const CategoriesCarousel: React.FC = () => {
  const categoriesToShow = 6;

  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollLeft = 0;
    }
  }, []);

  return (
    <div className="categories-carousel">
      <div className="categories-carousel__container">
        <div className="categories-carousel__info">
          <div className="categories-carousel__text">
            <h4 className="categories-carousel__title">Популярні категорії</h4>
            <p className="categories-carousel__subtitle">
              Не прогавте можливість придбати нове та унікальне
            </p>
          </div>

          <img src={scroll} alt="scroll" className="categories-carousel__scroll" />

        </div>

        <ul className="categories-carousel__list" ref={listRef}>
          {items.map((item, index) => {
            const { carousel_name, link } = item;

            if (categoriesToShow > index) {
              return (
                <Link 
                  className="categories-carousel__item"
                  key={index}
                  to={link}
                >
                  <img
                    src={`src/assets/img/carousel-img${index + 1}.svg`}
                    alt={`image ${index + 1}`}
                    className="categories-carousel__image"
                  />
                  <div className="categories-carousel__item-text">
                    {carousel_name}
                  </div>
                </Link>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesCarousel;
