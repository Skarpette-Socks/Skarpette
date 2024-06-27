import CategoriesCarousel from "../Components/CategoriesCarousel/CategoriesCarousel";
import PromoCards from "../Components/PromoCards/PromoCards";
// import ReviewsSlider from "../Components/ReviewsSlider/ReviewsSlider";
import CustomSlider from "../Components/Slider/CustomSlider";

const Shop: React.FC = () => {
  return (
    <div>
      <CustomSlider />
      <CategoriesCarousel />
      <PromoCards />
      {/* <ReviewsSlider /> */}
    </div>
  );
};

export default Shop;
