const Query = {
  aboutDeveloper: () => ({
    name: "Praveen Nagaraj",
    age: 22,
    location: "Bangalore",
  }),

  getAllCategories: (parent, args, { Category }, info) => Category.find(),

  getAllCategoriesWithItsProduct: async (
    parent,
    args,
    { Category, Product },
    info
  ) => {
    const category = await Category.find();

    const results = [];

    for (let each of category) {
      const products = await Product.find({ categoryId: each._id });
      results.push({ ...each._doc, products });
    }

    return results;
  },

  getAllProducts: (parent, args, { Product }, info) => Product.find(),
};

export default Query;
