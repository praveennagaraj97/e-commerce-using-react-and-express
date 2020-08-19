const Query = {
  categories: async (parent, args, { getCategory }, info) => {
    const { data } = await getCategory();
    return data.map((category) => category);
  },

  products: async (parent, args, { getProduct }, info) => {
    const { data } = await getProduct();
    return data.map((product) => product);
  },
};

export { Query as default };
