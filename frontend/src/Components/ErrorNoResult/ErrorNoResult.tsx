import { Link } from "react-router-dom";
import no_result from "../assets/img/NoSearchResult.png";
import "./ErrorNoResult.scss";
import PageNavigation from "../PageNavigation/PageNavigation";

interface ErrorComponentProps {
  query: string;
}
const ErrorNoResult: React.FC<ErrorComponentProps> = ({ query }) => (
  <>
    <PageNavigation
      linkText="Результати пошуку"
      homeLink="/"
      linkHref="/search-results"
    />
    <div className="error-component">
      <img src={no_result} alt="no_result" className="error-component__img" />
      <p className="error-component__text">
        На Ваш запит "{query}" нічого не знайдено
      </p>
      <Link to="/catalog/all-socks">
        <button className="error-component__button">Перейти до каталогу</button>
      </Link>
    </div>
  </>
);

export default ErrorNoResult;
