import axios from "axios";

export const loginEndPoint = async (email, password) => {
  const response = await axios.post("http://localhost:8080/api/v1/signin", {
    email,
    password,
  });

  return response.data;
};
