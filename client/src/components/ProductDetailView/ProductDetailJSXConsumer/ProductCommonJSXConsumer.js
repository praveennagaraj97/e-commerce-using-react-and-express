import React, { Fragment } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core";

import { scrollToTop } from "../../../utils/scrollTopOnRouteChange";
import ProductImageAndBrief from "../ProductDetailJSXProvider/ProductImageAndBrief";
import ProductDetailTable from "../ProductDetailJSXProvider/ProductDetailTable";
import VideoPlayer from "../../VideoPlayer";
import ProductManufacturer from "../ProductDetailJSXProvider/ProductManufacturer";
import ProductBrief from "../ProductDetailJSXProvider/ProductBrief";
import ProductReview from "../ProductDetailJSXProvider/ProductReview";

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
        {/* Product Images | Info-features | AddTocart - direct-buy */}
        <ProductImageAndBrief
          images={props.images}
          productBriefInfo={props.productInfo}
          currentProductId={props.id}
        />
        <hr style={{ width: "65%" }} />

        {/* As Server doesn't provide video intro for all products this column will be null if no video */}
        {props.video ? (
          <Fragment>
            <VideoPlayer src={props.video} />
            {/* <ProductAdvertiseBoard /> */}
            <hr style={{ width: "65%" }} />
          </Fragment>
        ) : (
          ""
        )}

        {/* Product Description by Manufacturer as a statement*/}
        {props.productDescription ? (
          <Fragment>
            <ProductBrief
              productDescription={props.productDescription}
              productBoards={props.productBoards}
            />
            <hr style={{ width: "65%" }} />
          </Fragment>
        ) : (
          ""
        )}

        {/* Product Details in table */}

        {props.productDetails ? (
          <Fragment>
            <div className={classes.mobileTechnicalDetails}>
              <h2> Technical Details </h2>
              <ProductDetailTable productDetails={props.productDetails} />
            </div>
            <hr style={{ width: "65%" }} />
          </Fragment>
        ) : (
          ""
        )}

        {/* About manufacturer */}
        {props.manufacturer ? (
          <Fragment>
            <ProductManufacturer manufacturer={props.manufacturer} />
            <hr style={{ width: "65%" }} />
          </Fragment>
        ) : (
          ""
        )}

        {/* Product Review Loads on scroll to bottom */}
        <ProductReview
          productReviewFor={{
            category: props.productReviewFor,
            productId: props.id.productId,
          }}
        />
      </Fragment>
    );
  }
  return <h1 style={{ color: "white" }}>Server failed to respond</h1>;
};

const mapStateToProps = ({ productDetail }) => ({
  images: productDetail.images,
  productInfo: productDetail.productInfo,
  video: productDetail.productVideo,
  productDetails: productDetail.productDetails,
  manufacturer: productDetail.manufacturer,
  productDescription: productDetail.productBrief,
  productBoards: productDetail.productBoards,
  id: productDetail.productType,
});

export default connect(mapStateToProps)(ProductMobileDetail);
