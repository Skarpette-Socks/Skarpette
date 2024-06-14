import React from "react";

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
      {items.map((item) => {
        const { name, link } = item;

        return (
          <a key={name} href={link} className="footer__links-item">
            {name}
          </a>
        );
      })}
    </div>
  );
};

export default FooterLinks;
