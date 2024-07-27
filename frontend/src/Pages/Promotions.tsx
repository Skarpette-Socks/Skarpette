import PageNavigation from "../Components/PageNavigation/PageNavigation";
import PromoCards from "../Components/PromoCards/PromoCards";

const Promotions: React.FC = () => {
  return (
    <>
      <PageNavigation
        linkText="Акції"
        homeLink="/"
        linkHref="/offers"
      />
      <PromoCards />
    </>
  );
};

export default Promotions