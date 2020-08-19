const Category = {
  products: async (parent, args, { getProduct }, info) => {
    const { data } = await getProduct();

    return data.filter(({ category }) => parent.id == category);
  },
};

export { Category as default };
