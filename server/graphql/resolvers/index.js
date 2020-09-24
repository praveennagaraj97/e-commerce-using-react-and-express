export const resolvers = {
  Query: {
    aboutDeveloper: () => ({
      name: "Praveen Nagaraj",
      age: 22,
      location: "Bangalore",
    }),

    getAllCategories: (parent, args, { Category }, info) => Category.find(),

    getAllProducts: (parent, args, { Product }, info) => Product.find(),
  },
};
