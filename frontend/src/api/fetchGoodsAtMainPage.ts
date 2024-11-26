import DataItem from "../types/DataItem";

interface PromiseDataItem {
  newId: string,
  skarpette: DataItem,
}

export const fetchGoods = async (type: "new" | "hit"): Promise<PromiseDataItem[]> => {
  try {
    const response = await fetch(`http://localhost:5000/${type}`);
    const data = await response.json();

    return data
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return [];
  }
};
