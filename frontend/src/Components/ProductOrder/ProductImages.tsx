import React from "react";
import "./ProductOrder.scss";

import cn from "classnames";

interface Props {
  image: string;
  index: number;
  selectedPhoto: number;
  setSelectedPhoto: (index: number) => void;
}

const ProductImages: React.FC<Props> = ({
  image,
  index,
  selectedPhoto,
  setSelectedPhoto,
}) => {
  return (
    <img
      src={image}
      alt="product image"
      className={cn(
        `product__minor-img-item${
          selectedPhoto === index ? ` active` : ``
        }`)
      }
      onClick={() => setSelectedPhoto(index)}
    />
  );
};

export default ProductImages;
