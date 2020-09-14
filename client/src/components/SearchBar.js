import React, { Fragment, useEffect, useRef, useState } from "react";

import "../styles/searchBar.scss";
import useHandleClose from "../utils/useHandleClose";

import { loadViewProductDetail, loadGetProductsOnQuery } from "../actions";

import { apiBaseEndpoint } from "../api";
import { connect } from "react-redux";

import history from "../history";

const getSearchResults = async (searchTerm) => {
  return await apiBaseEndpoint.get(
    `/product/getProducts?searchin=productName&searchTerm=${searchTerm}&page=1&limit=4`
  );
};

const SearchBar = ({ viewProduct, getProductsFromSearchTerm }) => {
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

  const handleProductView = (id, categoryName) => {
    viewProduct({
      category: categoryName.toLowerCase(),
      id,
    });
  };

  const handleSearchList = (categoryId) => {
    getProductsFromSearchTerm(
      `?searchin=productName&searchTerm=${searchTerm}&categoryId=${categoryId._id}&page=1&limit=6`
    );

    history.push(`/category/${categoryId.categoryName.toLowerCase()}`);
  };

  return (
    <div
      ref={ref}
      onClick={() => setShowHandle(true)}
      className='products-search__bar'>
      <input
        onChange={(ev) => setSearchTerm(ev.target.value)}
        className='input-bar'
        spellCheck={false}
        placeholder='Find your favorite products'
      />

      {products.length > 0 && showHandle ? (
        <div className='searched-product__details'>
          <div
            onClick={() => handleSearchList(products[0].categoryId)}
            className='search-in-option'>
            {`Search for ${searchTerm} in ${products[0].categoryId.categoryName}`}
            <img
              src='https://img.icons8.com/fluent/50/000000/arrow.png'
              alt='arrow-forward'
            />
          </div>
          <hr />
          {products.map(
            ({ _id, productName, categoryId: { categoryName } }) => {
              return (
                <Fragment key={_id}>
                  <div
                    onClick={() => handleProductView(_id, categoryName)}
                    className='search-products-results'>
                    <h5>{productName}</h5>
                    <p>in {categoryName}</p>
                  </div>
                  <hr />
                </Fragment>
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
  );
};

const mapDispatchToProps = (dispatch) => ({
  viewProduct: (productDetail) =>
    dispatch(loadViewProductDetail(productDetail)),
  getProductsFromSearchTerm: (query) => dispatch(loadGetProductsOnQuery(query)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
