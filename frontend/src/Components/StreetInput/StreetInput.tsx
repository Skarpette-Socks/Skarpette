import React, { useState, useEffect, useCallback, useRef } from "react";
import { fetchStreets } from "../../api/FetchStreets";

import "../assets/styles/commonCheckoutInputesStyles.scss";

interface StreetInputProps {
  selectedCity: string;
  resetStreet: boolean;
  onStreetReset: () => void;
}

const StreetInput: React.FC<StreetInputProps> = ({
  selectedCity,
  resetStreet,
  onStreetReset,
}) => {
  const [filteredStreets, setFilteredStreets] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const fetchStreetsData = useCallback(
    async (query: string) => {
      if (!selectedCity || query.length < 2) {
        setFilteredStreets([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const streetsData = await fetchStreets(selectedCity, query);
        setFilteredStreets(streetsData);
        if (streetsData.length === 0) {
          setError("Вулиць не знайдено");
        }
      } catch (err) {
        console.error("Error in fetchStreetsData:", err);
        setError("Помилка при виконанні запиту: " + (err as Error).message);
        setFilteredStreets([]);
      } finally {
        setLoading(false);
      }
    },
    [selectedCity]
  );

  useEffect(() => {
    if (inputValue.length >= 2) {
      fetchStreetsData(inputValue);
    } else {
      setFilteredStreets([]);
    }
  }, [fetchStreetsData, inputValue]);

  useEffect(() => {
  }, [selectedCity]);

  useEffect(() => {
    if (resetStreet) {
      setInputValue("");
      setFilteredStreets([]);
      setError(null);
      setIsOpen(false);
      setHighlightedIndex(-1);
      onStreetReset();
    }
  }, [resetStreet, onStreetReset]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setIsOpen(true);
  };

  const handleStreetSelect = (street: string) => {
    console.log("Street selected:", street);
    setInputValue(street);
    setIsOpen(false);
    setError(null);
  };

  const handleInputFocus = () => {
    if (filteredStreets.length > 0) {
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
        prevIndex < filteredStreets.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (event.key === "Enter" && highlightedIndex !== -1) {
      event.preventDefault();
      handleStreetSelect(filteredStreets[highlightedIndex]);
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
          placeholder="Вулиця"
          className={`input__field ${error ? "input__field--error" : ""}`}
          disabled={!selectedCity}
          maxLength={200}
        />
        {loading && <div className="input__loading">Завантаження...</div>}
      </div>
      {isOpen && filteredStreets.length > 0 && (
        <ul ref={listRef} className="input__list">
          {filteredStreets.map((street, index) => (
            <li
              key={index}
              onMouseDown={() => handleStreetSelect(street)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`input__item ${
                index === highlightedIndex ? "input__item--highlighted" : ""
              }`}
            >
              {street}
            </li>
          ))}
        </ul>
      )}
      {error && <div className="input__error">{error}</div>}
    </div>
  );
};

export default StreetInput;
