import React, { useEffect, useState } from "react";
import "./ProductOrder.scss";

import close from "../../../assets/img/icons/close.svg";
import chevronLeft from "../../../assets/img/icons/chevron-left.svg";
import chevronRight from "../../../assets/img/icons/chevron-right.svg";
import ProductImageCircle from "./ProductImageCircle";

interface Props {
  isOpen: (arg: boolean) => void;
  selectedPhoto: number;
  imgArr: string[];
}

const ProductZoom: React.FC<Props> = ({ 
    isOpen, 
    selectedPhoto, 
    imgArr
  }) => {
  const [scrollY, setScrollY] = useState(0);
  const [selectedPhotoZoom, setSelectedPhotoZoom] = useState(selectedPhoto);


  const selectPhotoZoom = ( num:number ) => {
    if (num >= 1) {
      if (selectedPhotoZoom >= imgArr.length - 1) {
        setSelectedPhotoZoom(0);

        return;
      }
    } else {
      if (selectedPhotoZoom === 0) {
        setSelectedPhotoZoom(imgArr.length - 1);

        return;
      }
    }

    setSelectedPhotoZoom(selectedPhotoZoom + num);
  }


  const handleOpen = () => {
    isOpen(false);

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.overflow = "scroll"
    document.body.style.width = "";
    window.scrollTo(0, scrollY);
  };

  useEffect(() => {
    const scrollPosition = window.scrollY;
    setScrollY(scrollPosition);
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.overflow = "hidden"
    document.body.style.width = "100%";
  }, [isOpen, scrollY]);

  return (
    <div className="product__zoom">
      <div className="product__zoom-img-btn">
        <div
          className="product__zoom-img-button left"
          onClick={() => selectPhotoZoom(-1)}
        >
          <img
            src={chevronLeft}
            alt="chevronLeft"
          />
        </div>

        <div className="product__zoom-image">
          <img
            src={imgArr[selectedPhotoZoom]}
            alt="product image"
          />
        </div>

        <div
          className="product__zoom-img-button right"
          onClick={() => selectPhotoZoom(1)}
        >
          <img
            src={chevronRight}
            alt="chevronRight"
          />
        </div>
      </div>

      {imgArr.length > 1 && 
        <div className="product__zoom-image-circle-container">
          {imgArr.map((item, index) => (
            <ProductImageCircle 
              key={item} 
              index={index}
              selectedPhoto={selectedPhotoZoom}
            />
          ))}
        </div>
      }

      <button 
        className="product__zoom-close-btn" 
        onClick={handleOpen}
      >
        <img 
          src={close} 
          alt="close"
        />
      </button>
    </div>
  );
};

export default ProductZoom;
