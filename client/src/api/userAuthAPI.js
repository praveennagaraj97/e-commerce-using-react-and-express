import Axios from "axios";

import { API_BASE_URL_LIVE, API_BASE_URL_LOCAL } from "./index";

export const loginEndPoint = async (email, password, expiresIn) => {
  const response = await Axios.post(
    `${
      process.env.NODE_ENV === "production"
        ? API_BASE_URL_LIVE
        : API_BASE_URL_LOCAL
    }/api/v1/user/signin`,
    {
      email,
      password,
      expiresIn,
    }
  );

  return response;
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

  const response = await Axios.post(
    `${
      process.env.NODE_ENV === "production"
        ? API_BASE_URL_LIVE
        : API_BASE_URL_LOCAL
    }/api/v1/user/signup`,
    {
      ...signUpFields,
    }
  );

  return response;
};

export const authAccreditationEndPoint = async (auth_token) => {
  const response = await Axios.get(
    `${
      process.env.NODE_ENV === "production"
        ? API_BASE_URL_LIVE
        : API_BASE_URL_LOCAL
    }/api/v1/user/accredit`,
    {
      headers: {
        authorization: `Bearer ${auth_token}`,
      },
    }
  );
  return response;
};
