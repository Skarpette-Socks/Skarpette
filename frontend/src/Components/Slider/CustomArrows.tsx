import React from "react";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} custom-slider__arrow custom-slider__arrow--next`}
      style={{ ...style }}
      onClick={onClick}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 6L15 12L9 18"
          stroke="black"
        />
      </svg>
    </div>
  );
};

const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} custom-slider__arrow custom-slider__arrow--prev`}
      style={{ ...style }}
      onClick={onClick}
    >
      <svg
        width="24"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 6L9 12L15 18"
          stroke="black"
        />
      </svg>
    </div>
  );
};

export { NextArrow, PrevArrow };
