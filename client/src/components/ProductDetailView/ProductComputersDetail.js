import React, { Fragment } from "react";
import { connect } from "react-redux";

// import ProductAdvertiseBoard from "./ProductAdvertiseBoard";
import ProductImageAndBrief from "./ProductImageAndBrief";
import VideoPlayer from "../VideoPlayer";

import { scrollToTop } from "../../utils/scrollTopOnRouteChange";

const ProductComputersDetail = (props) => {
  scrollToTop();
  if (props.images) {
    return (
      <Fragment>
        <ProductImageAndBrief
          images={props.images}
          productBriefInfo={props.productInfo}
        />
        <VideoPlayer src={props.video} />
        {/* <ProductAdvertiseBoard /> */}
      </Fragment>
    );
  }
  return <h1 style={{ color: "white" }}>No Images Found</h1>;
};

const mapStateToProps = ({ productDetail }) => ({
  images: productDetail.images,
  productInfo: productDetail.productInfo,
  video: productDetail.productVideo,
});

export default connect(mapStateToProps)(ProductComputersDetail);
