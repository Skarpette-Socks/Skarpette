import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
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

interface CityInputRef {
  isValid: () => boolean;
  getCity: () => string | undefined;
}

const Delivery = forwardRef<DeliveryRef, DeliveryProps>(
  ({ selectedDeliveryType, setSelectedDeliveryType }, ref) => {
    const [selectedCity, setSelectedCity] = useState<string>(""); // Місто
    const [building, setBuilding] = useState<string>(""); // Будинок
    const [flat, setFlat] = useState<string>(""); // Квартира
    const [ukrPostWarehouse, setUkrPostWarehouse] = useState<string>(""); // Відділення
    const [resetWarehouse, setResetWarehouse] = useState<boolean>(false);
    const [resetStreet, setResetStreet] = useState<boolean>(false);

    const [selectedCityError, setSelectedCityError] = useState<string | null>(null);
    const [ukrPostError, setUkrPostError] = useState<string | null>(null);
    const [buildingError, setBuildingPostError] = useState<string | null>(null);
    const [flatError, setFlatPostError] = useState<string | null>(null);


    // Добавляем новое состояние для отслеживания выбора города
    const [isCitySelected, setIsCitySelected] = useState<boolean>(false);

    const streetInputRef = useRef<StreetInputRef>(null);
    const warehouseInputRef = useRef<WarehouseInputRef>(null);
    const cityInputRef = useRef<CityInputRef>(null);

    useEffect(() => {
      resetErrors();
      setUkrPostWarehouse('');
    }, [selectedDeliveryType]);

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

    const resetErrors = () => {
      setSelectedCityError(null);
      setUkrPostError(null);
      setBuildingPostError(null);
      setFlatPostError(null);
    }

    const isValidForm = () => {
      let error = false;
      resetErrors();

      switch (selectedDeliveryType) {
        case "nova-poshta-office": // 1
          error = 
            !cityInputRef.current?.isValid() || 
            !warehouseInputRef.current?.isValid();
          
          cityInputRef.current?.isValid();
          warehouseInputRef.current?.isValid();
          break;
        case "nova-poshta-courier": // 2
          error =
            !cityInputRef.current?.isValid() ||
            !streetInputRef.current?.isValid() ||
            !building ||
            !flat;

          cityInputRef.current?.isValid();
          streetInputRef.current?.isValid();

          if (!building) {
            setBuildingPostError('Заповніть поле');
          }

          if (!flat) {
            setFlatPostError('Заповніть поле');
          }
          break;
        case "nova-poshta-poshtamat": // 3
          error =
            !cityInputRef.current?.isValid() || 
            !warehouseInputRef.current?.isValid();

          cityInputRef.current?.isValid()
          warehouseInputRef.current?.isValid();

          break;
        case "ukrposhta-office": // 4
          error = 
            !cityInputRef.current?.isValid() || 
            !ukrPostWarehouse;
          
          cityInputRef.current?.isValid();


          if (!ukrPostWarehouse) {
            setUkrPostError('Заповніть поле');
          }
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
      setIsCitySelected(true); // Город выбран
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
      setSelectedCity(""); // Сбрасываем город при изменении типа доставки
      setIsCitySelected(false); // Город не выбран
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
            <CitiesInput 
              onCitySelect={handleCitySelect} 
              selectedCityError={selectedCityError} 
              ref={cityInputRef}
            />
            <WarehouseInput
              selectedCity={selectedCity}
              resetWarehouse={resetWarehouse}
              onWarehouseReset={handleWarehouseReset}
              deliveryType={selectedDeliveryType}
              ref={warehouseInputRef}
              disabled={!isCitySelected} // Поле заблокировано, если город не выбран
            />
          </div>
        )}

        {/* Вариант 2: Город, Улица, Дом и Квартира */}
        {selectedDeliveryType === "nova-poshta-courier" && (
          <div className="delivery__inputs-column">
            <div className="delivery__inputs">
            <CitiesInput 
              onCitySelect={handleCitySelect} 
              selectedCityError={selectedCityError} 
              ref={cityInputRef}
            />
              <StreetInput
                selectedCity={selectedCity}
                resetStreet={resetStreet}
                onStreetReset={handleStreetReset}
                ref={streetInputRef}
                disabled={!isCitySelected} // Поле заблокировано, если город не выбран
              />
            </div>
            <div className="delivery__inputs">
              <div className="input__container">
                <input
                  type="text"
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  className={`input__field ${buildingError ? "input__field--error" : ""}`}
                  placeholder="Будинок"
                  maxLength={50}
                  min={1}
                  required
                  disabled={!isCitySelected} // Поле заблокировано, если город не выбран
                />
                {buildingError && (
                  <div className="input__error">{buildingError}</div>
                )}
              </div>
              <div className="input__container">
                <input
                  type="text"
                  value={flat}
                  onChange={(e) => setFlat(e.target.value)}
                  className={`input__field ${flatError ? "input__field--error" : ""}`}
                  placeholder="Квартира"
                  maxLength={50}
                  min={1}
                  disabled={!isCitySelected} // Поле заблокировано, если город не выбран
                />
                {flatError && (
                  <div className="input__error">{flatError}</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Вариант 3: Город и Почтоматы */}
        {selectedDeliveryType === "nova-poshta-poshtamat" && (
          <div className="delivery__inputs">
            <CitiesInput 
              onCitySelect={handleCitySelect} 
              selectedCityError={selectedCityError} 
              ref={cityInputRef}
            />
            <WarehouseInput
              selectedCity={selectedCity}
              resetWarehouse={resetWarehouse}
              onWarehouseReset={handleWarehouseReset}
              deliveryType={selectedDeliveryType}
              ref={warehouseInputRef}
              disabled={!isCitySelected} // Поле заблокировано, если город не выбран
            />            
          </div>
        )}

        {/* Вариант 4: Город и Один Инпут Вручную */}
        {selectedDeliveryType === "ukrposhta-office" && (
          <div className="delivery__inputs">
            <CitiesInput 
              onCitySelect={handleCitySelect} 
              selectedCityError={selectedCityError}
              ref={cityInputRef} 
            />
            <div className="input__container">
              <input
                type="text"
                className={`input__field ${ukrPostError ? "input__field--error" : ""}`}
                placeholder="Відділення"
                value={ukrPostWarehouse}
                onChange={handleUkrPostWarehouseChange}
                maxLength={100}
                disabled={!isCitySelected} // Поле заблокировано, если город не выбран
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
