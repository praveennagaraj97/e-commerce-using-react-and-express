import Axios from "axios";

export const addNewCategory = async (data) => {
  return await Axios.post(
    "http://localhost:8080/api/v1/dev/addNewCategory",
    data
  );
};
