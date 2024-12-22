import PageNavigation from "../../Components/PageNavigation/PageNavigation";
import MainPageListGoods from "../../Components/MainPageListGoods/MainPageListGoods";
import PromoCards from "../MainPage/MainPageComponents/PromoCards/PromoCards";
import NoPromotions from "./PromotionsComponents/NoPromotions";

const Promotions: React.FC = () => {
  return (
    <>
      <PageNavigation
        linkText="Акції"
        homeLink="/"
        linkHref="/offers"
      />
      <NoPromotions />
      <MainPageListGoods
        title='Новинки' 
      />
      <PromoCards />
    </>
  );
};

export default Promotions