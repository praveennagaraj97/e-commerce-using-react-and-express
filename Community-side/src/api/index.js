import Axios from "axios";

export const API_BASE_ENDPOINT = Axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api/v1"
      : "https://lexa-api.uc.r.appspot.com/api/v1",
});

export {
  employeeLogin,
  manufacturerLogin,
  manufacturerSignUp,
} from "./userEndpoints";
export {
  getAllCategories,
  addNewCategory,
  editCategory,
  deleteCategory,
  // Products Crud
  addProductModel,
  addproductDetail,
  addProductImgAndDesc,
  addProductBoards,
  getMyOrders,
  updateUserOrder,
  getMyProduct,
  updateProductQuantity,
} from "./productsEndpoint";
