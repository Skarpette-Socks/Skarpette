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
import { useParams } from "react-router-dom";
import categories from "../../../json_links/categories.json";
import { getSocksByCategory } from "../../api/fetchDataByCategory";
import { fetchAllData } from "../../api/fetchAllData";


const SocksPage: React.FC = () => {
  const [socks, setSocks] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortedItems, setSortedItems] = useState<DataItem[]>([]);
  const { TYPE_LINK } = useParams<string>();

  console.log(TYPE_LINK);


  const category = 
    categories.find(category => category.link === `/catalog/${TYPE_LINK}`);

  console.log(category);


  const updateItemsPerPage = useCallback(() => {
    setItemsPerPage(window.innerWidth >= 1280 ? 16 : 12);
  }, []);

  useEffect(() => {
    if (category) {
      if (category.type === 'All') {
        const loadData = async () => {
          setLoading(true);
          try {
            const result = await fetchAllData();
            console.log('result', result);
  
            setSocks(result);
          } catch (error: any) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        loadData();
  
      } else {
        const loadData = async () => {
          setLoading(true);
          try {
            const result = await getSocksByCategory(category.type);
            console.log('result', result);
  
            setSocks(result);
          } catch (error: any) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
        loadData();
  
      }
    }
  }, [TYPE_LINK]);

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
  if (!category) return <div>Такої категорії не знайдено</div>;

  return (
    <>
      <PageNavigation linkText={category.dropdown_name} homeLink="/" linkHref={category.link} />

      <div className="socks">
        <h1 className="socks__title">{category?.dropdown_name}</h1>

        <div className="socks__filter-sort">
          <Filter
            selectedStyles={selectedStyles}
            selectedSizes={selectedSizes}
            onStyleChange={(style) => handleFilterChange("style", style)}
            onSizeChange={(size) => handleFilterChange("size", size)}
            onClearSizes={() => setSelectedSizes([])}
            onClearStyles={() => setSelectedStyles([])}
            sizes={category.sizes}
          />

          <Sort
            items={filteredSocks}
            selectedStyles={selectedStyles}
            selectedSizes={selectedSizes}
            setSortedItems={setSortedItems}
            setCurrentPage={setCurrentPage}
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
