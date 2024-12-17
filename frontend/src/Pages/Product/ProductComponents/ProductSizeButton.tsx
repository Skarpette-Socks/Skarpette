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
  is_in_stock: boolean
}

const ProductSizeButton: React.FC<Props> = ({
  button,
  index,
  selectedSize,
  setSize,
  is_in_stock
}) => {
  if (typeof button !== 'string') {
    const { size, is_available } = button;
  
    return (
      <div
        className={cn(
          `product__size-button${
            is_available === false || 
            is_in_stock === false
              ? ` disabled`
              : `${selectedSize === index ? ` active` : ``}`
          }`
        )}
        onClick={() => setSize(index, is_available && is_in_stock)}
      >
        {size}
      </div>
    );
  }
};

export default ProductSizeButton;
