import { ApolloError } from "apollo-server-express";

const Mutation = {
  getProductBasedOnCategory: async (
    parent,
    { name },
    { Product, Category },
    info
  ) => {
    if (!name) return Product.find();

    const category = await Category.findOne({ categoryName: name });
    if (!category) {
      throw new ApolloError("No Products Found With The given Category.", 404);
    }
    return await Product.find({ categoryId: category._id });
  },
};

export default Mutation;
