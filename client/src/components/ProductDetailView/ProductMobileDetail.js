import React, { Fragment } from "react";
import { connect } from "react-redux";

import ProductAdvertiseBoard from "./ProductAdvertiseBoard";
import ProductImageAndBrief from "./ProductImageAndBrief";

import { scrollToTop } from "../../utils/scrollTopOnRouteChange";

const ProductMobileDetail = (props) => {
  scrollToTop();
  if (props.images) {
    return (
      <Fragment>
        <ProductImageAndBrief
          images={props.images}
          productBriefInfo={props.productInfo}
        />
        <ProductAdvertiseBoard />
      </Fragment>
    );
  }
  return <h1 style={{ color: "white" }}>No Images Found</h1>;
};

const mapStateToProps = ({ productDetail }) => ({
  images: productDetail.images,
  productInfo: productDetail.productInfo,
});

export default connect(mapStateToProps)(ProductMobileDetail);
