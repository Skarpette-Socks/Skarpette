import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import CitiesInput from "./DeliveryComponents/CitiesInput";
import WarehouseInput from "./DeliveryComponents/WarehouseInput";
import StreetInput from "./DeliveryComponents/StreetInput";
import "./Delivery.scss";
import BuildingInput from "./DeliveryComponents/BuildingInput";
import FlatInput from "./DeliveryComponents/FlatInput";
import UkrPostWarInput from "./DeliveryComponents/UkrPostWarInput";
import DeliveryOptions from "./DeliveryComponents/DeliveryOptions";

interface DeliveryProps {
  selectedDeliveryType: string;
  setSelectedDeliveryType: (s: string) => void;
}

interface DeliveryRef {
  isValid: () => boolean;
  getCity: () => string | undefined;
  getFlat: () => string | undefined;
  getBuilding: () => string | undefined;
  getWarehouseUkrPost: () => string | undefined;
  getWarehouseNovaPost: () => string | undefined;
  getStreet: () => string | undefined;
}

interface InputRef {
  isValid: () => boolean;
  getValue: () => string | undefined;
}


const Delivery = forwardRef<DeliveryRef, DeliveryProps>(
  (
    { 
      selectedDeliveryType, 
      setSelectedDeliveryType 
    }, ref
  ) => {
    const [resetWarehouse, setResetWarehouse] = useState<boolean>(false);
    const [resetStreet, setResetStreet] = useState<boolean>(false);
    const [isCitySelected, setIsCitySelected] = useState<boolean>(false);

    const cityInputRef = useRef<InputRef>(null);
    const flatInputRef = useRef<InputRef>(null);
    const streetInputRef = useRef<InputRef>(null);
    const buildingInputRef = useRef<InputRef>(null);
    const warehouseInputRef = useRef<InputRef>(null);
    const ukrPostWarehouseRef = useRef<InputRef>(null);

    useImperativeHandle(ref, () => ({
      isValid() {
        return isValidForm();
      },
      getCity() {
        return cityInputRef.current?.getValue();
      },
      getFlat() {
        return flatInputRef.current?.getValue();
      },
      getBuilding() {
        return buildingInputRef.current?.getValue();
      },
      getWarehouseUkrPost() {
        return ukrPostWarehouseRef.current?.getValue();
      },
      getWarehouseNovaPost() {
        return warehouseInputRef.current?.getValue();
      },
      getStreet() {
        return streetInputRef.current?.getValue();
      },
    }));

    const isValidForm = () => {
      let error = false;

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
            !buildingInputRef.current?.isValid() ||
            !flatInputRef.current?.isValid();

          cityInputRef.current?.isValid();
          streetInputRef.current?.isValid();
          buildingInputRef.current?.isValid();
          flatInputRef.current?.isValid();
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
            !ukrPostWarehouseRef.current?.isValid();
          
          cityInputRef.current?.isValid();
          ukrPostWarehouseRef.current?.isValid();
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

    useEffect(() => {
      setResetWarehouse(true);
      setResetStreet(true);
    },[isCitySelected])

    const handleCitySelect = () => {
      setIsCitySelected(true);
    };

    const handleWarehouseReset = () => {
      setTimeout(() => setResetWarehouse(false), 100);
    };

    const handleStreetReset = () => {
      setResetStreet(false);
    };

    const handleDeliveryOptionChange = (id: string) => {
      setSelectedDeliveryType(id);
      setIsCitySelected(false);

    };

    return (
      <div className="delivery">
        <div className="delivery__title">Доставка</div>
        <DeliveryOptions
          selectedOption={selectedDeliveryType}
          onOptionChange={handleDeliveryOptionChange}
        />

        {/* Варіант 1: Місто та Відділення Нової Пошти */}
        {selectedDeliveryType === "nova-poshta-office" && (
          <div className="delivery__inputs">
            <CitiesInput 
              onCitySelect={handleCitySelect}
              setIsCitySelected={setIsCitySelected}  
              ref={cityInputRef}
            />
            <WarehouseInput
              selectedCity={cityInputRef.current?.getValue()}
              resetWarehouse={resetWarehouse}
              onWarehouseReset={handleWarehouseReset}
              deliveryType={selectedDeliveryType}
              ref={warehouseInputRef}
              disabled={!isCitySelected}
            />
          </div>
        )}

        {/* Варіант 2: Місто, Вулиця, Будинок та Квартира */}
        {selectedDeliveryType === "nova-poshta-courier" && (
          <div className="delivery__inputs-column">
            <div className="delivery__inputs">
              <CitiesInput 
                onCitySelect={handleCitySelect}
                setIsCitySelected={setIsCitySelected} 
                ref={cityInputRef}
              />
              <StreetInput
                selectedCity={cityInputRef.current?.getValue()}
                resetStreet={resetStreet}
                onStreetReset={handleStreetReset}
                ref={streetInputRef}
                disabled={!isCitySelected}
              />
            </div>
            <div className="delivery__inputs">
              <BuildingInput 
                isCitySelected={isCitySelected}
                ref={buildingInputRef}
              />
              <FlatInput
                isCitySelected={isCitySelected}
                ref={flatInputRef}
              />
            </div>
          </div>
        )}

        {/* Варіант 3: Місто та Поштомати */}
        {selectedDeliveryType === "nova-poshta-poshtamat" && (
          <div className="delivery__inputs">
            <CitiesInput 
              onCitySelect={handleCitySelect}
              setIsCitySelected={setIsCitySelected} 
              ref={cityInputRef}
            />
            <WarehouseInput
              selectedCity={cityInputRef.current?.getValue()}
              resetWarehouse={resetWarehouse}
              onWarehouseReset={handleWarehouseReset}
              deliveryType={selectedDeliveryType}
              ref={warehouseInputRef}
              disabled={!isCitySelected}
            />            
          </div>
        )}

        {/* Варіант 4: Місто та Відділення укрпошти */}
        {selectedDeliveryType === "ukrposhta-office" && (
          <div className="delivery__inputs">
            <CitiesInput 
              onCitySelect={handleCitySelect}
              setIsCitySelected={setIsCitySelected} 
              ref={cityInputRef} 
            />
            <UkrPostWarInput
              isCitySelected={isCitySelected}
              ref={ukrPostWarehouseRef}
            />
          </div>
        )}
      </div>
    );
  }
);

export default Delivery;
