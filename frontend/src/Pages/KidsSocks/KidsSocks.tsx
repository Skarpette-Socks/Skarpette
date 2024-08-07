import { getKidsSocks } from "../../api/fetchDataByCategory";
import SocksPage from "../../Components/SocksPage/SocksPage";
import {kidsSizes } from "../../types/Sizes";

const KidsSocks = () => (
  <SocksPage
    fetchSocks={getKidsSocks}
    title="Дитячі шкарпетки"
    linkText="Дитячі шкарпетки"
    linkHref="/kids-socks"
    sizes={kidsSizes}
  />
);

export default KidsSocks;
