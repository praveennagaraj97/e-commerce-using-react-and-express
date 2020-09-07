import React, { Fragment } from "react";

import "../../../styles/productManufacturer.scss";

const ProductManufacturer = ({ manufacturer }) => {
  if (!manufacturer) return <></>;
  return (
    <Fragment>
      <div className='product-manufacturer-container'>
        <h3>Manufacturer Details</h3>
        <div className='product-manufacturer__details'>
          <p>Manufacturer : {manufacturer.manufacturerName}</p>
          <p>Country Of Origin : {manufacturer.countryofOrigin}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductManufacturer;
