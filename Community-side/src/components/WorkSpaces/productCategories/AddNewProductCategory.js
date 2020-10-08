import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCategories, addNewCategory } from "../../../api";

import { devRoleChecker } from "../../../helper";

import { showErrorMessage, showSuccessMessage } from "../../../actions";

const AddNewCategory = ({ loggedIn }) => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [previewBtn, setPreviewBtn] = useState(true);
  const [categoryBtn, setCategoryBtn] = useState(true);
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
            setPreviewBtn(true);
            setCategoryBtn(true);
            dispatch(showErrorMessage(null));
          }, 3200);
        }
      })();
    }
  }, [loggedIn, dispatch]);

  const fileChecker = () => {
    if (!categoryIcon || !categoryName) {
      dispatch(showErrorMessage("Provide Category Name and Category Icon"));
      setTimeout(() => {
        setPreviewBtn(true);
        setCategoryBtn(true);
        dispatch(showErrorMessage(null));
      }, 3200);

      return true;
    }
    return false;
  };

  const previewCategory = () => {
    if (fileChecker()) return;

    const imagePreview = window.URL.createObjectURL(categoryIcon[0]);

    const modelTempPreviewData = {
      _id: [...Array(10)]
        .map((i) => (~~(Math.random() * 36)).toString(36))
        .join(""),
      categoryIcon: imagePreview,
      categoryName,
    };

    setCategories([...categories, modelTempPreviewData]);

    setTimeout(() => {
      setCategories(
        categories.filter(({ _id }) => _id !== modelTempPreviewData._id)
      );
      setPreviewBtn(true);
    }, 3000);
  };

  const addCategory = async () => {
    if (fileChecker()) return;
    setLoading(true);
    const formData = new FormData();

    formData.append("categoryImage", categoryIcon[0]);
    formData.append("categoryName", categoryName);
    try {
      const { data } = await addNewCategory(formData);
      dispatch(showSuccessMessage("New Category Added"));
      setLoading(false);
      setCategories([...categories, data.details]);
      setCategoryName("");
      setCategoryIcon(null);
      document.getElementById("category-ico").value = "";
      setCategoryBtn(true);
      setTimeout(() => {
        dispatch(showSuccessMessage(null));
      }, 3200);
    } catch (err) {
      setLoading(false);
      dispatch(showErrorMessage("Category Already Exist"));
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
            <div key={_id} className='each-category'>
              <img src={categoryIcon} alt='cat-icon' />
              <p>{categoryName}</p>
            </div>
          );
        })}
      </div>
      <p className='message'>Current Categories ^ </p>
      <hr />

      {/* Form with live Update Preview */}
      <div className='add-category-form'>
        <label htmlFor='categoryName'>Category Name</label>
        <input
          value={categoryName}
          onChange={(ev) => setCategoryName(ev.target.value)}
          type='text'
          placeholder='Enter Category Name'
        />

        <label htmlFor='categoryIcon'>Category Icon</label>
        <input
          id='category-ico'
          onChange={(ev) => setCategoryIcon(ev.target.files)}
          type='file'
          accept='.png, .jpg, .jpeg'
        />
        <div className='sbt-preview-btns'>
          <button
            disabled={!previewBtn}
            onClick={() => {
              previewCategory();
              setPreviewBtn(false);
            }}
          >
            Preview
          </button>
          <br />
          <button
            disabled={!categoryBtn}
            onClick={() => {
              addCategory();
              setCategoryBtn(false);
            }}
          >
            Add New Category
          </button>
        </div>
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
  })(AddNewCategory);
