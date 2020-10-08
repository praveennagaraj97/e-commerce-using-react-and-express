import React from "react";
import { Field } from "redux-form";

export const LoginForm = ({
  handleLogin,
  handleSubmit,
  setForm,
  loginSelected,
}) => {
  return (
    <>
      <form className='auth-form' onSubmit={handleSubmit(handleLogin)}>
        <label htmlFor='userId'>Employee-ID /Manufacturer-ID</label>
        <Field
          type='text'
          className='auth-fields'
          name='userId'
          component='input'
        />

        <label htmlFor='password'>Password</label>
        <Field
          type='password'
          className='auth-fields'
          name='password'
          component='input'
        />

        <button type='submit'>Login</button>
      </form>
      <p onClick={() => setForm(!loginSelected)}>
        {loginSelected ? "Join as Manufacturer !" : "go Back and login"}
      </p>
    </>
  );
};
