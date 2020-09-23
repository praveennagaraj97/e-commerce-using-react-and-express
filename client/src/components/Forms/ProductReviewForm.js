import React, { useEffect, useState } from "react";
import { change, Field } from "redux-form";

import "../../styles/productReviewForm.scss";
import { ProductMobileReviewFields } from "./helpers";
import UploadedImageViewer from "../UploadedImageViewer";
import { useDispatch } from "react-redux";
import { apiBaseEndpoint } from "../../api";

export const ProductReviewForm = ({ setValue }) => {
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

  const sendUploadedImageToForm = (images) => {
    if (images.length > 5) return;
    const imageFormData = new FormData();

    for (let i = 0; i < images.length; i++) {
      imageFormData.append(`productReviewImage`, images[i]);
    }

    apiBaseEndpoint
      .post("/product_review/addMobileReview", imageFormData)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(change("productReviewForm", "productReviewImage", imageFormData));
  };

  return (
    <div className='product-review-container__input'>
      <div className='product-review__input'>
        <label htmlFor='review-title'>Title</label>
        <Field component='input' name='review-title' />
      </div>
      <div className='product-review__input'>
        <label htmlFor='review-title'>Description</label>
        <Field component='textarea' name='review-description' />
      </div>
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
            onChange={(ev) => {
              setReviewImages(ev.target.files);
              sendUploadedImageToForm(ev.target.files);
            }}
          />
        </div>

        {reviewImageLimitBreach ? (
          <p className='images-warning'>Upto 5 Images are only allowed</p>
        ) : (
          ""
        )}

        <button type='submit' onClick={sendUploadedImageToForm}>
          Submit
        </button>
      </div>
    </div>
  );
};
