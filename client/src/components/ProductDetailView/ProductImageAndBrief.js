import React, { useEffect, useState } from "react";

import "../../styles/productimageandbrief.scss";

const ProductImageAndBrief = ({ images, productBriefInfo }) => {
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (images.length > 0) setPreviewImage(images[0]);
  }, [images]);

  if (images.length > 0) {
    return (
      <div className='product-detail-image-desc-container'>
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

        <div className='product-detail-description-container'>
          <div className='product-detail_name_and_price'>
            <h3>{productBriefInfo.productName}</h3>
            <p>{productBriefInfo.productPrice}</p>
          </div>
          <hr />
          <div className='product-detail_seller_and_ratings'>
            <a href='/seller'> Seller Details : iAsta</a>
            <p>Rating 4.5/5 from 50 reviews</p>
          </div>
          <div className='product-detail_similar_products'>
            Similar Products
            <div className='product-detail_similar_products__container'>
              {productBriefInfo.similarProducts.map((each) => {
                return <p key={each}>{each}</p>;
              })}
            </div>
          </div>
          <div className='product-detail_features-list'>
            {productBriefInfo.featuresList.map((each) => {
              return <h5 key={each}>{each}</h5>;
            })}
          </div>
        </div>
        <div className='product-detail-description-payment__checkout'></div>
      </div>
    );
  }
  return (
    <h1 style={{ color: "white" }}>
      Server Failed to respond this is not the page which you were suppose to
      see!
    </h1>
  );
};

export default ProductImageAndBrief;
