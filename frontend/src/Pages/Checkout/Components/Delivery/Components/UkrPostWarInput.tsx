import React, { forwardRef, useImperativeHandle, useState } from "react";

import '../../../../../Components/assets/styles/commonCheckoutInputesStyles.scss';


interface FlatInputRef {
  isValid: () => boolean;
  getValue: () => string | undefined;
}

interface FlatInputProps {
  isCitySelected: boolean;
}

const UkrPostWarInput = forwardRef<FlatInputRef, FlatInputProps>(
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

    const handleUkrPostWarehouseChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = e.target.value;
      const isCyrillic = /^[\u0400-\u04FF0-9№/\s]*$/; // Добавлены цифры и спецсимволы
      setInputValue(value);

      if (isCyrillic.test(value) || value === "") {
        setError(null);
      } else {
        setError("Лише кирилиця, цифри і спецсимвол №");
      }
    };
    
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
            onChange={handleUkrPostWarehouseChange}
            className={`input__field ${error ? "input__field--error" : ""}`}
            placeholder="Відділення"
            maxLength={100}
            min={1}
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

export default UkrPostWarInput;