import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import no_result from "../../assets/img/success-order.svg";
import './SuccessOrder.scss';
import PageNavigation from "../../Components/PageNavigation/PageNavigation";

const SuccessOrder: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderNumber = location.state?.orderNumber;

  useEffect(() => {
    if (!orderNumber) {
      navigate("/");
    }
  }, [orderNumber, navigate]);

  if (!orderNumber) {
    return null;
  }

  return (
    <>
      <PageNavigation linkText="Кошик" homeLink="/" linkHref="/cart" />
      <div className="success-order">
        <img src={no_result} alt="no_result" className="success-order__img" />
        <p className="success-order__text">
          Дякуємо за покупку в магазині <strong>Skarpette!</strong>
        </p>
        <p className="success-order__text">
          Ваше замовлення №{orderNumber} успішно оформлено
        </p>
        <p className="success-order__text">
          Очікуйте, наш менеджер зв'яжеться з вами для підтвердження
        </p>
        <Link to="/catalog/all-socks">
          <button className="success-order__button">Перейти до каталогу</button>
        </Link>
      </div>
    </>
  );
};

export default SuccessOrder;
