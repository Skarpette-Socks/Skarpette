import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import PromoCards from "../Components/PromoCards/PromoCards";
import MainPageListGoods from "../Components/MainPageListGoods/MainPageListGoods";
import PageNavigation from "../Components/PageNavigation/PageNavigation";
import ProductOrder from "../Components/ProductOrder/ProductOrder";
import { fetchDataItem } from "../api/fetchDataItem";
import DataItem from "../types/DataItem";
import Loader from "../Components/Loader/Loader";
import no_result from "../Components/assets/img/NoSearchResult.png";
import "../Components/ErrorNoResult/ErrorNoResult.scss";

const Product: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [item, setItem] = useState<DataItem | null>(null);
  const { VENDOR_CODE } = useParams<{ VENDOR_CODE: string }>();

  const listGoodsTitle = "Вам може сподобатись";

  const loadData = useCallback(async () => {
    if (!VENDOR_CODE) return;
    setLoading(true);
    try {
      const result = await fetchDataItem(+VENDOR_CODE);
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
    return (
      <>
        <Loader />
        <MainPageListGoods title={listGoodsTitle} catalogButton={false} />
      </>
    );
  }

  if (!item || !VENDOR_CODE) {
    return (
      <>
        <PageNavigation
          linkText="Каталог"
          homeLink="/"
          linkHref="/catalog/all-socks"
        />
        <div className="error-component">
          <img
            src={no_result}
            alt="no_result"
            className="error-component__img"
          />
          <p className="error-component__text">
            Такого товару не існує або він був видалений
          </p>
          <Link to="/catalog/all-socks">
            <button className="error-component__button">
              Перейти до каталогу
            </button>
          </Link>
        </div>
        <MainPageListGoods title={listGoodsTitle} catalogButton={false} />
      </>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", margin: "50px", fontSize: "32px" }}>
        <strong>
          Помилка ;&#40; <br />
          {error}
        </strong>
      </div>
    );
  }

  return (
    <div>
      <PageNavigation
        linkText={item.name}
        homeLink="/"
        linkHref={`/product/${item.vendor_code}`}
      />
      <ProductOrder item={item} />
      <PromoCards />
      <MainPageListGoods title={listGoodsTitle} catalogButton={false} />
    </div>
  );
};

export default Product;
