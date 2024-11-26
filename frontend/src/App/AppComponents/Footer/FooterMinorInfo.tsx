import visa from "../../../assets/img/icons/visa.svg";
import mastercard from "../../../assets/img/icons/mastercard.svg";

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
      </div>
    </div>
  );
};

export default FooterMinorInfo;
