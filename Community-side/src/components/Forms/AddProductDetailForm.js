import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { ProductDetails } from "./addon";

import {
  newProductDetailAdded,
  showErrorMessage,
  showSuccessMessage,
} from "../../actions";
import { addproductDetail } from "../../api";

export const AddProductDetailForm = () => {
  const [featuresList, setFeaturesList] = useState([]);
  const [productDetails, setProductDetails] = useState([
    { key: "", value: "" },
  ]);
  const [productVideo, setProductVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feature, setFeature] = useState("");
  const dispatch = useDispatch();
  const { _id } = useSelector(({ product: { addedModel } }) => addedModel);
  const addedDetail = useSelector(
    ({ product: { addedDetail } }) => addedDetail
  );

  const addProductDetailHandle = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    const modelledProductDetails = {};
    for (let detail of productDetails) {
      if (detail.key && detail.value) {
        modelledProductDetails[detail.key] = detail.value;
      }
    }

    if (featuresList.length < 1 || _.isEmpty(modelledProductDetails)) {
      dispatch(
        showErrorMessage("Provide products Features List And In Detail Details")
      );

      const timeId = setTimeout(() => {
        dispatch(showErrorMessage(null));
        setLoading(false);
      }, 3200);

      return () => clearTimeout(timeId);
    }

    if (!_id) {
      dispatch(showErrorMessage("Please Mail Us Something went Wrong"));
      const timeID = setTimeout(() => {
        dispatch(showErrorMessage(null));
        setLoading(false);
      }, 3200);
      return () => clearTimeout(timeID);
    }

    const formData = new FormData();

    formData.append("featuresList", JSON.stringify(featuresList));
    formData.append("productDetails", JSON.stringify(modelledProductDetails));
    formData.append("productId", _id);
    if (productVideo) {
      formData.append("productVideo", productVideo);
    }

    try {
      const { data } = await addproductDetail(formData);
      dispatch(showSuccessMessage("Product Detail Added Click On Next"));
      dispatch(newProductDetailAdded(data.details));
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
      } catch (error) {
        dispatch(showErrorMessage("Something went Wrong"));
        setTimeout(() => {
          dispatch(showErrorMessage(null));
        }, 3200);
      }
    }
  };

  if (addedDetail) return null;
  return (
    <div className='add-product-model__form2'>
      <form onSubmit={(ev) => addProductDetailHandle(ev)}>
        <div className='show-features-list'>
          {featuresList.map((each, i) => {
            return (
              <Fragment key={i}>
                <p
                  onClick={() =>
                    setFeaturesList(
                      featuresList.filter((feature) => each !== feature)
                    )
                  }
                  className='ind-feature'
                >
                  {each}
                </p>
              </Fragment>
            );
          })}
        </div>

        <label>Brief Features List</label>

        <div className='features-list'>
          <input
            onChange={(ev) => setFeature(ev.target.value)}
            type='text'
            value={feature}
          />
          <img
            onClick={() => {
              setFeaturesList([...featuresList, feature]);
              setFeature("");
            }}
            src='https://img.icons8.com/plasticine/100/000000/plus.png'
            alt='addMore'
          />
          <p style={{ color: "yellow" }}>click on Plus to add More Features</p>
          {featuresList.length > 0 ? (
            <p style={{ color: "yellow" }}>click on feature to remove</p>
          ) : (
            ""
          )}

          <label>Product Detailing Video</label>
          <p className='features-video-opt'>(Optional)</p>
          <br />
          <input
            style={{ marginLeft: "56px" }}
            onChange={(ev) => setProductVideo(ev.target.files[0])}
            type='file'
            accept='.mp4'
          />
          <br />
          <label>Individual Features info</label>
          <p className='features-example'>example :- Display : 5.7 inch </p>
          <ProductDetails
            inputList={productDetails}
            setProductDetails={setProductDetails}
          />
        </div>

        <button disabled={loading} type='submit' className='product-detail-sbt'>
          {loading ? "Loading..." : "Add"}
        </button>
      </form>
    </div>
  );
};
