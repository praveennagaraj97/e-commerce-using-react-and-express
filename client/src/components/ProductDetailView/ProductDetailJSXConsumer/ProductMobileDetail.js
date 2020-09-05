import React, { Fragment } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core";

import { scrollToTop } from "../../../utils/scrollTopOnRouteChange";
import ProductImageAndBrief from "../ProductDetailJSXProvider/ProductImageAndBrief";
import ProductDetailTable from "../ProductDetailJSXProvider/ProductDetailTable";
import VideoPlayer from "../../VideoPlayer";
import ProductManufacturer from "../ProductDetailJSXProvider/ProductManufacturer";
import ProductBrief from "../ProductDetailJSXProvider/ProductBrief";

const useStyles = makeStyles((theme) => ({
  mobileTechnicalDetails: {
    color: "white",
  },
}));

const ProductMobileDetail = (props) => {
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
        <hr style={{ width: "65%" }} />

        <ProductBrief productDescription={props.productDescription} />

        <hr style={{ width: "65%" }} />
        <div className={classes.mobileTechnicalDetails}>
          <h2> Technical Details </h2>
          <ProductDetailTable productDetails={props.productDetails} />
        </div>
        <hr style={{ width: "65%" }} />
        <ProductManufacturer manufacturer={props.manufacturer} />
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
  manufacturer: productDetail.manufacturer,
  productDescription: productDetail.productBrief,
});

export default connect(mapStateToProps)(ProductMobileDetail);
