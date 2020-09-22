import { Button } from "@material-ui/core";
import React, { Fragment } from "react";
import { Field } from "redux-form";

export const ResetPasswordForm = ({
  handleSubmit,
  onSubmitFormValues,
  resetFormFields,
}) => {
  return (
    <div className='form-container'>
      <form
        style={{ padding: "8% 0%" }}
        autoComplete={process.env.NODE_ENV === "development" ? "on" : "off"}
        onSubmit={handleSubmit(onSubmitFormValues)}
        noValidate>
        <Fragment>
          {resetFormFields.map(({ htmlFor, label, type }, index) => {
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
            Reset Password
          </Button>
        </Fragment>
      </form>
    </div>
  );
};
