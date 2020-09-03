import React, { useState, useEffect } from "react";

import "../../styles/productimageandbrief.scss";

const ProductImageAndBrief = ({ imagesAndDesc }) => {
  const [imageToView, setimageToView] = useState("");
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    if (imagesAndDesc.length > 0) {
      setProductImages(imagesAndDesc[0].productImages);
      console.log(imagesAndDesc[0]);
      setimageToView(imagesAndDesc.productImages[0]);
    }
  }, [imagesAndDesc]);

  if (imagesAndDesc.length > 0) {
    return (
      <div className='product-detail-image-desc-container'>
        <div className='product-detail-imagelist-container'>
          {productImages.map((imageProp, index) => {
            return (
              <div
                onMouseOver={() => setimageToView(imageProp)}
                key={imageProp}
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
            src={imageToView}
            alt='viewer'
          />
        </div>
      </div>
    );
  }
  return <h1>hi</h1>;
};

export default ProductImageAndBrief;
