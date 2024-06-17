import "./PageNavigation.scss";
import arrow_left from "../assets/img/icons/arrow-left.svg";

interface PageNavigationProps {
  linkText: string;
  homeLink: string;
  linkHref: string;
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  linkText,
  homeLink,
  linkHref,
}) => {
  return (
    <div className="page-navigation">
      <a
        href="#"
        className="page-navigation__back"
        onClick={() => window.history.back()}
      >
        <img src={arrow_left} alt="icon arrow left" />
        <span>Назад</span>
      </a>
      <div className="page-navigation__links">
        <a href={homeLink} className="page-navigation__home-link">
          Головна
        </a>
        <span className="page-navigation__separator"> / </span>
        <a href={linkHref} className="page-navigation__current-link">
          {linkText}
        </a>
      </div>
    </div>
  );
};

export default PageNavigation;
