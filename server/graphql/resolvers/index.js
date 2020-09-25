import Query from "./Query";
import Mutation from "./Mutation";
import BigInt from "apollo-type-bigint";

const BigIntresolver = {
  BigInt: new BigInt("safe"),
};

const resolvers = Object.assign(
  {},
  { Query, Mutation, BigInt: BigIntresolver }
);

export default resolvers;
