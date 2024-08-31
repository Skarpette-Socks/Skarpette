import { useState } from "react";
import CitiesInput from "../CitiesInput/CitiesInput";
import WarehouseInput from "../WarehouseInput/WarehouseInput";
import "./Delivery.scss";

const Delivery = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [resetWarehouse, setResetWarehouse] = useState<boolean>(false);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setResetWarehouse(true); // Устанавливаем флаг для сброса отделения
  };

  const handleWarehouseReset = () => {
    setResetWarehouse(false); // Сбрасываем флаг после обработки
  };

  return (
    <div className="delivery">
      <div className="delivery__title">Доставка</div>
      <DeliveryOptions />
      <div className="delivery__inputs">
        <CitiesInput onCitySelect={handleCitySelect} />
        <WarehouseInput
          selectedCity={selectedCity}
          resetWarehouse={resetWarehouse}
          onWarehouseReset={handleWarehouseReset}
        />
      </div>
    </div>
  );
};

export default Delivery;

const DeliveryOptions = () => {
  const [selectedOption, setSelectedOption] = useState("nova-poshta-office");

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

  const handleOptionChange = (id:string) => {
    setSelectedOption(id);
  };

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
              onChange={() => handleOptionChange(option.id)}
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
