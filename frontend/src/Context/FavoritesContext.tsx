/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import FavoriteItem from "../types/FavoriteItem";
import Toaster from "../Components/Toater/Toaster";

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (vendor_code: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialFavorites = useMemo(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  }, []);

  const [favorites, setFavorites] = useState<FavoriteItem[]>(initialFavorites);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites((prevFavorites) => {
      // Проверка на наличие элемента в избранном
      if (prevFavorites.some((fav) => fav.vendor_code === item.vendor_code)) {
        return prevFavorites; // Если элемент уже в избранном, не добавляем его повторно
      }
      return [...prevFavorites, item];
    });

    // Toaster({ 
    //   text: 'Товар додано до обраних', 
    //   image: item.image,
    //   name: item.name,
    //   category: item.category,
    //   price: item.price,
    //   price2: item.discount_price,
    //   favorites: true
    // });
  };

  const removeFromFavorites = (vendor_code: number) => {
    setFavorites((prevFavorites) => {
      // const item = prevFavorites.find((itm) => itm.vendor_code === vendor_code)

      // if (item) {
      //   Toaster({ 
      //     text: 'Товар видалено з обраних', 
      //     image: item.image,
      //     name: item.name,
      //     category: item.category,
      //     price: item.price,
      //     price2: item.discount_price,
      //     favorites: true
      //   });
      // }

      return prevFavorites.filter((itm) => itm.vendor_code !== vendor_code);
    });

  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
