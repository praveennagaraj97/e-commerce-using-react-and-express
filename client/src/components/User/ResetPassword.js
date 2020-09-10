import React from "react";
import { reduxForm } from "redux-form";

import Form from "../Form";
import { resetFormFields } from "../../data";

const ResetPassword = (props) => {
  const { handleSubmit } = props;

  const onSubmitFormValues = () => {};

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmitFormValues={onSubmitFormValues}
      resetForm={true}
      resetFormFields={resetFormFields}
    />
  );
};

const formWrapped = reduxForm({
  form: "resetForm",
})(ResetPassword);

export default formWrapped;
