import axios from "axios";

import { API_BASE_URL_LIVE, API_BASE_URL_LOCAL } from "./index";

export const loginEndPoint = async (email, password) => {
  const response = await axios.post(
    `${
      process.env.NODE_ENV === "production"
        ? API_BASE_URL_LIVE
        : API_BASE_URL_LOCAL
    }/api/v1/signin`,
    {
      email,
      password,
    }
  );

  return response.data;
};

export const signUpEndPoint = async (
  name,
  email,
  password,
  confirmPassword,
  phoneNumber
) => {
  const signUpFields = {
    name,
    email,
    password,
    confirmPassword,
    phoneNumber,
  };

  const response = await axios.post(
    `${
      process.env.NODE_ENV === "production"
        ? API_BASE_URL_LIVE
        : API_BASE_URL_LOCAL
    }/api/v1/signup`,
    {
      ...signUpFields,
    }
  );

  return response.data;
};

export const authAccreditEndPoint = async (auth_token) => {
  const response = await axios.post(
    `${
      process.env.NODE_ENV === "production"
        ? API_BASE_URL_LIVE
        : API_BASE_URL_LOCAL
    }/api/v1/accredit`,
    {
      auth_token,
    }
  );

  return response.data;
};
