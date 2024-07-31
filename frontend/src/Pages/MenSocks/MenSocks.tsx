/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import "../WomanSocks/Socks.scss";

import DataItem from "../../types/DataItem";
import { getMenSocks } from "../../api/fetchDataByCategory";
import PageNavigation from "../../Components/PageNavigation/PageNavigation";
import Item from "../../Components/Item/Item";
import MobilePagination from "../../Components/MobilePagination/MobilePagination";
import Pagination from "../../Components/Pagination/Pagination";

const MenSocks = () => {
  const [MenSocks, setMenSocks] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await getMenSocks();
        setMenSocks(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const updateItemsPerPage = useCallback(() => {
    setItemsPerPage(window.innerWidth >= 768 ? 16 : 12);
  }, []);

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, [updateItemsPerPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = MenSocks.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(MenSocks.length / itemsPerPage);

  const isMobile = window.innerWidth < 768; // Определение мобильного устройства

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <PageNavigation
        linkText="Чоловічі шкарпетки"
        homeLink="/"
        linkHref="/mens-socks"
      />

      <div className="socks">
        <h1 className="socks__title">Чоловічі шкарпетки</h1>

        <div className="socks__items">
          {currentItems.map((item) => (
            <Item
              key={item._id}
              image={item.images_urls?.[0] || ""}
              category={item.type}
              name={item.name}
              new_price={item.price}
              old_price={item.price2}
            />
          ))}
        </div>
        {isMobile ? (
          <MobilePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        ) : (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

export default MenSocks;
