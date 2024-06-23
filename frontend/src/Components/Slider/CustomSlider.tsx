import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CustomSlider.scss";

import { NextArrow, PrevArrow } from "./CustomArrows";

import slide_img from "../assets/img/slider_img.png";
// тестовые рандомные картинки
import slide_img_2 from "../assets/img/slider_test_img_2.webp";
import slide_img_3 from "../assets/img/test_img_3.jpg";
import slide_img_4 from "../assets/img/test_img_4.jpg";

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
    autoplay: false,
    autoplaySpeed: 3000,
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
      imageUrl: slide_img,
    },
    {
      id: 2,
      title: "Нове життя вічної традиції",
      description:
        "Купуйте нашивки за областями та підтримуйте нашу армію — 30% отриманих коштів іде на підтримку ЗСУ!",
      button: "Перейти",
      imageUrl: slide_img_2,
    },
    {
      id: 3,
      title: "Нове життя вічної традиції",
      description:
        "Купуйте нашивки за областями та підтримуйте нашу армію — 30% отриманих коштів іде на підтримку ЗСУ!",
      button: "Перейти",
      imageUrl: slide_img_3,
    },
    {
      id: 4,
      title: "Нове життя вічної традиції",
      description:
        "Купуйте нашивки за областями та підтримуйте нашу армію — 30% отриманих коштів іде на підтримку ЗСУ!",
      button: "Перейти",
      imageUrl: slide_img_4,
    },
    {
      id: 5,
      title: "Нове життя вічної традиції",
      description:
        "Купуйте нашивки за областями та підтримуйте нашу армію — 30% отриманих коштів іде на підтримку ЗСУ!",
      button: "Перейти",
      imageUrl: slide_img,
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
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <div className="custom-slider__actions">
                <a href="/catalog">
                  <button>{slide.button}</button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomSlider;
