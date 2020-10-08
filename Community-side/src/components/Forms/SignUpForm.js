import React, { useState } from "react";
import { Field } from "redux-form";
import _ from "lodash";

import { signUpFormFields } from "../../data";
import { manufacturerSignUp } from "../../api";
import { showErrorMessage, showSuccessMessage } from "../../actions";
import { useDispatch } from "react-redux";
import history from "../../history";
import { setSessionItem } from "../../utils";
import { COOKIE_NAME } from "../../constants";
const { AUTH_TOKEN } = COOKIE_NAME;

export const SignUpForm = ({
  handleSubmit,
  showMaps,
  setShowMaps,
  setForm,
  loginSelected,
}) => {
  const [coordinates, setCoordinates] = useState([null, null]);
  const dispatch = useDispatch();

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;
    setCoordinates([String(crd.latitude), String(crd.longitude)]);
    return { lat: crd.latitude, long: crd.longitude };
  }

  function error(err) {
    alert(`ERROR(${err.code}): ${err.message}`);
  }

  const handleSignUp = async (values) => {
    if (_.isEmpty(values) || coordinates.length !== 2) {
      dispatch(showErrorMessage("Fill all fields and allow location!"));
      setTimeout(() => {
        dispatch(showErrorMessage(null));
      }, 3200);
      return;
    }
    const modelledData = {
      name: values.name,
      email: values.email,
      password: values.signuppassword,
      confirmPassword: values.confirmPassword,
      phoneNumber: values.phoneNumber,
      warehouseLocation: coordinates,
      countryofOrigin: values.countryofOrigin,
      companyName: values.companyName,
    };

    try {
      const { data } = await manufacturerSignUp(modelledData);
      setSessionItem(AUTH_TOKEN, data.token);

      dispatch(
        showSuccessMessage(
          "Sign Up successfull check your mail for credentials"
        )
      );
      setTimeout(() => {
        dispatch(showSuccessMessage(null));
        history.push("/");
      }, 3200);
    } catch (err) {
      // console.clear();
      try {
        dispatch(showErrorMessage(err.response.data.message));
        setTimeout(() => {
          dispatch(showErrorMessage(null));
        }, 3200);
      } catch (error) {
        dispatch(showErrorMessage("Something went wrong"));
        setTimeout(() => {
          dispatch(showErrorMessage(null));
        }, 3200);
      }
    }
  };

  return (
    <>
      <form className='auth-form' onSubmit={handleSubmit(handleSignUp)}>
        {signUpFormFields.map(({ htmlFor, name, placeholder, type }, index) => {
          return (
            <React.Fragment key={index}>
              <label htmlFor='name'>{name}</label>
              <Field
                type={type}
                className='auth-fields'
                name={htmlFor}
                component='input'
                placeholder={placeholder}
                required
              />
            </React.Fragment>
          );
        })}

        <p
          onClick={() =>
            navigator.geolocation.getCurrentPosition(success, error, options)
          }
        >
          Select warehouse location - current location
        </p>

        <p
          style={{ textDecoration: "line-through" }}
          onClick={() => setShowMaps(!showMaps)}
        >
          Select warehouse location(Not available)
        </p>

        <button type='submit'>Sign up</button>
      </form>
      <p onClick={() => setForm(!loginSelected)}>
        {loginSelected ? "Join as Manufacturer !" : "Have account? login"}
      </p>
    </>
  );
};
