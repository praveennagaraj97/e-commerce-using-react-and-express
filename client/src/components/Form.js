import React from "react";
import { Field } from "redux-form";

import "../styles/user.scss";
import { Button } from "@material-ui/core";

const Form = (props) => {
  const {
    handleSubmit,
    onSubmitFormValues,
    formSelected,
    buttonToShow,
  } = props;

  return (
    <div className='form-container'>
      <form
        style={{ padding: "8% 0%" }}
        autoComplete='off'
        onSubmit={handleSubmit(onSubmitFormValues)}
        noValidate>
        {formSelected.map(({ htmlFor, label, type }, index) => {
          return (
            <div className='form-input' key={index}>
              <label className='form-input__label' htmlFor={htmlFor}>
                {label}
              </label>
              <Field
                className='form-input__field'
                name={htmlFor}
                component='input'
                type={type}
              />
            </div>
          );
        })}
        <Button style={{ backgroundColor: "white" }} type='submit'>
          {buttonToShow}
        </Button>
      </form>
    </div>
  );
};

export default Form;
