import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  showErrorMessage,
  newProductImagesAndDescAdded,
  showSuccessMessage,
} from "../../actions";
import { addProductImgAndDesc } from "../../api";

export const AddImagesAndDescriptionForm = () => {
  const [productImages, setProductImages] = useState([]);
  const [productDescription, setProductDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addedModel = useSelector(({ product: { addedModel } }) => addedModel);

  const addedDesc = useSelector(
    ({ product: { addedImgAndDesc } }) => addedImgAndDesc
  );

  const addProductImageAndDescriptionHandle = async (ev) => {
    ev.preventDefault();

    setLoading(true);

    if (!productDescription || productImages.length !== 5) {
      dispatch(showErrorMessage("Provide brief description and Images"));
      const timeID = setTimeout(() => {
        dispatch(showErrorMessage(null));
        setLoading(false);
      }, 3200);

      return () => clearTimeout(timeID);
    }

    const { _id: productId } = addedModel;

    const formData = new FormData();

    for (let img of productImages) {
      formData.append("productImages", img);
    }

    formData.append("productId", productId);
    formData.append("productDescription", productDescription);

    try {
      const { data } = await addProductImgAndDesc(formData);
      dispatch(showSuccessMessage("Product Images And Description Added"));
      dispatch(newProductImagesAndDescAdded(data.details));
      setLoading(false);
      setTimeout(() => {
        dispatch(showSuccessMessage(null));
      }, 3200);
    } catch (err) {
      setLoading(false);
      console.clear();
      try {
        dispatch(showErrorMessage(err.response.data.message));
        setTimeout(() => {
          dispatch(showErrorMessage(null));
        }, 3200);
      } catch (err) {
        dispatch(showErrorMessage("Something went wrong"));
        setTimeout(() => {
          dispatch(showErrorMessage(null));
        }, 3200);
      }
    }
  };

  if (addedDesc) return null;

  return (
    <div className='add-product-model__form3'>
      {productImages.length > 0 && (
        <div className='display-product-images'>
          {productImages.map((each, index) => {
            return (
              <img
                key={index}
                src={window.URL.createObjectURL(each)}
                alt='uploadedImages'
              />
            );
          })}
        </div>
      )}

      <form onSubmit={(ev) => addProductImageAndDescriptionHandle(ev)}>
        <label>
          Add Images
          <span style={{ fontSize: "15px", color: "grey", marginLeft: "10px" }}>
            (5 images required)
          </span>
        </label>
        <input
          style={{ display: "block", margin: "auto", marginTop: "20px" }}
          type='file'
          multiple
          onChange={(ev) => {
            if (ev.target.files.length !== 5) {
              ev.target.files.length < 5
                ? dispatch(showErrorMessage("Minimum 5 images required"))
                : dispatch(showErrorMessage("Only 5 images can be Taken"));
              const timeId = setTimeout(() => {
                dispatch(showErrorMessage(null));
              }, 3200);
              return () => clearTimeout(timeId);
            } else if (ev.target.files.length === 5) {
              setProductImages([...ev.target.files]);
            }
          }}
          accept='image/*'
        />

        <label>Tell about Product</label>
        <textarea
          className='input-abt-prd'
          onChange={(ev) => setProductDescription(ev.target.value)}
        />

        <button disabled={loading} type='submit' className='product-images-sbt'>
          {loading ? "Loading..." : "Add"}
        </button>
      </form>
    </div>
  );
};
