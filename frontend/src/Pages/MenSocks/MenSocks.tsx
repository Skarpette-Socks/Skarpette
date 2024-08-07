import { getMenSocks } from "../../api/fetchDataByCategory";
import SocksPage from "../../Components/SocksPage/SocksPage";
import { menSizes} from "../../types/Sizes";

const MenSocks = () => (
  <SocksPage
    fetchSocks={getMenSocks}
    title="Чоловічі шкарпетки"
    linkText="Чоловічі шкарпетки"
    linkHref="/mens-socks"
    sizes={menSizes}
  />
);

export default MenSocks;
