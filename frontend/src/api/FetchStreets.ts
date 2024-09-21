import { searchSettlementStreets, SearchSettlementStreetsParams, SearchSettlementStreetsResponse } from "./FetchWarehouse";

export const fetchStreets = async (
  cityName: string,
  streetName: string
): Promise<string[]> => {
  const apiKey = "4ef7f616562477f2bf4173d436b118b3";
  const apiUrl = "https://api.novaposhta.ua/v2.0/json/";

  // Первый запрос: получение Ref для города
  const cityRequestData = {
    apiKey: apiKey,
    modelName: "Address",
    calledMethod: "searchSettlements",
    methodProperties: {
      CityName: cityName,
      Limit: "1",
    },
  };

  try {
    const cityResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cityRequestData),
    });

    const cityData = await cityResponse.json();

    // console.log("Full city data response:", JSON.stringify(cityData, null, 2));

    // Проверка данных, чтобы убедиться, что мы получили город
    if (!cityData.success || !cityData.data || cityData.data.length === 0) {
      console.error("City not found or data structure is unexpected", cityData);
      throw new Error("City not found");
    }

    // Получение Ref
    const settlementRef = cityData.data[0]?.Addresses?.[0]?.Ref;

    if (!settlementRef) {
      console.error("SettlementRef not found in city data", cityData);
      throw new Error("SettlementRef not found");
    }

    console.log("Found SettlementRef (actually 'Ref'):", settlementRef);

    // Второй запрос: поиск улиц по SettlementRef (Ref)
    const params: SearchSettlementStreetsParams = {
      StreetName: streetName,
      SettlementRef: settlementRef,
      Limit: "20",
    };

    const streetsResponse: SearchSettlementStreetsResponse =
      await searchSettlementStreets(params);

    return streetsResponse.Addresses.map((street) => street.Present);
  } catch (error) {
    console.error("Error fetching streets:", error);
    return [];
  }
};


