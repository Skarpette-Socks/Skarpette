import { useState } from "react";
import CitiesInput from "../CitiesInput/CitiesInput";
import WarehouseInput from "../WarehouseInput/WarehouseInput";
import "./Delivery.scss";

const Delivery = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [resetWarehouse, setResetWarehouse] = useState<boolean>(false);
  const [selectedDeliveryType, setSelectedDeliveryType] =
    useState<string>("nova-poshta-office");

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setResetWarehouse(true);
  };

  const handleWarehouseReset = () => {
    setResetWarehouse(false);
  };

  const handleDeliveryOptionChange = (id: string) => {
    setSelectedDeliveryType(id);
    setResetWarehouse(true);
  };

  return (
    <div className="delivery">
      <div className="delivery__title">Доставка</div>
      <DeliveryOptions
        selectedOption={selectedDeliveryType}
        onOptionChange={handleDeliveryOptionChange}
      />
      <div className="delivery__inputs">
        <CitiesInput onCitySelect={handleCitySelect} />
        <WarehouseInput
          selectedCity={selectedCity}
          resetWarehouse={resetWarehouse}
          onWarehouseReset={handleWarehouseReset}
          deliveryType={selectedDeliveryType}
        />
      </div>
    </div>
  );
};

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
