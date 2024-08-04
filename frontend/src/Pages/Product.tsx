import React, { useEffect, useState } from "react";

import PromoCards from "../Components/PromoCards/PromoCards";
import MainPageListGoods from "../Components/MainPageListGoods/MainPageListGoods";
import PageNavigation from "../Components/PageNavigation/PageNavigation";
import ProductOrder from "../Components/ProductOrder/ProductOrder";
import { fetchDataItem } from "../api/fetchDataItem";
import DataItem from "../types/DataItem";
import { useParams } from "react-router-dom";


const Product: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [item, setItem] = useState<DataItem>();
  const { VENDOR_CODE } = useParams<string>();

  const listGoodsTitle = 'Вам може сподобатись';

  useEffect(() => {
    if (VENDOR_CODE) {
      const loadData = async () => {
        setLoading(true);
        try {
          const result = await fetchDataItem(+VENDOR_CODE);
          setItem(result[0]);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      loadData();
    }
  }, [VENDOR_CODE]);

  useEffect(() => {
    console.log('item', item);
  }, [item]);

  useEffect(() => {
    console.log('vendor code', VENDOR_CODE);
  }, [VENDOR_CODE]);



  if (loading) {
    return (
      <>
        <h1
          style={{ textAlign: 'center', margin: '50px' }}
        ><strong>Завантаження...</strong></h1>
        <MainPageListGoods 
          title={listGoodsTitle} 
          catalogButton={false}
        />
      </>
    );
  }


  if (!item || VENDOR_CODE === '') {
    return (
      <>
        <h1
          style={{ textAlign: 'center', margin: '50px' }}
        ><strong>Такого товару не існує або він був видалений ;&#40;</strong></h1>
        <MainPageListGoods 
          title={listGoodsTitle} 
          catalogButton={false}
        />
      </>
    );
  }

  if (error) {
    return <div 
      style={{ textAlign: 'center', margin: '50px', fontSize: '32px' }}
    ><strong>Помилка ;&#40; <br/>{error}</strong></div>;
  }

  return (
    <div>
      <PageNavigation
        linkText={item.name}
        homeLink="/"
        linkHref={`/product/${item.vendor_code}`}
      />
  

      <ProductOrder 
        item={item}
      />

      <PromoCards />

      <MainPageListGoods 
        title={listGoodsTitle} 
        catalogButton={false}
      />
    </div>
  );
}

export default Product;