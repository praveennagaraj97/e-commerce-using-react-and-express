import { Button } from "@material-ui/core";
import React, { useEffect, useState, Fragment } from "react";

import "../../../styles/productimageandbrief.scss";
import { loadViewProductDetail, addItemToCart } from "../../../actions";
import { connect } from "react-redux";
import history from "../../../history";

const ProductImageAndBrief = ({
  images,
  productBriefInfo,
  loadViewProductDetail,
  addItemToCart,
  currentProductId,
}) => {
  const [previewImage, setPreviewImage] = useState("");
  const [screenAbove1032, setScreenAbove1032] = useState(true);
  const [screenAbove582, setScreenAbove582] = useState(true);

  useEffect(() => {
    if (images.length > 0) setPreviewImage(images[0]);
  }, [images]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1032) {
        setScreenAbove1032(true);
      } else {
        setScreenAbove1032(false);
      }

      if (window.innerWidth > 582) {
        setScreenAbove582(true);
      } else {
        setScreenAbove582(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleViewSimilarProduct = (id) => {
    const productType = {
      category: history.location.pathname.split("/")[
        history.location.pathname.split("/").length - 2
      ],
      id,
    };

    loadViewProductDetail(productType);
  };

  const productBriefDescriptionJSX = (productBriefInfo) => {
    return (
      <div className='product-detail-description-container'>
        <div className='product-detail_name_and_price'>
          <h3>{productBriefInfo.productName}</h3>
          <p>{productBriefInfo.productPrice}</p>
        </div>
        <hr />

        {productBriefInfo.similarProducts.length > 1 ? (
          <div className='product-detail_similar_products'>
            Similar Products
            <div className='product-detail_similar_products__container'>
              {productBriefInfo.similarProducts.map(({ _id, productName }) => {
                return productName !== productBriefInfo.productName ? (
                  <Button
                    onClick={() => handleViewSimilarProduct(_id)}
                    className='btn-block'
                    key={_id}>
                    {productName}
                  </Button>
                ) : (
                  ""
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className='product-detail_features-list'>
          <ul>
            {productBriefInfo.featuresList.map((each) => {
              return <li key={each}>{each}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  };

  const checkoutAndCartBoxJSX = () => {
    return (
      <div className='product-detail-description-payment__checkout'>
        <div className='product-detail-description-payment__cart-btn'>
          <button onClick={() => addItemToCart(currentProductId.productId)}>
            Add To Cart
          </button>
        </div>
        <div className='product-detail-description-payment__buy-btn'>
          <button>Buy Now</button>
        </div>
      </div>
    );
  };

  // Display JSX
  if (images.length > 0 && productBriefInfo) {
    return (
      <Fragment>
        <div className='product-detail-image-desc-container'>
          {/* First box */}
          <div className='product-detail-imagelist-container'>
            {images.map((imageProp, index) => {
              return (
                <div
                  onMouseOver={() => setPreviewImage(imageProp)}
                  key={index}
                  className='product-detail-image-conatiner'>
                  <img
                    className='product-detail-image'
                    src={imageProp}
                    alt='productImage'
                  />
                </div>
              );
            })}
          </div>
          <div className='product-detail-imagelist__viewer'>
            <img
              className='product-detail-image-view'
              src={previewImage}
              alt='viewer'
            />
          </div>

          {/* Second Box */}
          {screenAbove1032 ? productBriefDescriptionJSX(productBriefInfo) : ""}

          {/* third box */}
          {screenAbove582 ? checkoutAndCartBoxJSX() : ""}
        </div>

        {/* // Mid-range screenbelow1090 width */}

        {!screenAbove1032 ? (
          <Fragment>
            <hr style={{ width: "65%" }} />{" "}
            {productBriefDescriptionJSX(productBriefInfo)}
          </Fragment>
        ) : (
          ""
        )}
        {!screenAbove582 ? (
          <Fragment>
            <hr style={{ width: "65%" }} /> {checkoutAndCartBoxJSX()}
          </Fragment>
        ) : (
          ""
        )}
      </Fragment>
    );
  }
  return (
    <h1 style={{ color: "white" }}>
      Server Failed to respond this is not the page which you were suppose to
      see!
    </h1>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadViewProductDetail: (id) => dispatch(loadViewProductDetail(id)),
  addItemToCart: (id) => dispatch(addItemToCart(id)),
});

export default connect(null, mapDispatchToProps)(ProductImageAndBrief);
