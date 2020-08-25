import React, { Fragment, useRef, useState } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import Form from "../Form";
import { categoryPage } from "../data";
import MessageDisplay from "../MessageDisplay";

import Axios from "axios";

const CategoryPage = (props) => {
  const { handleSubmit } = props;

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

  const onSubmitFormValues = (formValues) => {
    const data = new FormData();
    for (let i = 0; i < file.current.length; i++) {
      data.append("categoryImage", file.current[i]);
    }

    data.append("categoryName", formValues.categoryName);

    Axios.post("http://localhost:8080/api/v1/dev/addNewCategory", data)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => {
        try {
          alert(err.response.data.message);
        } catch (err) {
          alert("Something went wrong");
        }
      });
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
    </Fragment>
  );
};

const FormWrapped = reduxForm({
  form: "CategoryForm",
})(CategoryPage);

export default connect(null, null)(FormWrapped);
