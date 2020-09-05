import React, { Fragment } from "react";

import "../../../styles/productBrief.scss";

const ProductBrief = ({ productDescription }) => {
  return (
    <Fragment>
      <h3 className='from-manufacturer-header'>From Manufacturer</h3>
      <p className='from-manufacturer__brief'>{productDescription}</p>
    </Fragment>
  );
};

export default ProductBrief;
