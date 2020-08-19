import axios from "axios";

const getProduct = () => axios.get("http://localhost:3001/products");
const postProduct = ({ id, productName, productPrice, images, category }) =>
  axios.post("http://localhost:3001/products", {
    id,
    productName,
    productPrice,
    images,
    category,
  });

const getCategory = () => axios.get("http://localhost:3001/categories");
const postCategory = ({ id, categoryName, categoryLogo }) =>
  axios.post("http://localhost:3001/categories", {
    id,
    categoryName,
    categoryLogo,
  });

const db = {
  getProduct,
  getCategory,
  postProduct,
  postCategory,
};

export { db as default };
