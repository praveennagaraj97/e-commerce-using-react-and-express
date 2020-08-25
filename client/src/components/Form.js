import React, { Fragment } from "react";
import { Field } from "redux-form";

import "../styles/form.scss";

const Form = ({ handleSubmit, pageFields, fileUpload, onSubmitFormValues }) => {
  const { fields, button } = pageFields;

  return (
    <div className='form-container'>
      <form className='form-label' onSubmit={handleSubmit(onSubmitFormValues)}>
        <div>
          {fields.map(({ htmlFor, label, type }, index) => {
            return (
              <Fragment key={index}>
                <label className='form-label' htmlFor={htmlFor}>
                  {label}
                </label>
                <Field
                  className='form-input'
                  name={htmlFor}
                  component={type === "text" ? "input" : fileUpload}
                  type={type}
                  placeholder='Enter Category Name'
                  required
                />
              </Fragment>
            );
          })}
        </div>
        <button className='form-button' type='submit'>
          {button}
        </button>
      </form>
    </div>
  );
};

export default Form;
