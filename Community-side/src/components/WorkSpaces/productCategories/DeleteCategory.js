import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCategories, deleteCategory } from "../../../api";

import { devRoleChecker } from "../../../helper";
import { showErrorMessage } from "../../../actions";

const EditCategory = ({ loggedIn }) => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
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

  const deleteCategoryHandle = async (id) => {
    setLoading(true);
    try {
      await deleteCategory(id);
      setLoading(false);
      setCategories(categories.filter(({ _id }) => _id !== id));
    } catch (err) {
      setLoading(false);
      dispatch(showErrorMessage("Something went wronh"));
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
                deleteCategoryHandle(_id);
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
      <p className='message'>Click on Category to delete ^ </p>
      <p className='delete-warning'>
        Deleteing a category will delete all the products associated with it!
      </p>
      <hr />

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
