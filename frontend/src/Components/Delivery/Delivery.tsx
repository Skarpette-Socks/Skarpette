import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import CitiesInput from "../CitiesInput/CitiesInput";
import WarehouseInput from "../WarehouseInput/WarehouseInput";
import StreetInput from "../StreetInput/StreetInput";
import "./Delivery.scss";

interface DeliveryProps {
  selectedDeliveryType: string;
  setSelectedDeliveryType: (s: string) => void;
}

interface DeliveryRef {
  isValid: () => boolean;
  getCity: () => string;
  getBuilding: () => string;
  getFlat: () => string;
  getWarehouseUkrPost: () => string;
  getWarehouseNovaPost: () => string | undefined;
  getStreet: () => string | undefined;
}

interface StreetInputRef {
  isValid: () => boolean;
  getStreet: () => string | undefined;
}

interface WarehouseInputRef {
  isValid: () => boolean;
  getWarehouse: () => string | undefined;
}

const Delivery = forwardRef<DeliveryRef, DeliveryProps>(
  ({ selectedDeliveryType, setSelectedDeliveryType }, ref) => {
    const [selectedCity, setSelectedCity] = useState<string>(""); //місто
    const [building, setBuilding] = useState<string>(""); //будинок
    const [flat, setFlat] = useState<string>(""); //квартира
    const [ukrPostWarehouse, setUkrPostWarehouse] = useState<string>(""); //Відділення

    const [ukrPostError, setUkrPostError] = useState<string | null>(null);

    const [resetWarehouse, setResetWarehouse] = useState<boolean>(false);
    const [resetStreet, setResetStreet] = useState<boolean>(false);

    const streetInputRef = useRef<StreetInputRef>(null);
    const warehouseInputRef = useRef<WarehouseInputRef>(null);

    useImperativeHandle(ref, () => ({
      isValid() {
        return isValidForm();
      },
      getCity() {
        return selectedCity;
      },
      getBuilding() {
        return building;
      },
      getFlat() {
        return flat;
      },
      getWarehouseUkrPost() {
        return ukrPostWarehouse;
      },
      getWarehouseNovaPost() {
        return warehouseInputRef.current?.getWarehouse();
      },
      getStreet() {
        return streetInputRef.current?.getStreet();
      },
    }));

    const isValidForm = () => {
      let error = false;

      switch (selectedDeliveryType) {
        case "nova-poshta-office":
          error = !selectedCity || !warehouseInputRef.current?.getWarehouse();

          break;
        case "nova-poshta-courier":
          error =
            !selectedCity ||
            !streetInputRef.current?.getStreet() ||
            !building ||
            !flat;

          break;
        case "nova-poshta-poshtamat":
          error = !selectedCity || !warehouseInputRef.current?.getWarehouse();

          break;
        case "ukrposhta-office":
          error = !selectedCity || !ukrPostWarehouse;

          break;
        default:
          break;
      }

      if (error) {
        const el = document.querySelector(".delivery");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }

      return !error;
    };

    const handleCitySelect = (city: string) => {
      setSelectedCity(city);
      setResetWarehouse(true);
      setResetStreet(true);
    };

    const handleWarehouseReset = () => {
      setTimeout(() => setResetWarehouse(false), 100);
    };

    const handleStreetReset = () => {
      setResetStreet(false);
    };

    const handleDeliveryOptionChange = (id: string) => {
      setSelectedDeliveryType(id);
      setResetWarehouse(true);
      setResetStreet(true);
    };

    const handleUkrPostWarehouseChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = e.target.value;
      const isCyrillic = /^[\u0400-\u04FF0-9№/\s]*$/; // Добавлены цифры и спецсимволы
      setUkrPostWarehouse(value);

      if (isCyrillic.test(value) || value === "") {
        setUkrPostError(null);
      } else {
        setUkrPostError("Лише кирилиця, цифри і спецсимвол №");
      }
    };

    return (
      <div className="delivery">
        <div className="delivery__title">Доставка</div>
        <DeliveryOptions
          selectedOption={selectedDeliveryType}
          onOptionChange={handleDeliveryOptionChange}
        />

        {/* Вариант 1: Город и Отделение */}
        {selectedDeliveryType === "nova-poshta-office" && (
          <div className="delivery__inputs">
            <CitiesInput onCitySelect={handleCitySelect} />
            <WarehouseInput
              selectedCity={selectedCity}
              resetWarehouse={resetWarehouse}
              onWarehouseReset={handleWarehouseReset}
              deliveryType={selectedDeliveryType}
              ref={warehouseInputRef}
            />
          </div>
        )}

        {/* Вариант 2: Город, Улица, Дом и Квартира */}
        {selectedDeliveryType === "nova-poshta-courier" && (
          <div className="delivery__inputs-column">
            <div className="delivery__inputs">
              <CitiesInput onCitySelect={handleCitySelect} />
              <StreetInput
                selectedCity={selectedCity}
                resetStreet={resetStreet}
                onStreetReset={handleStreetReset}
                ref={streetInputRef}
              />
            </div>
            <div className="delivery__inputs">
              <div className="input__container">
                <input
                  type="text"
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  className="input__field"
                  placeholder="Будинок"
                  maxLength={50}
                  min={1}
                  required
                />
              </div>
              <div className="input__container">
                <input
                  type="text"
                  value={flat}
                  onChange={(e) => setFlat(e.target.value)}
                  className="input__field"
                  placeholder="Квартира"
                  maxLength={50}
                  min={1}
                />
              </div>
            </div>
          </div>
        )}

        {/* Вариант 3: Город и Почтоматы */}
        {selectedDeliveryType === "nova-poshta-poshtamat" && (
          <div className="delivery__inputs">
            <CitiesInput onCitySelect={handleCitySelect} />
            <WarehouseInput
              selectedCity={selectedCity}
              resetWarehouse={resetWarehouse}
              onWarehouseReset={handleWarehouseReset}
              deliveryType={selectedDeliveryType}
              ref={warehouseInputRef}
            />
          </div>
        )}

        {/* Вариант 4: Город и Один Инпут Вручную */}
        {selectedDeliveryType === "ukrposhta-office" && (
          <div className="delivery__inputs">
            <CitiesInput onCitySelect={handleCitySelect} />
            <div className="input__container">
              <input
                type="text"
                className={`input__field ${ukrPostError ? "input__field--error" : ""}`}
                placeholder="Відділення"
                value={ukrPostWarehouse}
                onChange={handleUkrPostWarehouseChange}
                maxLength={100}
              />
              {ukrPostError && (
                <div className="input__error">{ukrPostError}</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

interface DeliveryOptionsProps {
  selectedOption: string;
  onOptionChange: (id: string) => void;
}

const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  selectedOption,
  onOptionChange,
}) => {
  const deliveryOptions = [
    {
      id: "nova-poshta-office",
      name: "Відділення Нової Пошти",
      duration: "3 робочі дні",
    },
    {
      id: "nova-poshta-courier",
      name: "Кур'єр Нової Пошти",
      duration: "2 робочі дні",
    },
    {
      id: "nova-poshta-poshtamat",
      name: "Поштомат Нової Пошти",
      duration: "3 робочі дні",
    },
    {
      id: "ukrposhta-office",
      name: "Відділення Укрпошти",
      duration: "3-5 робочих днів",
    },
  ];

  return (
    <div className="delivery__options">
      {deliveryOptions.map((option) => (
        <label
          key={option.id}
          className={`delivery__option ${
            selectedOption === option.id ? "delivery__option--selected" : ""
          }`}
        >
          <div className="delivery__option-checkbox">
            <input
              type="radio"
              name="delivery"
              checked={selectedOption === option.id}
              onChange={() => onOptionChange(option.id)}
            />
            <span className="delivery__option-checkmark"></span>
          </div>
          <div className="delivery__option-content">
            <div className="delivery__option-main">
              <div className="delivery__option-info">
                <span className="delivery__option-name">{option.name}</span>
                <span className="delivery__option-duration">
                  {option.duration}
                </span>
              </div>
              <span className="delivery__option-tariff">За тарифами</span>
            </div>
          </div>
        </label>
      ))}
    </div>
  );
};

export default Delivery;
