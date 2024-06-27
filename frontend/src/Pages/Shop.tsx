import CategoriesCarousel from "../Components/CategoriesCarousel/CategoriesCarousel";
import PromoCards from "../Components/PromoCards/PromoCards";
import CustomSlider from "../Components/Slider/CustomSlider";

const Shop: React.FC = () => {
  return (
    <div>
      <CustomSlider />
      <CategoriesCarousel />
      <PromoCards />
    </div>
  );
};

export default Shop;
