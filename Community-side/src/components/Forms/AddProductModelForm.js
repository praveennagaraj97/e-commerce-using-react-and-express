import React, { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import { getAllCategories, addProductModel } from "../../api";
import {
  showErrorMessage,
  newProductModelAdded,
  showSuccessMessage,
} from "../../actions";

function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

const AddProductModelForm = () => {
  const [productCoverImage, setProductCoverImg] = useState("");
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { addedModel } = useSelector(({ product }) => product);

  const handleProductModelForm = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    if (
      !productCoverImage ||
      !productName ||
      !categoryId ||
      !productPrice ||
      productQuantity < 1
    ) {
      dispatch(showErrorMessage("Fill all Fields"));
      const timeId = setTimeout(() => {
        dispatch(showErrorMessage(null));
        setLoading(false);
      }, 3200);
      return () => clearTimeout(timeId);
    }

    if (!isNumeric(productPrice)) {
      dispatch(showErrorMessage("Product Price should be Number"));
      const timeId = setTimeout(() => {
        dispatch(showErrorMessage(null));
        setLoading(false);
      }, 3200);
      return () => clearTimeout(timeId);
    }

    if (!isNumeric(productQuantity)) {
      dispatch(showErrorMessage("Product Quantity should be Number"));
      const timeId = setTimeout(() => {
        dispatch(showErrorMessage(null));
        setLoading(false);
      }, 3200);
      return () => clearTimeout(timeId);
    }

    const formData = new FormData();

    formData.append("productName", productName);
    formData.append("categoryId", categoryId);
    formData.append("productPrice", productPrice);
    formData.append("productCoverImage", productCoverImage);
    formData.append("quantity", productQuantity);

    try {
      const {
        data: { details },
      } = await addProductModel(formData);

      dispatch(newProductModelAdded(details));
      dispatch(
        showSuccessMessage(
          "Product Model Added Click on next and add more details"
        )
      );
      setLoading(false);
      setTimeout(() => {
        dispatch(showSuccessMessage(null));
      }, 3200);
    } catch (err) {
      setLoading(false);
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

  const { data, error, isLoading } = useQuery(
    "getCategories",
    getAllCategories
  );

  if (addedModel) return null;

  const categorySelection = () => {
    if (isLoading) return <option>Loading...</option>;
    if (error) return <option>Something went wrong</option>;
    if (data) {
      return (
        <>
          {data.data.details.map(({ _id, categoryName }) => {
            return (
              <option value={_id} key={_id}>
                {categoryName}
              </option>
            );
          })}
        </>
      );
    }
  };

  return (
    <div className='add-product-model__form1'>
      <form onSubmit={(ev) => handleProductModelForm(ev)}>
        <label htmlFor='productName'>Product Name</label>
        <input
          onChange={(ev) => setProductName(ev.target.value)}
          value={productName}
          name='productName'
        />

        <label htmlFor='productprice'>Product Price</label>
        <input
          onChange={(ev) => setProductPrice(ev.target.value)}
          name='productPrice'
          value={productPrice}
        />

        <label htmlFor='productprice'>Product Quantity</label>
        <input
          onChange={(ev) => setProductQuantity(ev.target.value)}
          name='productPrice'
          type='number'
          min='1'
          value={productQuantity}
        />

        {/* Product Cover Image */}
        <label htmlFor='productCoverImage'>Select a Product Cover Image!</label>
        <input
          onChange={(ev) => setProductCoverImg(ev.target.files[0])}
          style={{ marginLeft: "70px" }}
          type='file'
          accept='.png, .jpg, .jpeg'
        />

        <label style={{ cursor: "pointer" }} htmlFor='categoryId'>
          Click to choose a category
        </label>
        <select
          onChange={(ev) => setCategoryId(ev.target.value)}
          name='categoryId'
          className='categories-selection'
        >
          <option>Click to choose Category</option>
          {categorySelection()}
        </select>

        <button
          disabled={loading}
          className='add-product-model-btn'
          type='submit'
        >
          {loading ? "Loading..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export { AddProductModelForm };
