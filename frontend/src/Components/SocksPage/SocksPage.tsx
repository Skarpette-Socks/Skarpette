/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import "./SocksPage.scss";

import DataItem from "../../types/DataItem";
import PageNavigation from "../../Components/PageNavigation/PageNavigation";
import Item from "../../Components/Item/Item";
import MobilePagination from "../../Components/MobilePagination/MobilePagination";
import Pagination from "../../Components/Pagination/Pagination";

interface SocksPageProps {
  fetchSocks: () => Promise<DataItem[]>;
  title: string;
  linkText: string;
  linkHref: string;
}

const SocksPage: React.FC<SocksPageProps> = ({
  fetchSocks,
  title,
  linkText,
  linkHref,
}) => {
  const [socks, setSocks] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchSocks();
        setSocks(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchSocks]);

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

  useEffect(() => {
    window.scrollTo(0, 150);
  }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = socks.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(socks.length / itemsPerPage);

  const isMobile = window.innerWidth < 768;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <PageNavigation linkText={linkText} homeLink="/" linkHref={linkHref} />

      <div className="socks">
        <h1 className="socks__title">{title}</h1>

        <div className="socks__items">
          {currentItems.map((item) => (
            <Item
              key={item._id}
              vendor_code={item.vendor_code}
              image={item.images_urls?.[0] || ""}
              category={item.type}
              name={item.name}
              new_price={item.price}
              old_price={item.price2}
              isNew={item.is_new}
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

export default SocksPage;
