const ChatResolvers = {
  Query: {
    testChat: () => "Hello",
  },

  Mutation: {
    sendMessage: (parent, args, context, info) => {
      return {
        user: args.user,
        message: args.message,
      };
    },
  },
};

export default ChatResolvers;
