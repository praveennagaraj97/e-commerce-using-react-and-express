import React, { useState } from "react";
import { reduxForm } from "redux-form";

import "../../styles/user.scss";
import { loadLogin } from "../../actions";
import { SignUpForm, LoginForm } from "../Forms";
import GoogleMaps from "../GoogleMaps";
import { useDispatch } from "react-redux";

// Form To Only SignIn
// Signup is available via only api template view
// To forms manufacturer and Employee

const Login = ({ handleSubmit }) => {
  const [loginSelected, setForm] = useState(true);
  const [showMaps, setShowMaps] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <div className='user-auth-container'>
        {loginSelected ? (
          <LoginForm
            handleSubmit={handleSubmit}
            handleLogin={() => dispatch(loadLogin())}
            loginSelected={loginSelected}
            setForm={setForm}
          />
        ) : (
          <SignUpForm
            handleSubmit={handleSubmit}
            loginSelected={loginSelected}
            setForm={setForm}
            setShowMaps={setShowMaps}
            showMaps={showMaps}
          />
        )}
      </div>
      {showMaps && !loginSelected ? <GoogleMaps /> : ""}
    </>
  );
};

const reduxFormWrapper = reduxForm({
  form: "userAuth",
})(Login);

export default reduxFormWrapper;
