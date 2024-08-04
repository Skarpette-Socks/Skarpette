import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PageNavigation.scss";
import arrow_left from "../assets/img/icons/arrow-left.svg";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <div className="page-navigation">
      <button className="page-navigation__back" onClick={() => navigate(-1)}>
        <img src={arrow_left} alt="icon arrow left" />
        <span>Назад</span>
      </button>
      <div className="page-navigation__links">
        <Link to={homeLink} className="page-navigation__home-link">
          Головна
        </Link>
        <span className="page-navigation__separator"> / </span>
        <Link to={linkHref} className="page-navigation__current-link">
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default PageNavigation;
