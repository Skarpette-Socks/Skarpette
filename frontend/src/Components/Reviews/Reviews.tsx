import React, { useState, useEffect } from "react";
import ReviewModal from "./ReviewModal";
import "./Reviews.scss";

import star_icon_active from "../assets/img/icons/star.svg";
import verify_icon from "../assets/img/icons/verify-filled.svg";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

const Reviews: React.FC = () => {
  const [testimonials] = useState<Testimonial[]>([
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
        "Відчувається що використовуються гарні і якісні матеріали, в руці навіть круто так відчувається на дотик",
    },
    {
      id: 3,
      name: "Маріанна Т.",
      rating: 5,
      comment:
        "Це просто ВАУ! Вперше бачу такі якісні шкарпетки! Ношу їх з неабияким задоволенням вже декілька років, і ще ніколи не було претензій",
    },

    {
      id: 4,
      name: "Маріан.",
      rating: 3,
      comment:
        "Це просто ВАУ! Вперше бачу такі якісні шкарпетки! Ношу їх з неабияким задоволенням вже декілька років, і ще ніколи не було претензій",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [screenType, setScreenType] = useState("desktop");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setScreenType("mobile");
      } else if (window.innerWidth <= 1280) {
        setScreenType("tablet");
      } else {
        setScreenType("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getItemsPerPage = () => {
    switch (screenType) {
      case "mobile":
        return 1;
      case "tablet":
        return 2;
      case "desktop":
        return 3;
      default:
        return 3;
    }
  };

  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const goToPrevious = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages));
  };

  const goToNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
  };

  const getVisibleTestimonials = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return testimonials.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleOpenReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const visibleReviews = getVisibleTestimonials();

  return (
    <div className="reviews">
      <div className="reviews__top-bar">
        <p className="reviews__title">Що про нас кажуть клієнти?</p>
        <button
          className="reviews__feedback-button"
          onClick={handleOpenReviewModal}
        >
          Залишити відгук
        </button>
      </div>

      <div className={`reviews__slider reviews__slider--${screenType}`}>
        {visibleReviews.map((review) => (
          <div key={review.id} className="reviews__item ">
            <div className="reviews__stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="reviews__stars-item">
                  <img src={star_icon_active} alt="star_icon_active" />
                </span>
              ))}
            </div>
            <h3 className="reviews__item-name">
              {review.name}
              <span>
                <img src={verify_icon} alt="" />
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
          <span className="reviews__controls-page-total-page">/</span>
          <span className="reviews__controls-page-total-page">
            {totalPages}
          </span>
        </span>

        <button className="reviews__controls-button" onClick={goToNext}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 6L15 12L9 18" stroke="black" />
          </svg>
        </button>
      </div>
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
      />
    </div>
  );
};

export default Reviews;
