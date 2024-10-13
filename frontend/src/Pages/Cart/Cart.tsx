import CartContent from "./Components/CartContent/CartContent";
import MainPageListGoods from "../../Components/MainPageListGoods/MainPageListGoods";
import PageNavigation from "../../Components/PageNavigation/PageNavigation";

const Cart: React.FC = () => {
  return (
    <div>
      <PageNavigation
        linkText='Кошик'
        homeLink="/"
        linkHref="/cart"
      />

      <CartContent />

      <MainPageListGoods 
        title="Вам може сподобатись"
        catalogButton={false}
      />
    </div>
  )   
};

export default Cart;