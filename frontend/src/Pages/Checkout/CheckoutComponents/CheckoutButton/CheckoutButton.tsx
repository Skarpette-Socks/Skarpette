import React, { useState, useEffect } from "react";

const CheckoutButton = ({
  loading,
  underButtonError,
  handleCheckout,
}: {
  loading: boolean;
  underButtonError: boolean;
  handleCheckout: () => void;
}) => {
  const [dots, setDots] = useState<string>("");

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prevDots) => {
          if (prevDots === "...") return "";
          return prevDots + ".";
        });
      }, 300); 
      return () => clearInterval(interval);
    } else {
      setDots("");
    }
  }, [loading]);

  return (
    <button
      className={`checkout__button ${loading || underButtonError ? "disabled" : ""}`}
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? `Відправляємо${dots}` : "Створити замовлення"}
    </button>
  );
};

export default CheckoutButton;
