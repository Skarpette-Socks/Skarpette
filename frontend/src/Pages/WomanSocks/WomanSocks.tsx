// WomenSocks.tsx
import { getWomenSocks } from "../../api/fetchDataByCategory";
import SocksPage from "../../Components/SocksPage/SocksPage";
import { womenSizes } from "../../types/Sizes";

const WomenSocks = () => (
  <SocksPage
    fetchSocks={getWomenSocks}
    title="Жіночі шкарпетки"
    linkText="Жіночі шкарпетки"
    linkHref="/womens-socks"
    sizes={womenSizes}
  />
);

export default WomenSocks;
