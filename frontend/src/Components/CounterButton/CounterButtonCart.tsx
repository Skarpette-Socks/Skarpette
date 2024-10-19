import { useEffect, useState } from "react";
import "./CounterButton.scss";
import plus from "../../assets/img/icons/plus.svg";
import minus from "../../assets/img/icons/minus.svg";
import { useCartItems } from "../../Context/CartContext";

interface CounterButtonCart {
  count: number | '',
  index:number,
  priceLoading: boolean
}

const CounterButtonCart: React.FC<CounterButtonCart> = ({
  count,
  index,
  priceLoading
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { cartItems, counterCartItem } = useCartItems();
  const [counter, setCounter] = useState<number | "">(count);

  useEffect(() => {
    if (isFocused === false) {
      if (index !== undefined) {
        counterCartItem(cartItems[index], counter);
      }
    }
  }, [counter, isFocused])



  useEffect(() => {
    if (index) {
      setCounter(cartItems[index].count);
    }
  }, [cartItems])

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
      setCounter(Math.min(counter + 1, 99));
    } else {
      setCounter(1);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(parseInt(event.target.value, 10))) {
      const value = parseInt(event.target.value, 10);
      setCounter(Math.min(Math.max(value, 1), 99));
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
        disabled={counter === 1 || priceLoading}
      >
        <img src={minus} alt="Minus" />
      </button>
      <input
        type="number"
        className="counter__input"
        min={1}
        max={99}
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
        disabled={counter === 99 || priceLoading}
      >
        <img src={plus} alt="Plus" />
      </button>
    </div>
  );
};

export default CounterButtonCart;
