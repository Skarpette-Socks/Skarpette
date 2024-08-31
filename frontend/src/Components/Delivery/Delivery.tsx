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
