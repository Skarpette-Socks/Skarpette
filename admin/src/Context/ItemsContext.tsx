import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ItemsContextType {
  newItemsCount: number | null;
  hitItemsCount: number | null;
  fetchItems: () => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [newItemsCount, setNewItemsCount] = useState<number | null>(null);
  const [hitItemsCount, setHitItemsCount] = useState<number | null>(null);

  const fetchItems = async () => {
    try {
      const [newResponse, hitResponse] = await Promise.all([
        fetch("http://localhost:5000/new"),
        fetch("http://localhost:5000/hit"),
      ]);

      const newData = await newResponse.json();
      const hitData = await hitResponse.json();

      setNewItemsCount(Array.isArray(newData) ? newData.length : 0);
      setHitItemsCount(Array.isArray(hitData) ? hitData.length : 0);
    } catch (error) {
      console.error("Error fetching new and hit items", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <ItemsContext.Provider value={{ newItemsCount, hitItemsCount, fetchItems }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItemsContext = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItemsContext must be used within an ItemsProvider");
  }
  return context;
};
