/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState, useMemo } from "react";
import "./SocksPage.scss";

import DataItem from "../../types/DataItem";
import PageNavigation from "../../Components/PageNavigation/PageNavigation";
import Item from "../../Components/Item/Item";
import MobilePagination from "../../Components/MobilePagination/MobilePagination";
import Pagination from "../../Components/Pagination/Pagination";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";

interface SocksPageProps {
  fetchSocks: () => Promise<DataItem[]>;
  title: string;
  linkText: string;
  linkHref: string;
  sizes: string[];
}

const SocksPage: React.FC<SocksPageProps> = ({
  fetchSocks,
  title,
  linkText,
  linkHref,
  sizes,
}) => {
  const [socks, setSocks] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortedItems, setSortedItems] = useState<DataItem[]>([]);

  const updateItemsPerPage = useCallback(() => {
    setItemsPerPage(window.innerWidth >= 768 ? 16 : 12);
  }, []);

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

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, [updateItemsPerPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleFilterChange = useCallback(
    (type: "style" | "size", value: string) => {
      if (type === "style") {
        setSelectedStyles((prev) =>
          prev.includes(value)
            ? prev.filter((s) => s !== value)
            : [...prev, value]
        );
      } else if (type === "size") {
        setSelectedSizes((prev) =>
          prev.includes(value)
            ? prev.filter((s) => s !== value)
            : [...prev, value]
        );
      }
      setCurrentPage(1);
    },
    []
  );

  const filteredSocks = useMemo(() => {
    return socks.filter((sock) => {
      const matchesStyle =
        selectedStyles.length === 0 || selectedStyles.includes(sock.style);
      const matchesSize =
        selectedSizes.length === 0 ||
        (Array.isArray(sock.size) &&
          sock.size.some((sizeObj) =>
            typeof sizeObj === "string"
              ? selectedSizes.includes(sizeObj)
              : sizeObj.is_available && selectedSizes.includes(sizeObj.size)
          ));

      return matchesStyle && matchesSize;
    });
  }, [socks, selectedStyles, selectedSizes]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const isMobile = window.innerWidth < 768;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <PageNavigation linkText={linkText} homeLink="/" linkHref={linkHref} />

      <div className="socks">
        <h1 className="socks__title">{title}</h1>

        <div className="socks__filter-sort">
          <Filter
            selectedStyles={selectedStyles}
            selectedSizes={selectedSizes}
            onStyleChange={(style) => handleFilterChange("style", style)}
            onSizeChange={(size) => handleFilterChange("size", size)}
            onClearSizes={() => setSelectedSizes([])}
            onClearStyles={() => setSelectedStyles([])}
            sizes={sizes}
          />

          <Sort
            items={filteredSocks}
            selectedStyles={selectedStyles}
            selectedSizes={selectedSizes}
            setSortedItems={setSortedItems}
          />
        </div>

        {sortedItems.length === 0 ? (
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
                  price={item.price}
                  discount_price={item.price2}
                  isNew={item.is_new}
                  discountPercentage={item.discountPercentage}
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
