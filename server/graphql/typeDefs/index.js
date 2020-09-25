import Query from "./Query";
import Types from "./Types";
import Mutation from "./Mutation";

import UserTypeDefs from "./user";
// import Subscription from "./Subscription";

const typeDefs = [Types, Query, Mutation, UserTypeDefs];

export default typeDefs;
