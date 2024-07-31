/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import "./Socks.scss";
import { getWomenSocks } from "../../api/fetchDataByCategory";
import Item from "../../Components/Item/Item";
import DataItem from "../../types/DataItem";
import PageNavigation from "../../Components/PageNavigation/PageNavigation";
import Pagination from "../../Components/Pagination/Pagination";
import MobilePagination from "../../Components/MobilePagination/MobilePagination";

const WomanSocks = () => {
  const [womenSocks, setWomenSocks] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await getWomenSocks();
        setWomenSocks(result);
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
  const currentItems = womenSocks.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(womenSocks.length / itemsPerPage);

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
        linkText="Жіночі шкарпетки"
        homeLink="/"
        linkHref="/womens-socks"
      />

      <div className="socks">
        <h1 className="socks__title">Жіночі шкарпетки</h1>

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

export default WomanSocks;
