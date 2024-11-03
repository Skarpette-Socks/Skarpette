import { useRef } from "react";
import Product from "../../Components/Product/Product";
import ProductRef from "../../types/ProductRef";
import { toast } from "react-toastify";

const AddProduct = () => {
  const productRef = useRef<ProductRef>(null);

  const saveItem = async () => {
    if (productRef.current?.getPageType() === 'add' && productRef.current?.isValid()) {
      const toastId = toast.loading("Завантаження...");
      const token = localStorage.getItem("authToken");
      if (!token) {
        return;
      }
  
      // Конвертуємо кожне зображення в Base64
      const images = await Promise.all(
        productRef.current?.getImages().map(async (file) => {
          const base64 = await toBase64(file); // Додаткова функція для конвертації
          return base64;
        })
      );
  
      const skarpetteData = {
        name: productRef.current?.getName(),
        description: productRef.current?.getDescription(),
        composition_and_care: productRef.current?.getCompAndCare(),
        type: productRef.current?.getCategory(),
        style: productRef.current?.getStyles(),
        price: productRef.current?.getPrice(),
        price2: productRef.current?.getPrice2(),
        is_new: productRef.current?.getIsNew(),
        size: productRef.current?.getSizes(),
        images, // Зображення як масив Base64
      };
  
      try {
        const response = await fetch("http://localhost:5000/skarpette", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(skarpetteData),
        });
  
        if (response.ok) {
          toast.update(toastId, {
            render: "Новий товар успішно додано!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        } else {
          toast.update(toastId, {
            render: "Помилка при відправці даних",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      } catch (error) {
        toast.update(toastId, {
          render: `Сталася помилка: ${error}`,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };
  
  // Функція для конвертації файлів у Base64
  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const defaultProps = {
    _id: '',
    name: '',
    description: '',
    vendor_code: 0,
    images_urls: [],
    composition_and_care: '',
    type: '',
    style: [],
    price: 0,
    price2: 0,
    is_new: false,
    is_hit: false,
    isTop: false,
    size: [],
  };

  return (
    <Product 
      ref={productRef} 
      pageType="add" 
      item={defaultProps}
      saveItem={saveItem}
    />
  );
};

export default AddProduct;