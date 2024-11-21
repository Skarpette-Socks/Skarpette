/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  fetchWarehouses,
  FetchWarehousesParams,
} from "../../../../../api/FetchWarehouse";

import "../../../../../assets/styles/commonCheckoutInputesStyles.scss";

interface WarehouseInputProps {
  selectedCity: string | undefined;
  resetWarehouse: boolean;
  onWarehouseReset: () => void;
  deliveryType: string;
  disabled?: boolean;
}

interface WarehouseInputRef {
  isValid: () => boolean;
  getValue: () => string | undefined;
}

const WarehouseInput = forwardRef<WarehouseInputRef, WarehouseInputProps>(
  (
    { selectedCity, resetWarehouse, onWarehouseReset, deliveryType, disabled },
    ref
  ) => {
    const [warehouses, setWarehouses] = useState<string[]>([]);
    const [filteredWarehouses, setFilteredWarehouses] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    useImperativeHandle(ref, () => ({
      isValid() {
        return isValidForm();
      },
      getValue() {
        return inputValue;
      },
    }));

    const isValidForm = () => {
      if (!inputValue) {
        setError("Заповніть поле");
        return false;
      }
      return true;
    };
    const fetchWarehousesData = useCallback(async () => {
      if (!selectedCity) {
        setWarehouses([]);
        setFilteredWarehouses([]);
        setError(null);
        return;
      }

      setError(null);

      try {
        const baseParams: FetchWarehousesParams = {
          CityName: selectedCity,
          Limit: "100000",
        };

        const results: any[] = []; // Массив для сбора результатов

        if (deliveryType === "nova-poshta-poshtamat") {
          const params = {
            ...baseParams,
            TypeOfWarehouseRef: "f9316480-5f2d-425d-bc2c-ac7cd29decf0",
          };
          const warehousesData = await fetchWarehouses(params);
          results.push(...warehousesData);
        }

        if (deliveryType === "nova-poshta-office") {
          const warehouseTypes = [
            "6f8c7162-4b72-4b0a-88e5-906948c6a92f",
            "841339c7-591a-42e2-8233-7a0a00f0ed6f",
            "9a68df70-0267-42a8-bb5c-37f427e36ee4",
          ];

          for (const type of warehouseTypes) {
            const data = await fetchWarehouses({
              ...baseParams,
              TypeOfWarehouseRef: type,
            });
            results.push(...data);
          }
        }
        // Сортировка по номеру отделения
        const sortedResults = results
          .filter((value, index, self) => {
            return (
              index ===
              self.findIndex((t) => JSON.stringify(t) === JSON.stringify(value))
            ); // Уникальность по строковому значению
          })
          .sort((a, b) => {
            const extractNumber = (str: string) => {
              // Регулярное выражение для поиска номера после "№"
              const match = str.match(/№\s*(\d+)/);
              return match ? parseInt(match[1], 10) : Infinity; // Если не найдено, ставим в конец
            };

            const numberA = extractNumber(a); // a - это строка, содержащая номер
            const numberB = extractNumber(b); // b - это строка, содержащая номер

            return numberA - numberB; // Сравниваем числа для сортировки
          });
        // Фильтрация по уникальности, используя строковое представление склада

        if (sortedResults.length === 0) {
          setError("Відділення не знайдено");
        }

        setWarehouses(sortedResults);
        setFilteredWarehouses(sortedResults);
      } catch (err) {
        setError("Помилка при виконанні запиту: " + (err as Error).message);
        setWarehouses([]);
        setFilteredWarehouses([]);
      }
    }, [selectedCity, deliveryType]);

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

      if (inputValue !== "" && filtered.length > 0) {
        setIsOpen(true);
      } else if (inputValue === "") {
        setIsOpen(false);
      }

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
      setError("");
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
      <div className="input">
        <div className="input__container">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={
              deliveryType === "nova-poshta-poshtamat"
                ? "Поштомат"
                : "Відділення"
            }
            className={`input__field ${error ? "input__field--error" : ""}`}
            disabled={disabled || !selectedCity}
            maxLength={200}
          />
        </div>
        {isOpen && filteredWarehouses.length > 0 && (
          <ul ref={listRef} className="input__list">
            {filteredWarehouses.map((warehouse, index) => (
              <li
                key={index}
                onMouseDown={() => handleWarehouseSelect(warehouse)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`input__item ${
                  index === highlightedIndex ? "input__item--highlighted" : ""
                }`}
              >
                {warehouse}
              </li>
            ))}
          </ul>
        )}
        {error && <div className="input__error">{error}</div>}
      </div>
    );
  }
);

export default WarehouseInput;
