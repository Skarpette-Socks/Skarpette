import React from "react";

import PromoCards from "../Components/PromoCards/PromoCards";
import MainPageListGoods from "../Components/MainPageListGoods/MainPageListGoods";
import PageNavigation from "../Components/PageNavigation/PageNavigation";
import ProductOrder from "../Components/ProductOrder/ProductOrder";


const Product: React.FC = () => {
  const listGoodsTitle = 'Вам може сподобатись';
  const product = 'Велопара Режим Польоту';

  return (
    <div>
      <PageNavigation
        linkText={product}
        homeLink="/"
        linkHref={`/${product}`}
      />

      <ProductOrder 
        name={product}
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