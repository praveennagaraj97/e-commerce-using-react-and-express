import React, { Fragment, useEffect, useRef, useState } from "react";

import "../styles/searchBar.scss";
import useHandleClose from "../utils/useHandleClose";

import { apiBaseEndpoint } from "../api";

const getSearchResults = async (searchTerm) => {
  return await apiBaseEndpoint.get(
    `/product/getProducts?searchin=productName&searchTerm=${searchTerm}&page=1&limit=6`
  );
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [showHandle, setShowHandle] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const timeId = setTimeout(() => {
      (async (searchTerm) => {
        try {
          if (searchTerm) {
            const response = await getSearchResults(searchTerm);
            if (response.data.message !== "No Document Found")
              setProducts(response.data.details);
            else {
              setProducts([]);
            }
          }
        } catch (err) {
          setProducts([]);
        }
      })(searchTerm);
    }, 700);

    return () => {
      clearTimeout(timeId);
    };
  }, [searchTerm]);

  useHandleClose(ref, () => {
    setShowHandle(false);
  });

  return (
    <Fragment>
      <div
        ref={ref}
        onClick={() => setShowHandle(true)}
        className='products-search__bar'>
        <input
          onChange={(ev) => setSearchTerm(ev.target.value)}
          className='input-bar'
          placeholder='Find your favorite products'
        />
        {products.length > 0 && showHandle ? (
          <div className='searched-product__details'>
            {products.map(
              ({ _id, productName, categoryId: { categoryName } }) => {
                return (
                  <div key={_id} className='search-products-results'>
                    <h5>{productName}</h5>
                    <p>in {categoryName}</p>
                  </div>
                );
              }
            )}
          </div>
        ) : showHandle && products.length === 0 ? (
          <div className='searched-product__details'>No Products Found</div>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
};

export default SearchBar;
