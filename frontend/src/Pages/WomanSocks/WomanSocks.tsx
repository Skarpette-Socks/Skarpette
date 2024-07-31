// WomenSocks.tsx
import { getWomenSocks } from "../../api/fetchDataByCategory";
import SocksPage from "../../Components/SocksPage/SocksPage";

const WomenSocks = () => (
  <SocksPage
    fetchSocks={getWomenSocks}
    title="Жіночі шкарпетки"
    linkText="Жіночі шкарпетки"
    linkHref="/womens-socks"
  />
);
export default WomenSocks;
