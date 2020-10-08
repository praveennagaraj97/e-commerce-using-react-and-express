import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCategories, editCategory } from "../../../api";

import { devRoleChecker } from "../../../helper";
import { showErrorMessage, showSuccessMessage } from "../../../actions";

const EditCategory = ({ loggedIn }) => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      (async () => {
        try {
          const {
            data: { details },
          } = await getAllCategories();
          setCategories(details);
        } catch (err) {
          console.clear();
          dispatch(showErrorMessage("Something went wrong"));
          setTimeout(() => {
            dispatch(showErrorMessage(null));
          }, 3200);
        }
      })();
    }
  }, [loggedIn, dispatch]);

  const editCategoryHandle = async () => {
    if (!categoryIcon) {
      dispatch(showErrorMessage("Select Category Icon"));
      const timeId = setTimeout(() => {
        dispatch(showErrorMessage(null));
      }, 3200);

      return () => clearTimeout(timeId);
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("categoryImage", categoryIcon[0]);
    try {
      const {
        data: { document },
      } = await editCategory(categoryId, formData);

      setLoading(false);
      setCategories(
        categories.map((each) => {
          if (each._id === document._id) {
            each = document;
          }
          return each;
        })
      );

      dispatch(showSuccessMessage("Category Updated Successfully !"));
      setTimeout(() => {
        dispatch(showSuccessMessage(null));
      }, 3200);
    } catch (err) {
      setLoading(false);
      dispatch(showErrorMessage("Something went wrong Update Failed !"));
      setTimeout(() => {
        dispatch(showErrorMessage(null));
      }, 3200);
    }
  };

  return (
    <div className='add-new-category-container'>
      <div className='current-categories'>
        {categories.map(({ _id, categoryIcon, categoryName }) => {
          return (
            <div
              onClick={() => {
                setCategoryName(categoryName);
                setCategoryId(_id);
              }}
              key={_id}
              style={{ cursor: "pointer" }}
              className='each-category'
            >
              <img src={categoryIcon} alt='cat-icon' />
              <p>{categoryName}</p>
            </div>
          );
        })}
      </div>
      <p className='message'>Click on Category to select ^ </p>
      <hr />

      {/* Form with live Update Preview */}
      <div className='add-category-form'>
        <label htmlFor='categoryName'>Category Name</label>
        <input
          value={categoryName}
          disabled={true}
          type='text'
          placeholder='Select a category'
        />

        <label htmlFor='categoryIcon'>Category Icon</label>
        <input
          disabled={categoryName ? false : true}
          id='category-ico'
          onChange={(ev) => {
            setCategoryIcon(ev.target.files);
          }}
          type='file'
          accept='.png, .jpg, .jpeg'
        />
        <div className='sbt-preview-btns'>
          <button disabled={loading} onClick={editCategoryHandle}>
            Edit
          </button>
        </div>
        <p className='warning-edit-option'>
          Note : Only Image/ Icon can be Changed!
        </p>
      </div>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <img
            style={{ width: "150px" }}
            src='https://storage.googleapis.com/lexa-component-styles/Curve-Loading.gif'
            alt='loading...'
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default () =>
  devRoleChecker({
    role: "keyboarders",
  })(EditCategory);
