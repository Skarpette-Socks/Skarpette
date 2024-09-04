import React, { useState, useEffect, useCallback, useRef } from "react";
import { fetchCities } from "../../api/FetchCities";
import "../assets/styles/commonCheckoutInputesStyles.scss";

interface CitiesInputProps {
  onCitySelect: (city: string) => void;
}

const CitiesInput: React.FC<CitiesInputProps> = ({ onCitySelect }) => {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const fetchCitiesData = useCallback(async (query: string) => {
    if (query.length === 0) {
      setCities([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const citiesData = await fetchCities(query);
      setCities(citiesData);
      if (citiesData.length === 0) {
        setError("Місто не знайдено");
      }
    } catch (err) {
      setError("Помилка при виконанні запиту: " + (err as Error).message);
      setCities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCitiesData(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, fetchCitiesData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setIsOpen(true);
    setHighlightedIndex(-1);
    if (value.length === 0) {
      setError(null);
    }
  };

  const handleCitySelect = (city: string) => {
    setInputValue(city);
    setIsOpen(false);
    setCities([]);
    setError(null);
    onCitySelect(city);
  };

  const handleInputFocus = () => {
    if (cities.length > 0) {
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
        prevIndex < cities.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (event.key === "Enter" && highlightedIndex !== -1) {
      event.preventDefault();
      handleCitySelect(cities[highlightedIndex]);
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
          placeholder="Місто"
          className={`input__field ${error ? "input__field--error" : ""}`}
          maxLength={200}
        />
        <div>
        </div>
        {loading && (
          <div className="input__loading">Завантаження...</div>
        )}
      </div>
      {isOpen && cities.length > 0 && (
        <ul ref={listRef} className="input__list">
          {cities.map((city, index) => (
            <li
              key={index}
              onMouseDown={() => handleCitySelect(city)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`input__item ${
                index === highlightedIndex
                  ? "input__item--highlighted"
                  : ""
              }`}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
      {error && <div className="input__error">{error}</div>}
    </div>
  );
};

export default CitiesInput;
