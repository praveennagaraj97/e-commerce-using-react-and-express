import axios from "axios";

export const loginEndPoint = async (email, password) => {
  const response = await axios.post(
    "https://lexa-api.uc.r.appspot.com/api/v1/signin",
    {
      email,
      password,
    }
  );

  return response.data;
};
