import { forwardRef, useImperativeHandle, useState } from "react";

import '../../../../../Components/assets/styles/commonCheckoutInputesStyles.scss';


interface FlatInputRef {
  isValid: () => boolean;
  getValue: () => string | undefined;
}

interface FlatInputProps {
  isCitySelected: boolean;
}

const FlatInput = forwardRef<FlatInputRef, FlatInputProps>(
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
        setError("Заповніть поле")
      }

      return !error;
    }

    return (
      <div className="input">
        <div className="input__container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`input__field ${error ? "input__field--error" : ""}`}
            placeholder="Квартира"
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

export default FlatInput;