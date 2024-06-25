import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CustomSlider.scss";

import { NextArrow, PrevArrow } from "./CustomArrows";

import slide_img_1 from "../assets/img/slider_img_1.png";
// тестовые рандомные картинки
import slide_img_2 from "../assets/img/slide_img_2.png";
import slide_img_3 from "../assets/img/slide_img_3.png";
import slide_img_4 from "../assets/img/slide_img_4.png";
import slide_img_5 from "../assets/img/slide_img_5.png";

interface Slide {
  id: number;
  title: string;
  description: string;
  button: string;
  imageUrl: string;
}

const CustomSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: React.ReactNode) => (
      <div className="custom-slider__dots-container">
        <ul>{dots}</ul>
      </div>
    ),
  };

  const slidesData: Slide[] = [
    {
      id: 1,
      title: "Нове життя вічної традиції",
      description:
        "Купуйте нашивки за областями та підтримуйте нашу армію — 30% отриманих коштів іде на підтримку ЗСУ!",
      button: "Перейти",
      imageUrl: slide_img_1,
    },
    {
      id: 2,
      title: "Жіночі шкарпетки зі знижкою!",
      description:
        "Skarpette пропонує жіночі шкарпетки зі знижками від 10 до 50%",
      button: "Перейти",
      imageUrl: slide_img_2,
    },
    {
      id: 3,
      title: "Переглядайте новинки",
      description:
        "Ми регулярно поповнюємо асортимент магазину новими цікавими пропозиціями",
      button: "Перейти",
      imageUrl: slide_img_3,
    },
    {
      id: 4,
      title: "Вибір справжнього спортсмена",
      description:
        "Наші спортивні шкарпетки стануть гарним доповненням до ваших тренувань та змагань.",
      button: "Перейти",
      imageUrl: slide_img_4,
    },
    {
      id: 5,
      title: "Підтримка здоров’я",
      description:
        "Придбайте медичні та компресійні шкарпетки для вашого здоров'я та активності.",
      button: "Перейти",
      imageUrl: slide_img_5,
    },
  ];

  return (
    <div className="custom-slider">
      <Slider {...settings}>
        {slidesData.map((slide) => (
          <div key={slide.id} className="custom-slider__slide-content">
            <div className="custom-slider__image-content">
              <img src={slide.imageUrl} alt={`slide-${slide.id}`} />
            </div>

            <div className="custom-slider__text-content">
              <h2 className="custom-slider__title">{slide.title}</h2>
              <p className="custom-slider__description">{slide.description}</p>
            </div>

            <div className="custom-slider__actions">
              <a href="/catalog">
                <button className="custom-slider__actions-button">
                  {slide.button}
                </button>
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomSlider;
