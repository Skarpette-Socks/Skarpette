import visa from "../assets/img/icons/visa.svg";
import mastercard from "../assets/img/icons/mastercard.svg";
import fondy from "../assets/img/icons/fondy.svg";

const FooterMinorInfo: React.FC = () => {
  return (
    <div className="footer__minor-info">
      <div className="footer__greyline"></div>

      <div className="footer__company-name">©2024 Scarpette Socks</div>

      <div className="footer__terms-privacy-container">
        <a href="/privacy-policy" className="footer__privacy-link">
          Політика&nbsp;конфіденційності
        </a>

        <a href="/privacy-policy" className="footer__terms-link">
          Умови&nbsp;використання
        </a>
      </div>

      <div className="footer__payment-logos">
        <img src={visa} alt="visa logo" className="footer__visa-logo" />
        <img
          src={mastercard}
          alt="mastercard logo"
          className="footer__mastercard-logo"
        />
        <img src={fondy} alt="fondy logo" className="footer__fondy-logo" />
      </div>
    </div>
  );
};

export default FooterMinorInfo;
