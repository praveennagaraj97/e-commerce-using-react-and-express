import React, { useState } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles, Button } from "@material-ui/core";

import Form from "../Form";
import { loginFormFields, signUpFormFields } from "../../data";

import { loadLogin, loadSignup } from "../../actions";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    margin: "auto",
    marginTop: "3vh",
    display: "flex",
    justifyContent: "space-evenly",
    marginBottom: "3vh",
  },
}));

const SignUpAndLogin = (props) => {
  const classes = useStyles();
  const [showForm, setShowForm] = useState("login");
  const { handleSubmit, loadLogin, loadSignup } = props;

  const onSubmitForm = (formValues) => {
    if (showForm === "login") return loadLogin();
    loadSignup();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.formContainer} maxWidth='md'>
        <Button onClick={() => setShowForm("login")} variant='contained'>
          Login
        </Button>
        <Button
          onClick={() => setShowForm("signup")}
          variant='contained'
          color='primary'>
          Sign Up
        </Button>
      </Container>

      <Form
        handleSubmit={handleSubmit}
        onSubmitFormValues={onSubmitForm}
        formSelected={showForm === "login" ? loginFormFields : signUpFormFields}
        buttonToShow={showForm === "login" ? "Login" : "SignUp"}
      />
    </React.Fragment>
  );
};

const reduxFormWrapper = reduxForm({
  form: "SignUpOrLogin",
})(SignUpAndLogin);

const mapDispatchToProps = (dispatch) => ({
  loadLogin: () => dispatch(loadLogin()),
  loadSignup: () => dispatch(loadSignup()),
});

export default connect(null, mapDispatchToProps)(reduxFormWrapper);
