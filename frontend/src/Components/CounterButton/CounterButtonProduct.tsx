import { useEffect, useState } from "react";
import "./CounterButton.scss";
import plus from "../assets/img/icons/plus.svg";
import minus from "../assets/img/icons/minus.svg";

interface CounterButtonProduct {
  count: number | '',
  setCount: (value: number | '') => void;
  cartItemCount?: number | '';
}

const MAX_VALUE = 99;

const CounterButtonProduct: React.FC<CounterButtonProduct> = ({
  count,
  setCount,
  cartItemCount
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [counter, setCounter] = useState<number | "">(count);
  let maxVal = MAX_VALUE;
  if (cartItemCount !== '' && cartItemCount !== undefined) {
    maxVal = MAX_VALUE - cartItemCount;
  }

  useEffect(() => {
    if (counter !== '') {
      setCount(counter);
    } else {
      setCount(1);
    }

    if (counter !== '' && maxVal <= counter) {
      setCounter(maxVal);
    }

    if (counter === 0 && maxVal >= 1) {
      setCounter(1);
    }
  }, [counter, cartItemCount])

  const setOnBlur = () => {
    if (counter === "" || counter === 0) {
      setCounter(1);
    }
  };

  const handleDecrement = () => {
    if (typeof counter === "number") {
      setCounter(Math.max(counter - 1, 1));
    } else {
      setCounter(1);
    }
  };

  const handleIncrement = () => {
    if (typeof counter === "number") {
      setCounter(Math.min(counter + 1, maxVal));
    } else {
      setCounter(1);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(parseInt(event.target.value, 10))) {
      const value = parseInt(event.target.value, 10);
      setCounter(Math.min(Math.max(value, 1), maxVal));
    } else {
      if (isFocused) {
        setCounter("");
      } else {
        setCounter(1);
      }
    }
  };

  return (
    <div className="counter__buttons">
      <button
        className="counter__button"
        onClick={handleDecrement}
        disabled={counter !== '' && counter  <= 1}
      >
        <img src={minus} alt="Minus" />
      </button>
      <input
        type="number"
        className="counter__input"
        min={1}
        max={maxVal}
        value={counter}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          setOnBlur();
        }}
      />
      <button
        className="counter__button"
        onClick={handleIncrement}
        disabled={counter !== '' && counter >= maxVal}
      >
        <img src={plus} alt="Plus" />
      </button>
    </div>
  );
};

export default CounterButtonProduct;
