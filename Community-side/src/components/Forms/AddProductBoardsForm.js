import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  showSuccessMessage,
  showErrorMessage,
  finishProductAdding,
} from "../../actions";
import { addProductBoards } from "../../api";
import history from "../../history";

export const ProductBoardsForm = () => {
  const [productBoards, setProductBoards] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { addedModel } = useSelector(({ product: addedModel }) => addedModel);

  const handleProductBoardsSubmit = async () => {
    setLoading(true);
    if (productBoards.length === 0) {
      dispatch(showSuccessMessage("Product added successfully"));
      dispatch(finishProductAdding());
      history.push("/");
      setTimeout(() => {
        dispatch(showSuccessMessage(null));
        setLoading(false);
      }, 3200);

      return;
    }

    const formData = new FormData();

    for (let board of productBoards) {
      formData.append("productBoards", board);
    }

    formData.append("productId", addedModel._id);
    try {
      await addProductBoards(formData);
      dispatch(showSuccessMessage("Product added successfully"));
      dispatch(finishProductAdding());
      setLoading(false);
      setTimeout(() => {
        dispatch(showSuccessMessage(null));
      }, 3200);
      history.push("/");
    } catch (err) {
      setLoading(false);
      dispatch(showErrorMessage("Something went wrong"));
      setTimeout(() => {
        dispatch(showErrorMessage(null));
      }, 3200);
    }
  };

  return (
    <div className='add-product-model__form4'>
      <div className='product-boards'>
        {productBoards.map((each, i) => {
          return (
            <img key={i} src={window.URL.createObjectURL(each)} alt='boards' />
          );
        })}
      </div>
      <h4>
        Click to add{" "}
        {productBoards.length > 0 ? "Add more" : "Product Display Boards"}{" "}
        <span>(optional)</span>{" "}
      </h4>

      <input
        onChange={(ev) => {
          setProductBoards([...productBoards, ev.target.files[0]]);
          document.getElementById("brd").value = "";
        }}
        id='brd'
        type='file'
        accept='image/*'
      />

      <button
        disabled={loading}
        onClick={handleProductBoardsSubmit}
        className='finish-btn'
      >
        {loading ? "Loading" : "Finish"}
      </button>
    </div>
  );
};
