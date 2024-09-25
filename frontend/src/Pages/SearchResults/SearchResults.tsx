import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Item from "../../Components/Item/Item";
import DataItem from "../../types/DataItem";
import "./SearchResults.scss";
import PageNavigation from "../../Components/PageNavigation/PageNavigation";
import ErrorNoResult from "../../Components/ErrorNoResult/ErrorNoResult";
import MobilePagination from "../../Components/MobilePagination/MobilePagination";
import Pagination from "../../Components/Pagination/Pagination";

const SearchResultsPage: React.FC = () => {
  const [results, setResults] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [is404Error, setIs404Error] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      setIs404Error(false);
      try {
        const isVendorCode = /^\d+$/.test(query);

        const url = isVendorCode
          ? `http://localhost:5000/skarpette/search?vendor_code=${query}`
          : `http://localhost:5000/skarpette/search?name=${query}`;

        const response = await fetch(url);

        if (response.status === 404) {
          setIs404Error(true);
          throw new Error("Ресурс не найден");
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
        setError(
          "Произошла ошибка при загрузке данных. Пожалуйста, попробуйте еще раз."
        );
        setResults([]);
      }
      setLoading(false);
    };

    if (query) {
      fetchResults();
    } else {
      setLoading(false);
      setResults([]);
    }
  }, [query]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / itemsPerPage);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const updateItemsPerPage = useCallback(() => {
    setItemsPerPage(window.innerWidth >= 1280 ? 16 : 12);
  }, []);

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, [updateItemsPerPage]);

  if (loading) {
    return <div className="search-results">Загрузка...</div>;
  }

  if (is404Error) {
    return <ErrorNoResult query={query} />;
  }

  if (error) {
    return <div className="search-results error">{error}</div>;
  }

  return (
    <>
      <PageNavigation
        linkText="Результати пошуку"
        homeLink="/"
        linkHref="/search-results"
      />
      <div className="search-results">
        <h1>Результати пошуку для: "{query}"</h1>
        <>
          <div className="search-results-grid">
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
      </div>
    </>
  );
};

export default SearchResultsPage;
