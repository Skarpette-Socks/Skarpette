/* eslint-disable @typescript-eslint/no-explicit-any */
// api.ts
export const fetchCities = async (searchQuery: string): Promise<string[]> => {
  const apiKey = "8458c66029e49ba21b601db5e87123f4";
  const apiUrl = "https://api.novaposhta.ua/v2.0/json/";

  const requestData = {
    apiKey: apiKey,
    modelName: "AddressGeneral",
    calledMethod: "getCities",
    methodProperties: {
      Page: "1",
      Warehouse: "1",
      FindByString: searchQuery, // Используем строку для фильтрации городов
      Limit: "20",
    },
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

    if (data.success) {
      return data.data.map((city: any) => city.Description);
    } else {
      console.error("API Error:", data.errors.join(", "));
      return [];
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
};
