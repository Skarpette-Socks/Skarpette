import { getKidsSocks } from "../../api/fetchDataByCategory";
import SocksPage from "../../Components/SocksPage/SocksPage";

const KidsSocks = () => (
  <SocksPage
    fetchSocks={getKidsSocks}
    title="Дитячі шкарпетки"
    linkText="Дитячі шкарпетки"
    linkHref="/kids-socks"
  />
);

export default KidsSocks;
