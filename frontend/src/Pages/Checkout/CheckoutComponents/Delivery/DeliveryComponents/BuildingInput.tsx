import { forwardRef, useImperativeHandle, useState } from "react";

import '../../../../../assets/styles/commonCheckoutInputesStyles.scss';


interface BuildingInputRef {
  isValid: () => boolean;
  getValue: () => string | undefined;
}

interface BuildingInputProps {
  isCitySelected: boolean;
}

const BuildingInput = forwardRef<BuildingInputRef, BuildingInputProps>(
  (
    {
      isCitySelected
    }, ref
  ) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [error, setError] = useState<string | null>(null);


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
      }

      return !error;
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      setError('');
    }

    return (
      <div className="input"
      title={!isCitySelected ? 'Оберіть місто' : ''}
      >
        <div className="input__container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className={`input__field ${error ? "input__field--error" : ""}`}
            placeholder="Будинок"
            maxLength={50}
            min={1}
            required
            disabled={!isCitySelected}
          />
          {error && (
            <div className="input__error">{error}</div>
          )}
        </div>
      </div>
    );
  }
);

export default BuildingInput;