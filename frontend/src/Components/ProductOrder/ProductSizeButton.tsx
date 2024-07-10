import React from "react";
import "./ProductOrder.scss";

import cn from "classnames";

interface buttonInfo {
  size: string;
  disabled: boolean;
}

interface Props {
  button: buttonInfo;
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
  const { size, disabled } = button;

  return (
    <div
      className={cn(
        `product__size-button${
          disabled === true
            ? ` disabled`
            : `${selectedSize === index ? ` active` : ``}`
        }`
      )}
      onClick={() => !disabled && setSelectedSize(index)}
    >
      {size}
    </div>
  );
};

export default ProductSizeButton;
