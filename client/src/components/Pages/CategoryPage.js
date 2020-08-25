import React, { Fragment, useRef } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import Form from "../Form";
import { categoryPage } from "../data";
import MessageDisplay from "../MessageDisplay";
import ModalLoader from "../Modal";

import { loadCrud, createCategory, globalError } from "../../actions";

const CategoryPage = ({
  handleSubmit,
  loadCrud,
  createCategory,
  globalError,
}) => {
  const file = useRef();

  const fileUpload = () => {
    return (
      <div className='file-upload'>
        <input
          type='file'
          id='file-input'
          accept='.png'
          onChange={(ev) => {
            file.current = ev.target.files;
          }}
          required
        />
      </div>
    );
  };

  const onSubmitFormValues = ({ categoryName }) => {
    loadCrud(true);
    const data = new FormData();
    for (let i = 0; i < file.current.length; i++) {
      data.append("categoryImage", file.current[i]);
    }

    data.append("categoryImage", data);
    data.append("categoryName", categoryName);

    createCategory(data);
  };

  return (
    <Fragment>
      <Form
        handleSubmit={handleSubmit}
        pageFields={categoryPage}
        fileUpload={fileUpload}
        onSubmitFormValues={onSubmitFormValues}
      />
      <MessageDisplay />
      <ModalLoader />
    </Fragment>
  );
};

const FormWrapped = reduxForm({
  form: "CategoryForm",
})(CategoryPage);

const mapDispatchToProps = (dispatch) => ({
  loadCrud: (boolean) => dispatch(loadCrud(boolean)),
  createCategory: (data) => dispatch(createCategory(data)),
  globalError: (error) => dispatch(globalError(error)),
});

export default connect(null, mapDispatchToProps)(FormWrapped);
