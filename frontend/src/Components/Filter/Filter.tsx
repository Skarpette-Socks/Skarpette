import React, { useEffect, useRef, useState } from "react";
import "./Filter.scss";

import arrow_up from "../assets/img/icons/caret-up-filled.svg";
import arrow_down from "../assets/img/icons/caret-down-filled.svg";
import close_white from "../assets/img/icons/close-white.svg";

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

  const styles = ["Mono", "Класичні", "Спортивні", "Медичні"];
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (filter: "style" | "size") => {
    setOpenFilter((prev) => (prev === filter ? null : filter));
  };

  const handleSave = () => {
    setOpenFilter(null);
  };

  const handleClear = () => {
    onClearStyles();
    onClearSizes();
    setOpenFilter(null);
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
          {item}
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
          : renderCheckboxes(sizes, selectedSizes, onSizeChange)}{" "}
        {/* Используем переданные размеры */}
      </div>
      <div className="filter__actions">
        <button onClick={handleSave} className="filter__actions-save-button">
          Зберегти
        </button>
        <button onClick={handleClear} className="filter__actions-clear-button">
          Очистити
        </button>
      </div>
    </div>
  );

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
            Очистити все
          </button>
        )}
      </div>
    </div>
  );
};

export default Filter;
