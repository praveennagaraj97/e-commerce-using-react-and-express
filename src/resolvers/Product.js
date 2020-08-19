const Product = {
  category: async (parent, args, { getCategory }, info) => {
    const { data } = await getCategory();
    return data.find(({ id }) => parent.category == id);
  },
};

export { Product as default };
