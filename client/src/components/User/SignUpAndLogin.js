import React, { useState } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles, Button } from "@material-ui/core";

import Form from "../Form";
import { loginFormFields, signUpFormFields } from "../../data";

import { loadLogin, loadSignUp } from "../../actions";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    margin: "auto",
    marginTop: "5vh",
    display: "flex",
    justifyContent: "space-evenly",
    marginBottom: "3vh",
  },
  keepmesigned: {
    padding: "4%",
    color: "white",
  },
  labelSignedIn: {
    padding: "0 8px",
  },
}));

const SignUpAndLogin = (props) => {
  const classes = useStyles();
  const [showForm, setShowForm] = useState("login");
  const { handleSubmit, loadLogin, loadSignUp } = props;

  const onSubmitForm = () => {
    showForm === "login" ? loadLogin() : loadSignUp();
  };

  const keepMeSignedIn = () => {
    return (
      <div className={classes.keepmesigned}>
        <label className={classes.labelSignedIn} htmlFor='signedIn'>
          Keep Signed In
        </label>
        <Field
          name='signedIn'
          id='signedIn'
          component='input'
          type='checkbox'
        />
      </div>
    );
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
        signedInOption={showForm === "login" ? keepMeSignedIn() : ""}
      />
    </React.Fragment>
  );
};

const reduxFormWrapper = reduxForm({
  form: "SignUpOrLogin",
})(SignUpAndLogin);

const mapDispatchToProps = (dispatch) => ({
  loadLogin: () => dispatch(loadLogin()),
  loadSignUp: () => dispatch(loadSignUp()),
});

export default connect(null, mapDispatchToProps)(reduxFormWrapper);
