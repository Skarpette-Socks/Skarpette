import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import CartItem from "../types/CartItem";
import DataItem from "../types/DataItem";

interface AddCartItem {(
    item: DataItem,
    counter: number | '',
    selectedSize?: number
  ): void;
}

interface CounterCartItem {(
    cartItem: CartItem,
    count: number | ''
  ): void;
}

interface DeleteCartItem {(
  index: number
): void;
}

interface CartContextType {
  cartItems: CartItem[],
  addCartItem: AddCartItem,
  counterCartItem: CounterCartItem,
  deleteCartItem: DeleteCartItem
}


const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const useCartItems = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode}> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  
  const addCartItem: AddCartItem = ( item, counter, selectedSize ) => {
    if (selectedSize !== undefined) {
      const cartItem: CartItem = {
        vendor_code: item.vendor_code,
        size: item.size[selectedSize].size,
        name: item.name,
        type: item.type,
        image: item.images_urls[0],
        price: item.price,
        price2: item.price2,
        count: counter
      }

      const duplicateIndexes = cartItems
        .map((currentItem, currentIndex) => (
          currentItem.vendor_code === item.vendor_code ? currentIndex : -1
        ))
        .filter(index => index !== -1);

      let isChanged = false;

      duplicateIndexes.map(duplicateItem => {
        if (cartItems[duplicateItem]?.size === item.size[selectedSize].size) {
          if (counter !== '' && cartItems[duplicateItem].count !== undefined) {
            const newItem = cartItems[duplicateItem];
            if (newItem.count) {
              newItem.count += counter
            }
            setCartItems((cartItems) => [...cartItems])
            isChanged = true;
            return;
          }
        } 
      })

      if (!isChanged) {
        setCartItems([...cartItems, cartItem])
      }
    } 
  }

  const counterCartItem: CounterCartItem = (cartItem, count) => {
    setCartItems((prevCartItems) => {
      console.log('counter2');

      return prevCartItems.map((item) => {
        if (item.vendor_code === cartItem.vendor_code && typeof count === 'number') {
          if (item.size === cartItem.size) {
            return { ...item, count: count };
          }
        }
        return item;
      });
    });
  };

  const deleteCartItem: DeleteCartItem = (index) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.filter((_, i) => i !== index);
    });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ 
        cartItems, 
        addCartItem, 
        counterCartItem, 
        deleteCartItem 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}