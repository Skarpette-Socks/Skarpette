/* eslint-disable @typescript-eslint/no-explicit-any */
// api.ts
export interface FetchWarehousesParams {
  FindByString?: string;
  CityName?: string;
  CityRef?: string;
  Page?: string;
  Limit?: string;
  Language?: string;
  TypeOfWarehouseRef?: string|string[];
  WarehouseId?: string;
}

export const fetchWarehouses = async (
  params: FetchWarehousesParams
): Promise<string[]> => {
  const apiKey = "8458c66029e49ba21b601db5e87123f4";
  const apiUrl = "https://api.novaposhta.ua/v2.0/json/";

  const requestData = {
    apiKey: apiKey,
    modelName: "AddressGeneral",
    calledMethod: "getWarehouses",
    methodProperties: params,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    // Проверяем структуру ответа
    if (data && data.data && Array.isArray(data.data)) {
      // Возвращаем только поле Description
      return data.data.map((warehouse: any) => warehouse.Description || "");
    } else {
      throw new Error("Ошибка API: Неверный формат ответа");
    }
  } catch (error) {
    throw new Error("Ошибка выполнения запроса: " + (error as Error).message);
  }
};

// Новая функция для получения типов отделений
export const fetchWarehouseTypes = async (): Promise<
  { Ref: string; Description: string; DescriptionRu: string }[]
> => {
  const apiKey = "8458c66029e49ba21b601db5e87123f4";
  const apiUrl = "https://api.novaposhta.ua/v2.0/json/";

  const requestData = {
    apiKey: apiKey,
    modelName: "AddressGeneral",
    calledMethod: "getWarehouseTypes",
    methodProperties: {},
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    // Проверяем структуру ответа
    if (data && data.data && Array.isArray(data.data)) {
      // Возвращаем массив объектов с типами отделений
      return data.data.map((type: any) => ({
        Ref: type.Ref,
        Description: type.Description,
        DescriptionRu: type.DescriptionRu,
      }));

    } else {
      throw new Error("Ошибка API: Неверный формат ответа");
    }
  } catch (error) {
    throw new Error("Ошибка выполнения запроса: " + (error as Error).message);
  }
  
};


export interface SearchSettlementStreetsParams {
  StreetName: string;
  SettlementRef: string;
  Limit?: string;
}

export interface StreetAddress {
  SettlementRef: string;
  SettlementStreetRef: string;
  SettlementStreetDescription: string;
  Present: string;
  StreetsType: string;
  StreetsTypeDescription: string;
  Location: {
    lat: number;
    lon: number;
  };
  SettlementStreetDescriptionRu: string;
}

export interface SearchSettlementStreetsResponse {
  TotalCount: string;
  Addresses: StreetAddress[];
}

export const searchSettlementStreets = async (
  params: SearchSettlementStreetsParams
): Promise<SearchSettlementStreetsResponse> => {
  const apiKey = "8458c66029e49ba21b601db5e87123f4";
  const apiUrl = "https://api.novaposhta.ua/v2.0/json/";

  const requestData = {
    apiKey: apiKey,
    modelName: "AddressGeneral",
    calledMethod: "searchSettlementStreets",
    methodProperties: params,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();


    // Проверяем структуру ответа и наличие данных
    if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
      const firstEntry = data.data[0];
      if (firstEntry.Addresses && Array.isArray(firstEntry.Addresses)) {
        return {
          TotalCount: firstEntry.TotalCount,
          Addresses: firstEntry.Addresses,
        };
      } else {
        throw new Error("Ошибка API: Отсутствует поле Addresses в данных");
      }
    } else {
      throw new Error("Ошибка API: Неверный формат ответа");
    }
  } catch (error) {
    console.error("Error fetching streets:", error);
    throw new Error("Ошибка выполнения запроса: " + (error as Error).message);
  }
};

