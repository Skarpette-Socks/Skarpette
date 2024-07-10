import React from "react";
import "./ProductOrder.scss";

import cn from "classnames";

interface Props {
  index: number;
  selectedPhoto: number;
}

const ProductImageCircle: React.FC<Props> = ({
  index,
  selectedPhoto
}) => {
  return (
    <div 
      className={
        cn(`product__image-circle${
          selectedPhoto === index ? ` active` : ``
        }`)}
      > 
    </div>
  );
};

export default ProductImageCircle;