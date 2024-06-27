import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ReviewsSlider.scss";

const reviews = [
  {
    name: "Аліна М.",
    rating: 5,
    review:
      "Неймовірно задоволена якістю. Пакування чудове. Жодного зауваження немає. Перевершили мої сподівання. Купуватиму ще.",
  },
  // Добавьте больше отзывов здесь
];

const ReviewsSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="reviews-slider">
      <h2 className="reviews-slider__title">Що про нас кажуть клієнти?</h2>
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div key={index} className="reviews-slider__slide">
            <div className="reviews-slider__rating">
              {"★".repeat(review.rating)}
            </div>
            <div className="reviews-slider__name">{review.name}</div>
            <div className="reviews-slider__review">{review.review}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewsSlider;
