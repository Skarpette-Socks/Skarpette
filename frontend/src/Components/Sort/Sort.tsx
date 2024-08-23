import React, { useEffect, useRef, useState } from "react";
import "./Sort.scss";
import DataItem from "../../types/DataItem";

import arrow_up from "../assets/img/icons/caret-up-filled.svg";
import arrow_down from "../assets/img/icons/caret-down-filled.svg";

import cn from 'classnames';

interface SortProps {
  items: DataItem[],
  selectedStyles: string[],
  selectedSizes: string[],
  setSortedItems: (items:DataItem[]) => void;
}


const Sort: React.FC<SortProps> = ({ items, selectedStyles, selectedSizes, setSortedItems }) => {
  const [sortText, setSortText] = useState<string>('За замовчуванням');
  const [sortCase, setSortCase] = useState<string>('default');
  const [sortIsOpen, setSortIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSortIsOpen(false);
      }
    };

    if (sortIsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortIsOpen]);

  const sortByDefault = (items: DataItem[]): DataItem[] => {
    setSortText('За замовчуванням');
    return items.sort((a, b) => a.vendor_code - b.vendor_code);
  };

  const sortByPriceAscending = (items: DataItem[]): DataItem[] => {
    setSortText('Спочатку дешеві');

    // return items.sort((a, b) => a.price - b.price);

    return items.sort((a, b) => {
      if (b.price2 && a.price2) {
        return a.price2 - b.price2
      } else if (b.price2) {
        return a.price - b.price2
      } else if (a.price2) {
        return a.price2 - b.price
      } else {
        return a.price - b.price
      }
    });
  };
  
  const sortByPriceDescending = (items: DataItem[]): DataItem[] => {
    setSortText('Спочатку дорогі');

    return items.sort((a, b) => {
      if (a.price2 && b.price2) {
        return b.price2 - a.price2
      } else if (a.price2) {
        return b.price - a.price2
      } else if (b.price2) {
        return b.price2 - a.price
      } else {
        return b.price - a.price
      }
    });
  };
  
  const sortByBestDiscount = (items: DataItem[]): DataItem[] => {
    setSortText('Спочатку найвигідніші');
    const discountItems = items
      .filter(item => item.discountPercentage)
      .sort((a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0));

    const noneDiscountItems = items
      .filter(item => !item.discountPercentage)
      .sort((a, b) => a.price - b.price);

      return discountItems.concat(noneDiscountItems);
  };

  useEffect(() => {
    let sortedArray: DataItem[];

    switch (sortCase) {
      case "price-asc":
        sortedArray = sortByPriceAscending([...items]);
        break;
      case "price-desc":
        sortedArray = sortByPriceDescending([...items]);
        break;
      case "discount":
        sortedArray = sortByBestDiscount([...items]);
        break;
      case "default":
        sortedArray = sortByDefault([...items]);
      break;
      
      default:
        sortedArray = sortByDefault([...items]);
    }

    console.log('sort updated', sortedArray.length);


    setSortedItems(sortedArray);
  }, [sortCase, selectedStyles, selectedSizes, setSortedItems]);
  
  return (
    <div className="sort" ref={menuRef}>
      <div className="sort__title">Сортувати:</div>
      <div 
        className="sort__button"
        onClick={() => setSortIsOpen(!sortIsOpen)}
      >
        <div className="sort__button-text">
          {sortText}
        </div>
        <img
          src={sortIsOpen ? arrow_up : arrow_down}
          alt={sortIsOpen ? "arrow_up" : "arrow_down"}
          className="sort__button-icon"
        />

        {sortIsOpen &&
          <ul className="sort__dropdown">
            <li 
              className="sort__dropdown-item"
              onClick={() => setSortCase("default")}
            >
              <span>За замовчуванням</span>
              <input 
                type="checkbox" 
                className={cn(`sort__dropdown-checkbox
                  ${sortCase === 'default' ? `checked` : ``}`
                )}
              />
            </li>
            <li 
              className="sort__dropdown-item"
              onClick={() => setSortCase("price-asc")}
            >
              <span>Спочатку дешеві</span>
              <input 
                type="checkbox" 
                className={cn(`sort__dropdown-checkbox
                  ${sortCase === 'price-asc' ? `checked` : ``}`
                )}
              />
            </li>
            <li 
              className="sort__dropdown-item"
              onClick={() => setSortCase("price-desc")}
            >
              <span>Спочатку дорогі</span>
              <input 
                type="checkbox" 
                className={cn(`sort__dropdown-checkbox
                  ${sortCase === 'price-desc' ? `checked` : ``}`
                )}
              />
            </li>
            <li 
              className="sort__dropdown-item"
              onClick={() => setSortCase("discount")}
            >
              <span>Спочатку найвигідніші</span>
              <input 
                type="checkbox" 
                className={cn(`sort__dropdown-checkbox
                  ${sortCase === 'discount' ? `checked` : ``}`
                )}
              />
            </li>
          </ul>
        }
      </div>


    </div>
  );
};

export default Sort;