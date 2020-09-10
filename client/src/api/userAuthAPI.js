import { apiBaseEndpoint } from "./index";

export const loginEndPoint = async (email, password, expiresIn) => {
  const response = await apiBaseEndpoint.post("/user/signin", {
    email,
    password,
    expiresIn,
  });

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

  const response = await apiBaseEndpoint.post(`/user/signup`, {
    ...signUpFields,
  });

  return response;
};

export const authAccreditationEndPoint = async (auth_token) => {
  const response = await apiBaseEndpoint.get(`/user/accredit`, {
    headers: {
      authorization: `Bearer ${auth_token}`,
    },
  });
  return response;
};

export const forgotPasswordEndpoint = async (email) => {
  const response = await apiBaseEndpoint.post(`/user/forgotPassword`, {
    email,
  });
  return response;
};

export const resetPasswordEndpoint = async (
  resetToken,
  password,
  confirmPassword
) => {};
