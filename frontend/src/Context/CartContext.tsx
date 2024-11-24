import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import CartItem from "../types/CartItem";
import DataItem from "../types/DataItem";
import Toaster from "../Components/Toaster/Toaster";

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
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode}> = ({
  children,
}) => {
  const getUpdatedCart = ():CartItem[] => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }

  const [cartItems, setCartItems] = useState<CartItem[]>(getUpdatedCart());

  const updateCart = (items:CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(items));
  }

  useEffect(() => {
    updateCart(cartItems);
  }, [cartItems]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "cart") {
        const updatedCart = event.newValue ? JSON.parse(event.newValue) : [];
        setCartItems(updatedCart);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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

      let isChanged = false;

      setCartItems(() => {
        const updatedCart = getUpdatedCart();
        updatedCart.forEach((currentItem) => {
          if (
            currentItem.vendor_code === cartItem.vendor_code &&
            currentItem.size === cartItem.size
          ) {
            if (cartItem.count && currentItem.count) {
              currentItem.count += cartItem.count;
            }
            isChanged = true;
          }
        });
  

        if (!isChanged) {
          updatedCart.push(cartItem);
        }
  
        return updatedCart;
      });
  

      Toaster({ 
        text: 'Товар додано до кошику', 
        image: cartItem.image,
        name: cartItem.name,
        category: cartItem.type,
        price: cartItem.price,
        price2: cartItem.price2,
        size: cartItem.size,
        count: cartItem.count
      });
    } 
  }

  const counterCartItem: CounterCartItem = (cartItem, count) => {
    setCartItems((prevCartItems) => {
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