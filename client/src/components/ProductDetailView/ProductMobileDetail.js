import React, { Fragment } from "react";
import { connect } from "react-redux";

// import ProductAdvertiseBoard from "./ProductAdvertiseBoard";
import ProductImageAndBrief from "./ProductImageAndBrief";

const ProductMobileDetail = ({ productDetails }) => {
  if (productDetails) {
    return (
      <Fragment>
        <ProductImageAndBrief
          imagesAndDesc={productDetails.productImagesAndDesc}
        />
        {/* <ProductAdvertiseBoard /> */}
      </Fragment>
    );
  }
  return <h1>Loading</h1>;
};

const mapStateToProps = ({ productDetail }) => ({
  productDetails: productDetail.details || null,
});

export default connect(mapStateToProps)(ProductMobileDetail);
