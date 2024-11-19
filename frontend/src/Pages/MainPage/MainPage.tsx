/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import CategoriesCarousel from "./MainPageComponents/CategoriesCarousel/CategoriesCarousel";
import PromoCards from "./MainPageComponents/PromoCards/PromoCards";
import Reviews from "./MainPageComponents/Reviews/Reviews";
import CustomSlider from "./MainPageComponents/Slider/CustomSlider";
import MainPageListGoods from "./MainPageComponents/MainPageListGoods/MainPageListGoods";
import { fetchGoods } from "../../api/fetchGoodsAtMainPage";
import DataItem from "../../types/DataItem";

const MainPage: React.FC = () => {
  const [newGoods, setNewGoods] = useState<DataItem[]>([]);
  const [hitGoods, setHitGoods] = useState<DataItem[]>([]);
  const [loadingNew, setLoadingNew] = useState<boolean>(true);
  const [loadingHit, setLoadingHit] = useState<boolean>(true);

useEffect(() => {
  fetchGoods("new")
    .then((data) => {
      const filteredNewGoods = data.map((item: any) => item.skarpette);
      setNewGoods(filteredNewGoods);
      setLoadingNew(false);
    })
    .catch((error) => {
      console.error("Ошибка при загрузке новинок:", error);
      setLoadingNew(false);
    });

  fetchGoods("hit")
    .then((data) => {
      const filteredHitGoods = data.map((item: any) => item.skarpette);
      setHitGoods(filteredHitGoods);
      setLoadingHit(false);
    })
    .catch((error) => {
      console.error("Ошибка при загрузке хитов:", error);
      setLoadingHit(false);
    });
}, []);


  return (
    <div>
      <CustomSlider />
      <CategoriesCarousel />
      <MainPageListGoods
        title="Новинки"
        goods={newGoods}
        loading={loadingNew}
      />
      <MainPageListGoods
        title="Хіт продажів"
        goods={hitGoods}
        loading={loadingHit}
      />
      <PromoCards />
      <Reviews />
    </div>
  );
};

export default MainPage;
