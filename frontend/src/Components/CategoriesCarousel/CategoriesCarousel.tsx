import React from "react";

import "./CategoriesCarousel.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import scroll from "../assets/img/icons/scroll.svg";


import items from "../../../../backend/bd/categories.json";
import { Link } from "react-router-dom";

const CategoriesCarousel: React.FC = () => {
  const categoriesToShow = 6;

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

        <ul className="categories-carousel__list">
          {items.map((item, index) => {
            const { name, link } = item;

            if (categoriesToShow > index) {
              return (
                <Link 
                  className="categories-carousel__item"
                  key={index}
                  to={link}
                >
                  <img
                    src={`src/Components/assets/img/carousel-img${index + 1}.png`}
                    alt={`image ${index + 1}`}
                    className="categories-carousel__image"
                  />
                  <div className="categories-carousel__item-text">
                    {name}
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
