import React from "react";

import "../../../styles/productManufacturer.scss";

const ProductManufacturer = ({ manufacturer }) => {
  console.log(manufacturer);
  return (
    <div className='product-manufacturer-container'>
      <h3>Manufacturer Details</h3>
      <div className='product-manufacturer__details'>
        <p>Manufacturer : {manufacturer.manufacturerName}</p>
        <p>Country Of Origin : {manufacturer.countryofOrigin}</p>
      </div>
    </div>
  );
};

export default ProductManufacturer;
