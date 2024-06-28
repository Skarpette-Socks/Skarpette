import React, { useState, useEffect } from "react";
import './Reviews.scss';

interface Testimonial {
  name: string;
  rating: number;
  comment: string;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Аліна М.",
      rating: 5,
      comment:
        "Неймовірно задоволена якістю. Пакування чудове. Жодного зауваження немає. Перевершили мої сподівання. Купуватиму ще.",
    },
    {
      name: "Олександр К.",
      rating: 4,
      comment:
        "Відчувається що використовуються гарні і якісні матеріали, в руці навіть круто так відчувається на дотик",
    },
    {
      name: "Маріанна Т.",
      rating: 5,
      comment:
        "Це просто ВАУ! Вперше бачу такі якісні шкарпетки! Ношу їх з неабияким задоволенням вже декілька років, і ще ніколи не було претензій",
    },
    // Добавьте еще 6 отзывов, чтобы получить 9 в общей сложности
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [screenType, setScreenType] = useState("desktop");

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

  const visibleReviews = getVisibleTestimonials();

  return (
    <div className="reviews">
      <h2 className="reviews__title">Що про нас кажуть клієнти?</h2>
      <button className="reviews__feedback-button">Залишити відгук</button>
      <div className={`reviews__slider reviews__slider--${screenType}`}>
        {visibleReviews.map((review, index) => (
          <div key={index} className="reviews__item reviews__item--active">
            <div className="reviews__stars">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`reviews__stars-item ${i < review.rating ? "reviews__stars-item--filled" : ""}`}
                >
                  ★
                </span>
              ))}
            </div>
            <h3 className="reviews__item-name">{review.name}</h3>
            <p className="reviews__item-comment">{review.comment}</p>
          </div>
        ))}
      </div>
      <div className="reviews__controls">
        <button className="reviews__controls-button" onClick={goToPrevious}>
          &lt;
        </button>
        <span className="reviews__controls-page">{`${currentPage} / ${totalPages}`}</span>
        <button className="reviews__controls-button" onClick={goToNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
