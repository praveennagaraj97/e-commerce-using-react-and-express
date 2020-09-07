import React, { Fragment } from "react";

import "../../../styles/productBrief.scss";

const ProductBrief = ({ productDescription, productBoards }) => {
  if (!productDescription) return <></>;

  return (
    <Fragment>
      <h3 className='from-manufacturer-header'>From Manufacturer</h3>
      <p className='from-manufacturer__brief'>{productDescription}</p>

      {/* Product Boards */}
      {productBoards ? (
        <div
          style={{ margin: "10px", backgroundColor: "white" }}
          className='product-based-boards'>
          {productBoards.map((board) => {
            return (
              <img
                style={{ marginTop: "-4px" }}
                key={board}
                width='100%'
                src={board}
                alt='ProductBoard'
              />
            );
          })}
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default ProductBrief;
