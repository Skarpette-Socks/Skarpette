import PageNavigation from "../Components/PageNavigation/PageNavigation";
import MainPageListGoods from "./MainPage/MainPageComponents/MainPageListGoods/MainPageListGoods";
import PromoCards from "./MainPage/MainPageComponents/PromoCards/PromoCards";

const Promotions: React.FC = () => {
  return (
    <>
      <PageNavigation
        linkText="Акції"
        homeLink="/"
        linkHref="/offers"
      />
      <MainPageListGoods
        title='Новинки' 
      />
      <PromoCards />
    </>
  );
};

export default Promotions