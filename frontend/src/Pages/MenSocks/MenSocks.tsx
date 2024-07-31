import { getMenSocks } from "../../api/fetchDataByCategory";
import SocksPage from "../../Components/SocksPage/SocksPage";

const MenSocks = () => (
  <SocksPage
    fetchSocks={getMenSocks}
    title="Чоловічі шкарпетки"
    linkText="Чоловічі шкарпетки"
    linkHref="/mens-socks"
  />
);

export default MenSocks;
