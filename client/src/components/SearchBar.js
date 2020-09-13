import React from "react";

import "../styles/searchBar.scss";

const testProducts = [
  {
    _id: "5f527e74edcade22646b0b5c",
    productName: "Apple iPhone 11 (128GB) - (Product) RED",
    categoryId: "5f45937abd14352638c6e791",
    productPrice: 73600,
    productCoverImage:
      "https://storage.googleapis.com/lexa-product-covers/iphone11-red.jpg",
    createdAt: "2020-09-04T17:50:44.846Z",
    updatedAt: "2020-09-04T17:50:44.846Z",
    id: "5f527e74edcade22646b0b5c",
  },
  {
    _id: "5f527b55896d730b7457ec5c",
    productName: "Apple iPhone 11 (128GB) - Black",
    categoryId: "5f45937abd14352638c6e791",
    productPrice: 69900,
    productCoverImage:
      "https://storage.googleapis.com/lexa-product-covers/iphone11.jpg",
    createdAt: "2020-09-04T17:37:26.059Z",
    updatedAt: "2020-09-04T17:37:26.059Z",
    id: "5f527b55896d730b7457ec5c",
  },
  {
    _id: "5f527e98edcade22646b0b5d",
    productName: "Apple iPhone 11 (128GB) - Purple",
    categoryId: "5f45937abd14352638c6e791",
    productPrice: 73600,
    productCoverImage:
      "https://storage.googleapis.com/lexa-product-covers/iphone11-purple.jpg",
    createdAt: "2020-09-04T17:51:20.351Z",
    updatedAt: "2020-09-04T17:51:20.351Z",
    id: "5f527e98edcade22646b0b5d",
  },
  {
    _id: "5f527e35edcade22646b0b5a",
    productName: "Apple iPhone 11 (128GB) - White",
    categoryId: "5f45937abd14352638c6e791",
    productPrice: 73600,
    productCoverImage:
      "https://storage.googleapis.com/lexa-product-covers/iphone11-white.jpg",
    createdAt: "2020-09-04T17:49:42.148Z",
    updatedAt: "2020-09-04T17:49:42.148Z",
    id: "5f527e35edcade22646b0b5a",
  },
  {
    _id: "5f527f41edcade22646b0b5f",
    productName: "Apple iPhone 11 (256GB) - (Product) RED",
    categoryId: "5f45937abd14352638c6e791",
    productPrice: 84100,
    productCoverImage:
      "https://storage.googleapis.com/lexa-product-covers/iphone11-red.jpg",
    createdAt: "2020-09-04T17:54:09.613Z",
    updatedAt: "2020-09-04T17:54:09.613Z",
    id: "5f527f41edcade22646b0b5f",
  },
  {
    _id: "5f527f8cedcade22646b0b61",
    productName: "Apple iPhone 11 (256GB) - Black",
    categoryId: "5f45937abd14352638c6e791",
    productPrice: 84100,
    productCoverImage:
      "https://storage.googleapis.com/lexa-product-covers/iphone11.jpg",
    createdAt: "2020-09-04T17:55:24.734Z",
    updatedAt: "2020-09-04T17:55:24.734Z",
    id: "5f527f8cedcade22646b0b61",
  },
];

const SearchBar = () => {
  return (
    <div className='products-search__bar'>
      <input className='input-bar' placeholder='Find your favorite products' />
      <div className='searched-product__details'>
        {testProducts.map(({ _id, productName }) => {
          return (
            <div className='search-products-results'>
              <h5>{productName}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;
