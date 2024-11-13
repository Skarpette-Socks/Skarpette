import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataItem } from '../../api/fetchDataItem';
import DataItem from '../../types/DataItem';
import Product from '../../Components/Product/Product';
import ProductPageType from "../../types/ProductPageType";


const EditProduct = () => {
  const { VENDOR_CODE } = useParams<{ VENDOR_CODE: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [item, setItem] = useState<DataItem | null>(null);

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
      pageType={ProductPageType.EDIT} 
      item={item}
      resetData={() => loadData()}
    /> 
  )
}

export default EditProduct