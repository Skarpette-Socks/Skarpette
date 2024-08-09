import React, { useEffect, useRef, useState } from "react";
import "./Filter.scss";

import arrow_up from "../assets/img/icons/caret-up-filled.svg";
import arrow_down from "../assets/img/icons/caret-down-filled.svg";
import close_white from "../assets/img/icons/close-white.svg";
import close_icon from '../assets/img/icons/close.svg';

interface FilterProps {
  selectedStyles: string[];
  selectedSizes: string[];
  onStyleChange: (style: string) => void;
  onSizeChange: (size: string) => void;
  sizes: string[];
  onClearStyles: () => void;
  onClearSizes: () => void;
}

const Filter: React.FC<FilterProps> = ({
  selectedStyles,
  selectedSizes,
  onStyleChange,
  onSizeChange,
  sizes,
  onClearStyles,
  onClearSizes,
}) => {
  const [openFilter, setOpenFilter] = useState<"style" | "size" | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMobileModal, setShowMobileModal] = useState(false);

  const styles = ["Короткі", "Класичні", "Спортивні", "Медичні"];
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (filter: "style" | "size") => {
    if (isMobile) {
      setShowMobileModal(true);
    } else {
      setOpenFilter((prev) => (prev === filter ? null : filter));
    }
  };

  const handleSave = () => {
    setOpenFilter(null);
    setShowMobileModal(false);
  };

  const handleClear = () => {
    onClearStyles();
    onClearSizes();
    setOpenFilter(null);
    setShowMobileModal(false);
  };

  const handleClearAll = () => {
    handleClear();
  };

  const renderCheckboxes = (
    items: string[],
    selectedItems: string[],
    onChange: (item: string) => void
  ) =>
    items.map((item) => (
      <div key={item} className="filter__category-items">
        <label className="filter__category-item">
          <span className="filter__category-item-text">{item}</span>
          <input
            type="checkbox"
            checked={selectedItems.includes(item)}
            onChange={() => onChange(item)}
            className="filter__category-item-checkbox"
          />
        </label>
      </div>
    ));

  const renderFilterButton = (
    label: string,
    isOpen: boolean,
    onClick: () => void
  ) => (
    <button onClick={onClick} className="filter__button">
      {label}
      <img
        src={isOpen ? arrow_up : arrow_down}
        alt={isOpen ? "arrow_up" : "arrow_down"}
        className="filter__button-icon"
      />
    </button>
  );

  const renderFilterDropdown = (filterType: "style" | "size") => (
    <div className="filter__dropdown" ref={dropdownRef}>
      <div className="filter__category">
        {filterType === "style"
          ? renderCheckboxes(styles, selectedStyles, onStyleChange)
          : renderCheckboxes(sizes, selectedSizes, onSizeChange)}
      </div>
      <div className="filter__dropdown-buttons">
        <button onClick={handleSave} className="filter__actions-save-button">
          Зберегти
        </button>
        <button onClick={handleClear} className="filter__actions-clear-button">
          Очистити
        </button>
      </div>
    </div>
  );

  const renderSelectedFilters = () => (
    <div className="filter__selected-filters">
      {[...selectedStyles, ...selectedSizes].map((item) => (
        <span key={item} className="filter__selected-filter">
          {item}
          <button
            onClick={() =>
              selectedStyles.includes(item)
                ? onStyleChange(item)
                : onSizeChange(item)
            }
            className="filter__close-icon"
          >
            <img src={close_white} alt="close_white" />
          </button>
        </span>
      ))}
      {[...selectedStyles, ...selectedSizes].length > 0 && (
        <button onClick={handleClearAll} className="filter__clear-all-button">
          Очистити всі
        </button>
      )}
    </div>
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="filter">
      <div className="filter__header">
        <span className="filter__header-title">Фільтри:</span>
        <div className="filter__buttons">
          {renderFilterButton("Стиль", openFilter === "style", () =>
            toggleFilter("style")
          )}
          {renderFilterButton("Розмір", openFilter === "size", () =>
            toggleFilter("size")
          )}
        </div>
      </div>

      {openFilter === "style" && renderFilterDropdown("style")}
      {openFilter === "size" && renderFilterDropdown("size")}

      {renderSelectedFilters()}

      {isMobile && showMobileModal && (
        <div className="filter__mobile-overlay">
          <div className="filter__mobile-content">
            <div className="filter__mobile-header">
              <h2>Фільтри</h2>
              <button
                onClick={() => setShowMobileModal(false)}
                className="filter__close-button"
              >
                <img src={close_icon} alt="close_icon" />
              </button>
            </div>

            <div className="filter__mobile-body">
              <h3>Стиль</h3>
              {renderCheckboxes(styles, selectedStyles, onStyleChange)}
              <div className="filter__mobile-break-line"></div>

              <h3>Розмір</h3>
              {renderCheckboxes(sizes, selectedSizes, onSizeChange)}
              <div className="filter__mobile-break-line"></div>
            </div>

            <div className="filter__dropdown-buttons">
              <button
                onClick={handleSave}
                className="filter__actions-save-button"
              >
                Зберегти
              </button>
              <button
                onClick={handleClear}
                className="filter__actions-clear-button"
              >
                Очистити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
