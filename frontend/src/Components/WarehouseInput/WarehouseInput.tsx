import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  fetchWarehouses,
  FetchWarehousesParams,
} from "../../api/FetchWarehouse";
import arrow_up from "../assets/img/icons/caret-up-filled.svg";
import arrow_down from "../assets/img/icons/caret-down-filled.svg";
import "./WarehouseInput.scss";

interface WarehouseInputProps {
  selectedCity: string;
  resetWarehouse: boolean;
  onWarehouseReset: () => void;
}

const WarehouseInput: React.FC<WarehouseInputProps> = ({
  selectedCity,
  resetWarehouse,
  onWarehouseReset,
}) => {
  const [warehouses, setWarehouses] = useState<string[]>([]);
  const [filteredWarehouses, setFilteredWarehouses] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const fetchWarehousesData = useCallback(async () => {
    if (!selectedCity) {
      setWarehouses([]);
      setFilteredWarehouses([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params: FetchWarehousesParams = {
        CityName: selectedCity,
        Limit: "150",
      };
      const warehousesData = await fetchWarehouses(params);
      setWarehouses(warehousesData);
      setFilteredWarehouses(warehousesData);
      if (warehousesData.length === 0) {
        setError("Відділення не знайдено");
      }
    } catch (err) {
      setError("Помилка при виконанні запиту: " + (err as Error).message);
      setWarehouses([]);
      setFilteredWarehouses([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCity]);

  useEffect(() => {
    fetchWarehousesData();
  }, [fetchWarehousesData]);

  useEffect(() => {
    if (resetWarehouse) {
      setInputValue("");
      setFilteredWarehouses(warehouses);
      setError(null);
      setIsOpen(false);
      setHighlightedIndex(-1);
      onWarehouseReset();
    }
  }, [resetWarehouse, warehouses, onWarehouseReset]);

  const filterWarehouses = useCallback(
    (query: string) => {
      const lowercasedQuery = query.toLowerCase();
      return warehouses.filter((warehouse) =>
        warehouse.toLowerCase().includes(lowercasedQuery)
      );
    },
    [warehouses]
  );

  useEffect(() => {
    const filtered = filterWarehouses(inputValue);
    setFilteredWarehouses(filtered);
    setHighlightedIndex(-1);
    setIsOpen(filtered.length > 0);
    if (filtered.length === 0 && inputValue !== "") {
      setError("Відділення не знайдено");
    } else {
      setError(null);
    }
  }, [inputValue, filterWarehouses]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setIsOpen(true);
  };

  const handleWarehouseSelect = (warehouse: string) => {
    setInputValue(warehouse);
    setIsOpen(false);
    setError(null);
  };

  const handleInputFocus = () => {
    if (filteredWarehouses.length > 0) {
      setIsOpen(true);
    }
  };

  const handleInputBlur = () => {
    // Задержка, чтобы успеть обработать клик по опции
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredWarehouses.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (event.key === "Enter" && highlightedIndex !== -1) {
      event.preventDefault();
      handleWarehouseSelect(filteredWarehouses[highlightedIndex]);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (highlightedIndex !== -1 && listRef.current) {
      const highlightedElement = listRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      highlightedElement.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  return (
    <div className="warehouse-input">
      <div className="warehouse-input__container">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Відділення"
          className={`warehouse-input__field ${error ? "warehouse-input__field--error" : ""}`}
          disabled={!selectedCity}
        />
        <div>
          <img
            src={isOpen ? arrow_up : arrow_down}
            alt=""
            className="warehouse-input__icon"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        {loading && (
          <div className="warehouse-input__loading">Завантаження...</div>
        )}
      </div>
      {isOpen && filteredWarehouses.length > 0 && (
        <ul ref={listRef} className="warehouse-input__list">
          {filteredWarehouses.map((warehouse, index) => (
            <li
              key={index}
              onMouseDown={() => handleWarehouseSelect(warehouse)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`warehouse-input__item ${
                index === highlightedIndex
                  ? "warehouse-input__item--highlighted"
                  : ""
              }`}
            >
              {warehouse}
            </li>
          ))}
        </ul>
      )}
      {error && <div className="warehouse-input__error">{error}</div>}
    </div>
  );
};

export default WarehouseInput;
