import React, { Fragment } from "react";
import { Field } from "redux-form";

import "../styles/user.scss";
import { Button } from "@material-ui/core";

const Form = (props) => {
  const {
    handleSubmit,
    onSubmitFormValues,

    // User Auth
    formSelected,
    buttonToShow,
    signedInOption,
    forgotPasswordLink,
    authForm,

    // resetForm
    resetForm,
    resetFormFields,
  } = props;

  const signUpAndLoginForm = () => {
    return (
      <div className='form-container'>
        <form
          style={{ padding: "8% 0%" }}
          autoComplete={process.env.NODE_ENV === "development" ? "on" : "off"}
          onSubmit={handleSubmit(onSubmitFormValues)}
          noValidate>
          <Fragment>
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
            {signedInOption}
            {forgotPasswordLink}

            <Button style={{ backgroundColor: "white" }} type='submit'>
              {buttonToShow}
            </Button>
          </Fragment>
        </form>
      </div>
    );
  };

  const resetPasswordForm = () => {
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

  if (authForm) {
    return signUpAndLoginForm();
  } else if (resetForm) {
    return resetPasswordForm();
  } else {
    return (
      <h1 style={{ color: "white", textAlign: "center" }}>
        Something went Wrong
      </h1>
    );
  }
};

export default Form;
