import React, { useEffect, useRef, useState } from "react";
import "./Filter.scss";

// Импорт иконок
import arrow_up from "../../../../Components/assets/img/icons/caret-up-filled.svg";
import arrow_down from "../../../../Components/assets/img/icons/caret-down-filled.svg";
import close_white from "../../../../Components/assets/img/icons/close-white.svg";
import close_icon from "../../../../Components/assets/img/icons/close.svg";
import plus_icon from "../../../../Components/assets/img/icons/plus.svg";

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

  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterButtonsRef = useRef<HTMLDivElement>(null);
  const styles = ["Короткі", "Класичні", "Спортивні", "Медичні"];

  useEffect(() => {
    if (showMobileModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [showMobileModal]);

  const toggleMobileModal = () => {
    setShowMobileModal(!showMobileModal);
  };
  // Переключение фильтра
  const toggleFilter = (filter: "style" | "size") => {
    if (isMobile) {
      toggleMobileModal();
    } else {
      setOpenFilter((prevFilter) => (prevFilter === filter ? null : filter));
    }
  };

  // Сохранение фильтров
  const handleSave = () => {
    setOpenFilter(null);
    if (isMobile) {
      toggleMobileModal();
    }
  };

  // Очистка фильтров
  const handleClear = () => {
    onClearStyles();
    onClearSizes();
    setOpenFilter(null);
    if (isMobile) {
      toggleMobileModal();
    }
  };

  // Очистка всех фильтров
  const handleClearAll = () => {
    handleClear();
  };

  // Отрисовка чекбоксов для фильтров
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

  // Отрисовка кнопок фильтров
  const renderFilterButton = (label: string, filter: "style" | "size") => (
    <button onClick={() => toggleFilter(filter)} className="filter__button">
      {label}
      <img
        src={openFilter === filter ? arrow_up : arrow_down}
        alt={openFilter === filter ? "arrow_up" : "arrow_down"}
        className="filter__button-icon"
      />
    </button>
  );

  // Отрисовка выпадающего списка фильтров
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

  // Отрисовка выбранных фильтров
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

  // Обработчик изменения размера экрана
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      if (!newIsMobile && showMobileModal) {
        setShowMobileModal(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showMobileModal]);

  // Обработчик клика вне области фильтра
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        filterButtonsRef.current &&
        !filterButtonsRef.current.contains(event.target as Node)
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
        {isMobile ? (
          <button onClick={toggleMobileModal} className="filter__mobile-button">
            Фільтри <img src={plus_icon} alt="plus" />
          </button>
        ) : (
          <>
            <span className="filter__header-title">Фільтри:</span>
            {sizes.length === 0 ? (
              <div className="filter__buttons" ref={filterButtonsRef}>
                {renderFilterButton("Стиль", "style")}
              </div>
            ) : (
              <div className="filter__buttons" ref={filterButtonsRef}>
                {renderFilterButton("Стиль", "style")}
                {renderFilterButton("Розмір (см)", "size")}
              </div>
            )}
          </>
        )}
      </div>

      {!isMobile && openFilter === "style" && renderFilterDropdown("style")}
      {!isMobile && openFilter === "size" && renderFilterDropdown("size")}

      {renderSelectedFilters()}
      {showMobileModal && (
        <div className="filter__mobile-overlay">
          <div className="filter__mobile-content">
            <div className="filter__mobile-header">
              <h2>Фільтри</h2>
              <button
                onClick={toggleMobileModal}
                className="filter__close-button"
              >
                <img src={close_icon} alt="close_icon" />
              </button>
            </div>

            <div className="filter__mobile-body">
              <h3>Стиль</h3>
              {renderCheckboxes(styles, selectedStyles, onStyleChange)}
              <div className="filter__mobile-break-line"></div>

              {sizes.length === 0 || (
                <h3 className="filter__mobile-body-text">Розмір (см)</h3>
              )}
              {renderCheckboxes(sizes, selectedSizes, onSizeChange)}
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
