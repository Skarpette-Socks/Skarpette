import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataItem } from '../../api/fetchDataItem';
import DataItem from '../../types/DataItem';
import Product from '../../Components/Product/Product';
import ProductRef from '../../types/ProductRef';
import { toast } from "react-toastify";


const EditProduct = () => {
  const { VENDOR_CODE } = useParams<{ VENDOR_CODE: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [item, setItem] = useState<DataItem | null>(null);

  const productRef = useRef<ProductRef>(null);

  const loadData = useCallback(async () => {
    if (!VENDOR_CODE) return;
    setLoading(true);
    try {
      const result = await fetchDataItem(+VENDOR_CODE);
      console.log("res", result);
      setItem(result[0] || null);
      
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, [VENDOR_CODE]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveItem = async () => {
    if (productRef.current?.getPageType() === 'edit' && productRef.current?.isValid()) {
      const toastId = toast.loading("Завантаження...");
      const token = localStorage.getItem("authToken");
      if (!token) {
        return;
      }

      const images = await Promise.all(
        productRef.current?.getImages().map(async (file) => {
          const base64 = await toBase64(file);
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
        const response = await fetch(`http://localhost:5000/skarpette/${item._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(skarpetteData),
        });
  
        if (response.ok) {
          toast.update(toastId, {
            render: "Новий товар успішно оновлено!",
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

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  if (loading) {
    return ('завантаження...');
  }

  if (!item) {
    return ('такого товару не існує');
  }

  if (error) {
    return(error);
  }

  return (
    <Product 
      ref={productRef}  
      pageType='edit' 
      item={item}
      saveItem={saveItem}
    /> 
  )
}

export default EditProduct