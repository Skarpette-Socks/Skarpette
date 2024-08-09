import React from "react";
import "./ProductOrder.scss";

import cn from "classnames";

interface buttonInfo {
  size: string;
  is_available?: boolean;
}

interface Props {
  button: string | buttonInfo;
  index: number;
  selectedSize: number;
  setSelectedSize: (index: number) => void;
}

const ProductSizeButton: React.FC<Props> = ({
  button,
  index,
  selectedSize,
  setSelectedSize,
}) => {
  if (typeof button !== 'string') {
    const { size, is_available } = button;
  
    return (
      <div
        className={cn(
          `product__size-button${
            is_available === false
              ? ` disabled`
              : `${selectedSize === index ? ` active` : ``}`
          }`
        )}
        onClick={() => is_available && setSelectedSize(index)}
      >
        {size}
      </div>
    );
  }
};

export default ProductSizeButton;
