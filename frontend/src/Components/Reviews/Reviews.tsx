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
      } else if (window.innerWidth <= 1023) {
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

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <div className="testimonials-container">
      <h2>Що про нас кажуть клієнти?</h2>
      <button className="leave-feedback">Залишити відгук</button>
      <div className={`testimonial-slider ${screenType}`}>
        {visibleTestimonials.map((testimonial, index) => (
          <div key={index} className="testimonial active">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={i < testimonial.rating ? "filled" : ""}
                >
                  ★
                </span>
              ))}
            </div>
            <h3>{testimonial.name}</h3>
            <p>{testimonial.comment}</p>
          </div>
        ))}
      </div>
      <div className="slider-controls">
        <button onClick={goToPrevious}>&lt;</button>
        <span>{`${currentPage} / ${totalPages}`}</span>
        <button onClick={goToNext}>&gt;</button>
      </div>
    </div>
  );
};

export default Testimonials;
