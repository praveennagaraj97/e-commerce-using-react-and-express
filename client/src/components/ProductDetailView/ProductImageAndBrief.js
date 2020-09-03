import React, { useEffect, useState } from "react";

import "../../styles/productimageandbrief.scss";

const ProductImageAndBrief = ({ images }) => {
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
