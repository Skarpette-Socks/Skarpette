/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import "./SocksPage.scss";

import DataItem from "../../types/DataItem";
import PageNavigation from "../../Components/PageNavigation/PageNavigation";
import Item from "../../Components/Item/Item";
import MobilePagination from "../../Components/MobilePagination/MobilePagination";
import Pagination from "../../Components/Pagination/Pagination";
import Filter from "../Filter/Filter"; // Import the filter component

interface SocksPageProps {
  fetchSocks: () => Promise<DataItem[]>;
  title: string;
  linkText: string;
  linkHref: string;
  sizes: string[]; // Новый проп для размеров
}

const SocksPage: React.FC<SocksPageProps> = ({
  fetchSocks,
  title,
  linkText,
  linkHref,
  sizes, // Получаем проп размеров
}) => {
  const [socks, setSocks] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

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

  // const newSock: DataItem = socks[0];
  // if (Array.isArray(newSock.size) && newSock.size.length > 0) {
  //   // Перевірка, що перший елемент масиву є об'єктом типу sizeItem
  //   if (typeof newSock.size[0] === 'object' && 'is_available' in newSock.size[0]) {
  //     newSock.size[0].is_available = false;
  //     const newArr = [newSock, ...socks];
    
  //     setSocks(newArr);
  //   }
  // }


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
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      window.scrollTo(0, 150);
    }
  }, [currentPage]);


  const filteredSocks = socks.filter((sock: DataItem) => {
    const matchesStyle =
      selectedStyles.length === 0 || selectedStyles.includes(sock.style);

    const matchesSize =
      selectedSizes.length === 0 ||
      (Array.isArray(sock.size) &&
        sock.size.some((sizeObj) => {
          if (typeof sizeObj === "string") {
            return selectedSizes.includes(sizeObj);
          } else if (typeof sizeObj === "object" && "size" in sizeObj) {
            if (sizeObj.is_available === true) {
              return selectedSizes.includes(sizeObj.size);
            }
          }
          return false;
        }));

    return matchesStyle && matchesSize;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSocks.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredSocks.length / itemsPerPage);

  const isMobile = window.innerWidth < 768;

  const handleStyleChange = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleClearStyles = () => {
    setSelectedStyles([]);
  };

  const handleClearSizes = () => {
    setSelectedSizes([]);
  };

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

        <Filter
          selectedStyles={selectedStyles}
          selectedSizes={selectedSizes}
          onStyleChange={handleStyleChange}
          onSizeChange={handleSizeChange}
          onClearSizes={handleClearSizes}
          onClearStyles={handleClearStyles}
          sizes={sizes} // Передаем размеры в компонент Filter
        />

        {filteredSocks.length === 0 ? (
          <div className="socks__no-items">
            За Вашим запитом нічого не знайдено :(
          </div>
        ) : (
          <>
            <div className="socks__items items-list">
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
          </>
        )}
      </div>
    </>
  );
};

export default SocksPage;
