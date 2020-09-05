import React, { Fragment } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core";

import ProductImageAndBrief from "../ProductDetailJSXProvider/ProductImageAndBrief";
import ProductDetailTable from "../ProductDetailJSXProvider/ProductDetailTable";
import VideoPlayer from "../../VideoPlayer";
import { scrollToTop } from "../../../utils/scrollTopOnRouteChange";

const useStyles = makeStyles((theme) => ({
  mobileTechnicalDetails: {
    color: "white",
  },
}));

const ProductComputersDetail = (props) => {
  scrollToTop();

  const classes = useStyles();

  if (props.images) {
    return (
      <Fragment>
        <ProductImageAndBrief
          images={props.images}
          productBriefInfo={props.productInfo}
        />
        <VideoPlayer src={props.video} />
        {/* <ProductAdvertiseBoard /> */}

        <div className={classes.mobileTechnicalDetails}>
          <h2>Technical Details</h2>
          <ProductDetailTable productDetails={props.productDetails} />
        </div>
      </Fragment>
    );
  }
  return <h1 style={{ color: "white" }}>No Images Found</h1>;
};

const mapStateToProps = ({ productDetail }) => ({
  images: productDetail.images,
  productInfo: productDetail.productInfo,
  video: productDetail.productVideo,
  productDetails: productDetail.productDetails,
});

export default connect(mapStateToProps)(ProductComputersDetail);
