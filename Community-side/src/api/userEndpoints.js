import { API_BASE_ENDPOINT } from "./index";

export const employeeLogin = async (data) =>
  await API_BASE_ENDPOINT.post("/user/employeeSignIn", data);

export const manufacturerLogin = async (data) =>
  await API_BASE_ENDPOINT.post("/user/manufacturerSignIn", data);

export const manufacturerSignUp = async (data) =>
  await API_BASE_ENDPOINT.post(`/user/signUpasManufacturer`, data);
