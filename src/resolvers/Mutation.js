const Mutation = {
  addCategorie: async (parent, args, { postCategory, getCategory }, info) => {
    const { data } = await getCategory();
    const categoryExist = data.find(
      ({ categoryName }) => categoryName === args.data.categoryName
    );

    if (categoryExist) {
      throw new Error("Category Already in Store");
    }

    if (data.length > 0) {
      const prevId = data[data.length - 1].id;
      args.data.id = prevId + 1;
    } else {
      args.data.id = 1;
    }

    const response = await postCategory({ ...args.data });

    return response.data;
  },

  addProduct: async (parent, args, { getProduct, postProduct }, info) => {
    const { data } = await getProduct();

    const productExist = data.find(
      ({ productName }) => productName === args.data.productName
    );

    if (productExist) {
      throw new Error("Product Already in Store");
    }

    if (data.length > 0) {
      const prevId = data[data.length - 1].id;
      args.data.id = prevId + 1;
    } else {
      args.data.id = 1;
    }

    const response = await postProduct({ ...args.data });
    return response.data;
  },
};

export default Mutation;
