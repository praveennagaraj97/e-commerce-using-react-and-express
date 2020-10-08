import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ProductModelForm,
  ProductDetailForm,
  ImagesAndDescriptionForm,
  ProductBoardsForm,
} from "../../../Forms";

import { finishProductAdding, showSuccessMessage } from "../../../../actions";
import history from "../../../../history";

const AddProductModel = () => {
  const [formType, setFormType] = useState("productModel");

  const FormSelection = () => {
    const { addedModel } = useSelector(({ product: addedModel }) => addedModel);
    const addedDetail = useSelector(
      ({ product: { addedDetail } }) => addedDetail
    );
    const addedDesc = useSelector(
      ({ product: { addedImgAndDesc } }) => addedImgAndDesc
    );

    const dispatch = useDispatch();

    if (formType === "productModel") {
      return (
        <div>
          <h4>Add Product Model</h4>
          <ProductModelForm />

          <button
            onClick={() => setFormType("productDetail")}
            className='next-form'
            disabled={addedModel ? false : true}
          >
            Next
          </button>
        </div>
      );
    }

    if (addedModel) {
      if (formType === "productDetail") {
        return (
          <div>
            <h4>
              {addedDetail
                ? `Product Detail Has Been Already Added for ${addedModel.productName} click on next`
                : `Add detail for Product Name : ${addedModel.productName}`}
            </h4>
            <ProductDetailForm />

            <button
              onClick={() => setFormType("productImages")}
              className='next-form'
              disabled={addedDetail ? false : true}
            >
              Next
            </button>
          </div>
        );
      }
    }

    if (addedDetail) {
      if (formType === "productImages") {
        return (
          <div>
            <h4>
              {addedDesc
                ? `Product Images has been already for ${addedModel.productName} click on next`
                : `Add Product Images and why should customer buy this ${addedModel.productName}`}
            </h4>
            {/* Form */}
            <ImagesAndDescriptionForm />

            <button
              onClick={() => setFormType("productBoards")}
              className='next-form'
              disabled={addedDesc ? false : true}
            >
              Next
            </button>
            {addedDesc ? (
              <button
                onClick={() => {
                  dispatch(showSuccessMessage("Product Added Successfully"));

                  dispatch(finishProductAdding());
                  setTimeout(() => {
                    showSuccessMessage(null);
                  }, 3200);
                  history.push("/");
                }}
                className='finish-btn'
              >
                Finish
              </button>
            ) : (
              ""
            )}
          </div>
        );
      }
    }

    if (addedDesc) {
      if (formType === "productBoards") {
        return (
          <div>
            <h4>
              {
                //addedDesc ? `Product Images has been already for ${addedModel.productName} click on next`
                `Add Product Boards for ${addedModel.productName}`
              }
            </h4>
            {/* Form */}
            <ProductBoardsForm />
          </div>
        );
      }
    }

    return null;
  };

  return (
    <div className='add-product-model'>
      <FormSelection />
    </div>
  );
};

export default AddProductModel;
