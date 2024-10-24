import "./CatalogCategoryCircle.scss";
import woman from '../../../../assets/img/icons/circle-woman.svg';
import man from '../../../../assets/img/icons/circle-man.svg';
import kids from '../../../../assets/img/icons/circle-kids.svg';
import { Link } from "react-router-dom";


const CatalogCategoryCircle: React.FC = () => {
  return (
    <div className="category-circles">
      <Link to="/catalog/womens-socks" className="category-circles__item">
        <div className="category-circles__item-circle">
          <img className="category-circles__item-image-woman" src={woman} alt="woman circle" />
        </div>
        <div className="category-circles__item-name">Жіночі</div>
      </Link>
      <Link to="/catalog/mens-socks" className="category-circles__item">
        <div className="category-circles__item-circle">
          <img className="category-circles__item-image-man" src={man} alt="man circle" />

        </div>
        <div className="category-circles__item-name">Чоловічі</div>
      </Link>
      <Link to="/catalog/kids-socks" className="category-circles__item">
        <div className="category-circles__item-circle">
          <img className="category-circles__item-image-kids" src={kids} alt="kids circle" />

        </div>
        <div className="category-circles__item-name">Дитячі</div>
      </Link>
    </div>
  );
};

export default CatalogCategoryCircle;
