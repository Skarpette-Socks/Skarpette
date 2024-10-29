import CategoriesCarousel from "./MainPageComponents/CategoriesCarousel/CategoriesCarousel";
import PromoCards from "./MainPageComponents/PromoCards/PromoCards";
import Reviews from "./MainPageComponents/Reviews/Reviews";
import CustomSlider from "./MainPageComponents/Slider/CustomSlider";
import MainPageListGoods from "./MainPageComponents/MainPageListGoods/MainPageListGoods";

const MainPage: React.FC = () => {
  const newGoods = 'Новинки';
  const yourFavorite = 'Хіт продажів';

  return (
    <div>
      <CustomSlider />
      <CategoriesCarousel />
      <MainPageListGoods title={newGoods} />
      <MainPageListGoods title={yourFavorite} />
      <PromoCards />
      <Reviews />
    </div>
  );
};

export default MainPage;
