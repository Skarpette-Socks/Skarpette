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
    name: "Олександр К.",
    rating: 4,
    comment:
      "Відчувається що використовуються гарні і якісні матеріали, в руці навіть круто так відчувається на дотик.",
  },
  {
    id: 3,
    name: "Маріанна Т.",
    rating: 5,
    comment:
      "Це просто ВАУ! Вперше бачу такі якісні шкарпетки! Ношу їх з неабияким задоволенням вже декілька років, і ще ніколи не було претензій.",
  },
  {
    id: 4,
    name: "Маріан.",
    rating: 3,
    comment:
      "Це просто ВАУ! Вперше бачу такі якісні шкарпетки! Ношу їх з неабияким задоволенням вже декілька років, і ще ніколи не було претензій.",
  },
  {
    id: 5,
    name: "Олег М.",
    rating: 5,
    comment:
      "Неймовірно задоволена якістю. Пакування чудове. Жодного зауваження немає. Перевершили мої сподівання. Купуватиму ще.",
  },
  {
    id: 6,
    name: "Аліна .",
    rating: 5,
    comment:
      "Неймовірно задоволена якістю. Пакування чудове. Жодного зауваження немає. Перевершили мої сподівання. Купуватиму ще.",
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
