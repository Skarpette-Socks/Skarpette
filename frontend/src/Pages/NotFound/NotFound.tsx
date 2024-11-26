import NotFoundContent from "./NotFoundComponents/NotFoundContent";
import MainPageListGoods from "../../Components/MainPageListGoods/MainPageListGoods";

const NotFound: React.FC = () => {
  return (
    <div>

      <NotFoundContent />

      <MainPageListGoods 
        title="Вам може сподобатись"
        catalogButton={false}
      />
    </div>
  )   
};

export default NotFound;