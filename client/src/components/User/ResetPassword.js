import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import Form from "../Form";
import { resetFormFields } from "../../data";
import { loadResetPassword } from "../../actions";

const ResetPassword = (props) => {
  const { handleSubmit, loadResetPassword } = props;

  const onSubmitFormValues = () => loadResetPassword();

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

const mapDispatchToProps = (dispatch) => ({
  loadResetPassword: () => dispatch(loadResetPassword()),
});

export default connect(null, mapDispatchToProps)(formWrapped);
