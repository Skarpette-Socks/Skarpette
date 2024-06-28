import CategoriesCarousel from "../Components/CategoriesCarousel/CategoriesCarousel";
import PromoCards from "../Components/PromoCards/PromoCards";
import Reviews from "../Components/Reviews/Reviews";
import CustomSlider from "../Components/Slider/CustomSlider";

const Shop: React.FC = () => {
  return (
    <div>
      <CustomSlider />
      <CategoriesCarousel />
      <PromoCards />
      <Reviews />
    </div>
  );
};

export default Shop;
