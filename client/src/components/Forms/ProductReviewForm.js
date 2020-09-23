import React, { useEffect, useState } from "react";
import { change, Field } from "redux-form";
import { useDispatch } from "react-redux";

import "../../styles/productReviewForm.scss";
import { ProductMobileReviewFields } from "./helpers";
import UploadedImageViewer from "../UploadedImageViewer";

/**
 * @file - productReviewImages.
 * @description - takes default title,description and images for all types.
 * @access - Protected Route User has to be Logged In to access this component
 */

export const ProductReviewForm = ({ setValue, postReviewAction }) => {
  const [reviewImages, setReviewImages] = useState([]);
  const [processedImages, setProcessedImages] = useState([]);
  const [reviewImageLimitBreach, setImageLimitBreach] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const images = [];

    for (let image of reviewImages) {
      images.push(image);
    }

    if (images.length > 5) {
      setImageLimitBreach(true);
      return;
    } else {
      setImageLimitBreach(false);
    }

    setProcessedImages(images);
  }, [reviewImages]);

  const imageDeselecterHandle = (image) => {
    const images = [...processedImages];
    const indexOfDeselectImage = images.indexOf(image);
    images.splice(indexOfDeselectImage, 1);
    setProcessedImages(images);
  };

  useEffect(() => {
    if (processedImages.length > 5) return;

    const imageFormData = new FormData();

    for (let i = 0; i < processedImages.length; i++) {
      imageFormData.append(`productReviewImage`, processedImages[i]);
    }

    if (processedImages.length > 0 && processedImages.length < 5) {
      dispatch(change("productReviewForm", "productReviewImage", ""));
    }
  }, [processedImages, dispatch]);

  return (
    <div className='product-review-container__input'>
      <div className='product-review__input'>
        <label htmlFor='reviewTitle'>Title</label>
        <Field component='input' name='reviewTitle' />
      </div>
      <div className='product-review__input'>
        <label htmlFor='reviewDescription'>Description</label>
        <Field component='textarea' name='reviewDescription' />
      </div>

      {/* Changes Based on Product category */}
      <ProductMobileReviewFields setValue={setValue} />

      <div className='product-review__imageUploader'>
        <h3>Add Images</h3>
        <p>Shoppers find images more helpful than text alone.</p>
        {processedImages.length > 0 ? (
          <UploadedImageViewer
            images={processedImages}
            imageRemover={imageDeselecterHandle}
          />
        ) : (
          ""
        )}

        <div className='review-image-selector'>
          <p>Select Images</p>
          <input
            name='review-image'
            type='file'
            multiple
            accept='.png, .jpg, .jpeg'
            onChange={(ev) => setReviewImages(ev.target.files)}
          />
        </div>

        {reviewImageLimitBreach ? (
          <p className='images-warning'>Upto 5 Images are only allowed</p>
        ) : (
          ""
        )}

        <button type='submit' onClick={() => postReviewAction("mobiles")}>
          Submit
        </button>
      </div>
      <hr style={{ width: "65%" }} />
    </div>
  );
};
