import "./CatalogCategoryCircle.scss";
import woman from '../../../../assets/img/icons/circle-woman.svg';
import man from '../../../../assets/img/icons/circle-man.svg';
import kids from '../../../../assets/img/icons/circle-kids.svg';


const CatalogCategoryCircle: React.FC = () => {
  return (
    <div className="category-circles">
      <a href="/catalog/womens-socks" className="category-circles__item">
        <div className="category-circles__item-circle">
          <img className="category-circles__item-image-woman" src={woman} alt="woman circle" />
        </div>
        <div className="category-circles__item-name">Жіночі</div>
      </a>
      <a href="/catalog/mens-socks" className="category-circles__item">
        <div className="category-circles__item-circle">
          <img className="category-circles__item-image-man" src={man} alt="man circle" />

        </div>
        <div className="category-circles__item-name">Чоловічі</div>
      </a>
      <a href="/catalog/kids-socks" className="category-circles__item">
        <div className="category-circles__item-circle">
          <img className="category-circles__item-image-kids" src={kids} alt="kids circle" />

        </div>
        <div className="category-circles__item-name">Дитячі</div>
      </a>
    </div>
  );
};

export default CatalogCategoryCircle;
