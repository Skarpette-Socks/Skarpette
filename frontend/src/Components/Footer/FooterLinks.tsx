import React from "react";
import { Link } from "react-router-dom";

interface Item {
  name: string;
  link: string;
}

interface ItemsProps {
  items: Item[];
}

const FooterLinks: React.FC<ItemsProps> = ({ items }) => {

  return (
    <div className="footer__links">
      {items.map((item, i) => {
        const { name, link } = item;

        return (
          <Link 
            key={i} 
            to={link} 
            className="footer__links-item"
            onClick={() => window.scrollTo(0, 0)}
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
};

export default FooterLinks;
