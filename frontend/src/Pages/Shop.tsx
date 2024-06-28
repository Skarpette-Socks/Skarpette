import CategoriesCarousel from "../Components/CategoriesCarousel/CategoriesCarousel";
import PromoCards from "../Components/PromoCards/PromoCards";
// import ReviewsSlider from "../Components/ReviewsSlider/ReviewsSlider";
import CustomSlider from "../Components/Slider/CustomSlider";
import MainPageListGoods from "../Components/MainPageListGoods/MainPageListGoods";

const Shop: React.FC = () => {
  const newGoods = 'Новинки';
  const yourFavorite = 'Ваші улюбленці';

  return (
    <div>
      <CustomSlider />
      <CategoriesCarousel />
      <MainPageListGoods title={newGoods}/>
      <MainPageListGoods title={yourFavorite}/>
      <PromoCards />
      {/* <ReviewsSlider /> */}
    </div>
  );
};

export default Shop;
