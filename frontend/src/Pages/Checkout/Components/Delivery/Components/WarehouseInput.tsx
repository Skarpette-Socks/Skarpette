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

import '../../../../../Components/assets/styles/commonCheckoutInputesStyles.scss';


interface WarehouseInputProps {
  selectedCity: string | undefined;
  resetWarehouse: boolean;
  onWarehouseReset: () => void;
  deliveryType: string;
  disabled?: boolean; // Добавляем проп disabled
}

interface WarehouseInputRef {
  isValid: () => boolean;
  getValue: () => string | undefined;
}

const WarehouseInput = forwardRef<WarehouseInputRef, WarehouseInputProps>(
  (
    {
      selectedCity,
      resetWarehouse,
      onWarehouseReset,
      deliveryType,
      disabled, // Деструктурируем проп disabled
    },
    ref
  ) => {
    const [warehouses, setWarehouses] = useState<string[]>([]);
    const [filteredWarehouses, setFilteredWarehouses] = useState<string[]>([]);
    // const [loading, setLoading] = useState<boolean>(false);
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

      // setLoading(true);
      setError(null);

      try {
        const params: FetchWarehousesParams = {
          CityName: selectedCity,
          Limit: "100000",
        };

        if (deliveryType === "nova-poshta-poshtamat") {
          params.TypeOfWarehouseRef = "f9316480-5f2d-425d-bc2c-ac7cd29decf0";
        } else if (deliveryType === "nova-poshta-office") {
          params.TypeOfWarehouseRef = "841339c7-591a-42e2-8233-7a0a00f0ed6f";
        }

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
        // setLoading(false);
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
            disabled={disabled || !selectedCity} // Используем disabled
            maxLength={200}
          />
          {/* {loading && <div className="input__loading">Завантаження...</div>} */}
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
