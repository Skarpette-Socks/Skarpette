/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState, useMemo } from "react";
import "./Catalog.scss";
import DataItem from "../../types/DataItem";
import PageNavigation from "../../Components/PageNavigation/PageNavigation";
import Item from "../../Components/Item/Item";
import MobilePagination from "../../Components/MobilePagination/MobilePagination";
import Pagination from "../../Components/Pagination/Pagination";
import Filter from "./CatalogComponents/Filter/Filter";
import Sort from "./CatalogComponents/Sort/Sort";
import { useParams } from "react-router-dom";
import categories from "../../../json_links/categories.json";
import { getSocksByCategory } from "../../api/fetchDataByCategory";
import { fetchAllData } from "../../api/fetchAllData";
import Loader from "../../Components/Loader/Loader";
import PromoCards from "../MainPage/MainPageComponents/PromoCards/PromoCards";
import CatalogCategoryCircle from "./CatalogComponents/CatalogCategoryCircle/CatalogCategoryCircle";

const Catalog: React.FC = () => {
  const [socks, setSocks] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortedItems, setSortedItems] = useState<DataItem[]>([]);
  const { TYPE_LINK } = useParams<{ TYPE_LINK: string }>();

  const category = useMemo(
    () =>
      categories.find((category) => category.link === `/catalog/${TYPE_LINK}`),
    [TYPE_LINK]
  );

  const updateItemsPerPage = useCallback(() => {
    setItemsPerPage(window.innerWidth >= 1280 ? 16 : 12);
  }, []);

  const loadData = useCallback(async () => {
    if (!category) return;
    setLoading(true);
    try {
      const result =
        category.type === "All"
          ? await fetchAllData()
          : await getSocksByCategory(category.type);
      setSocks(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, [updateItemsPerPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleFilterChange = useCallback(
    (type: "style" | "size", value: string) => {
      const setSelected =
        type === "style" ? setSelectedStyles : setSelectedSizes;
      setSelected((prev) =>
        prev.includes(value)
          ? prev.filter((s) => s !== value)
          : [...prev, value]
      );
      setCurrentPage(1);
    },
    []
  );


  
  const filteredSocks = useMemo(() => {
    return socks.filter((sock) => {
      const newStyles = sock.style.split(',').map((style) => style.trim());
  
      const matchesStyle =
        selectedStyles.length === 0 ||
        newStyles.some((style) => selectedStyles.includes(style)); 

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

  const { currentItems, totalPages } = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return {
      currentItems: sortedItems.slice(indexOfFirstItem, indexOfLastItem),
      totalPages: Math.ceil(sortedItems.length / itemsPerPage),
    };
  }, [currentPage, itemsPerPage, sortedItems]);

  const isMobile = window.innerWidth < 768;

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!category) return <div>Такої категорії не знайдено</div>;

  return (
    <>
      <PageNavigation
        linkText={category.dropdown_name}
        homeLink="/"
        linkHref={category.link}
      />
      <div className="socks">
        <h1 className="socks__title">{category.dropdown_name}</h1>
        {category.type === "All" &&
          <CatalogCategoryCircle />
        }
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
              <PromoCards />
          </>
        )}
      </div>
    </>
  );
};

export default Catalog;
