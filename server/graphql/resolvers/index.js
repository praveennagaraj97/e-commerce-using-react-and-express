import BigInt from "apollo-type-bigint";

import ProductResolvers from "./products";
import UserAuthenticationResolvers from "./user/Authentication";
import ChatResolvers from "./chat";

const BigIntresolver = {
  BigInt: new BigInt("safe"),
};

const MySelf = {
  name: "Praveen Nagaraj",
  age: 22,
  location: "Bangalore",
};

const Query = {
  aboutDeveloper: () => MySelf,
  ...ProductResolvers.Query,
  ...ChatResolvers.Query,
};

const Mutation = {
  _rootMutation: (parent, args, context, info) => `Welcome ${args.name}`,
  ...ProductResolvers.Mutation,
  ...UserAuthenticationResolvers.Mutation,
  ...ChatResolvers.Mutation,
};

const resolvers = Object.assign(
  {},
  {
    Query,
    Mutation,
    BigInt: BigIntresolver,
  }
);

export default resolvers;
