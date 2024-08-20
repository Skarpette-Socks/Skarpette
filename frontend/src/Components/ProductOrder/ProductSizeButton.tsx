import React from "react";
import "./ProductOrder.scss";

import cn from "classnames";

interface buttonInfo {
  size: string;
  is_available: boolean;
}

interface Props {
  button: string | buttonInfo;
  index: number;
  selectedSize: number | undefined;
  setSize: (index: number, is_available:boolean) => void;
}

const ProductSizeButton: React.FC<Props> = ({
  button,
  index,
  selectedSize,
  setSize,
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
        onClick={() => setSize(index, is_available)}
      >
        {size}
      </div>
    );
  }
};

export default ProductSizeButton;
