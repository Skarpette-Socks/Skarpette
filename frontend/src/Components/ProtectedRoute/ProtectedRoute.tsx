import React from "react";
import { Navigate } from "react-router-dom";
import { useCartItems } from "../../Context/CartContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { cartItems } = useCartItems();
  let totalPrice = 0;

  // Рассчитываем сумму заказа
  cartItems.forEach((item) => {
    const count = Number(item.count) || 0;
    const price = Number(item.price) || 0;
    const price2 = item.price2 ? Number(item.price2) : undefined;

    totalPrice += count * (price2 || price);
  });

  if (cartItems.length === 0 || totalPrice < 500) {
    return <Navigate to="/cart" replace />;
  }

  return children;
};

export default ProtectedRoute;
