import React, { useState, useEffect } from "react";
import ReviewModal from "./ReviewModal";
import "./Reviews.scss";

import star_icon_active from "../../../../assets/img/icons/star.svg";
import verify_icon from "../../../../assets/img/icons/verify-filled.svg";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Аліна М.",
    rating: 5,
    comment:
      "Неймовірно задоволена якістю. Пакування чудове. Жодного зауваження немає. Перевершили мої сподівання. Купуватиму ще.",
  },
  {
    id: 2,
    name: "Віра С.",
    rating: 5,
    comment:
      "Прийшло все вчасно, якістю задоволена. Буду радити друзям☺️",
  },
  {
    id: 3,
    name: "Оля К.",
    rating: 5,
    comment:
      "Відчувається що використовуються гарні і якісні матеріали, в руці навіть круто так відчувається на дотик.",
  },
  {
    id: 4,
    name: "Маріанна Т.",
    rating: 5,
    comment:
      "Це просто ВАУ! Вперше бачу такі якісні шкарпетки! Ношу їх з неабияким задоволенням вже декілька років, і ще ніколи не було претензій.",
  },
  {
    id: 5,
    name: "Іванка П.",
    rating: 5,
    comment:
      'Замовляла на зиму жіночі шкарпетки. Дуже сподобались. Дякую!',
  },
  {
    id: 6,
    name: "Андрій А.",
    rating: 4,
    comment:
      "Перший раз замовляв через інтернет. Порадили що краще взяти. Все ОК.",
  },
  {
    id: 7,
    name: "Сергій П.",
    rating: 5,
    comment:
      "Якість відмінна. Буду замовляти ще!❤️",
  },
  {
    id: 8,
    name: "Валя Ф.",
    rating: 4,
    comment:
      "Добрий день! Отримала шкарпеточки дуже швидко. Ціна-якість. Загалом подобаються.",
  },
  {
    id: 9,
    name: "Петя К.",
    rating: 5,
    comment:
      "Все ОК! Рекомендую!",
  },
  {
    id: 10,
    name: "Світлана Ц.",
    rating: 5,
    comment:
      "Замовила другий раз. Все підходить.",
  },
  {
    id: 11,
    name: "Вікуся Г.",
    rating: 5,
    comment:
      "Вчора замовила і сьогодні вже отримала. Мені подобається!❤️",
  },
  {
    id: 12,
    name: "Анастасія Г.",
    rating: 4,
    comment:
      "Купляла собі і чоловікові. Задоволенні обоє.",
  },
  {
    id: 13,
    name: "Неля К.",
    rating: 3,
    comment:
      "Ціна відповідає якості!",
  },
  {
    id: 14,
    name: "Ольга З.",
    rating: 5,
    comment:
      "Замовила на зиму собі і дітям. Менеджер привітний. Рекомендую!",
  },
  {
    id: 15,
    name: "Таня К.",
    rating: 5,
    comment:
      "Шкарпетки чудові. Буду замовляти і надалі!",
  },
  {
    id: 16,
    name: "Аня О.",
    rating: 5,
    comment:
      "Замовлення отримала. Дуже задоволена. Буду замовляти далі!👍",
  },

];

const Reviews: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [screenType, setScreenType] = useState(getScreenType());
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenType(getScreenType());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getScreenType() {
    if (window.innerWidth <= 767) return "mobile";
    if (window.innerWidth <= 1280) return "tablet";
    return "desktop";
  }

  const itemsPerPage =
    screenType === "mobile" ? 1 : screenType === "tablet" ? 2 : 3;
  const totalPages = Math.ceil(testimonialsData.length / itemsPerPage);

  const goToPrevious = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages));
  const goToNext = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));

  const visibleReviews = testimonialsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderStars = (rating: number) => (
    <div className="reviews__stars">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="reviews__stars-item">
          <img
            src={star_icon_active}
            alt="star_icon_active"
            style={{ opacity: i < rating ? 1 : 0.3 }}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div className="reviews">
      <div className="reviews__container">
        <div className="reviews__top-bar">
          <p className="reviews__title">Що про нас кажуть клієнти?</p>
          <button
            className="reviews__feedback-button"
            onClick={() => setIsReviewModalOpen(true)}
          >
            Залишити відгук
          </button>
        </div>

        <div className={`reviews__slider reviews__slider--${screenType}`}>
          {visibleReviews.map((review) => (
            <div key={review.id} className="reviews__item">
              {renderStars(review.rating)}
              <h3 className="reviews__item-name">
                {review.name}
                <span>
                  <img src={verify_icon} alt="verify icon" />
                </span>
              </h3>
              <p className="reviews__item-comment">{review.comment}</p>
            </div>
          ))}
        </div>

        <div className="reviews__controls">
          <button className="reviews__controls-button" onClick={goToPrevious}>
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 6L9 12L15 18" stroke="black" />
            </svg>
          </button>

          <span className="reviews__controls-page">
            <span className="reviews__controls-page-current-page">
              {currentPage}
            </span>
            <span className="reviews__controls-page-total-page">
              / {totalPages}
            </span>
          </span>

          <button className="reviews__controls-button" onClick={goToNext}>
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 6L15 12L9 18" stroke="black" />
            </svg>
          </button>
        </div>

        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Reviews;
