import { ApolloError, AuthenticationError } from "apollo-server-express";
import { authCheck } from "../../middleware";

const ChatResolvers = {
  Query: {
    testChat: () => "Hello",
  },

  Mutation: {
    sendMessage: async (parent, args, { User, Chat, req }, info) => {
      const input = { ...args };

      if (!input.to) return new ApolloError("Enter the sender Detail", 422);
      if (!input.message)
        return new ApolloError("Message cannot be empty", 422);

      const { error, user } = await authCheck(req, User);
      if (error) return new AuthenticationError(error);

      if (input.to == user._id)
        return new ApolloError(
          "You are not allowed to send message to yourseld",
          422
        );

      // Check If Chat Box exist between reciever and sender!
      const chatExist = await Chat.findOne({
        sender: user._id,
        reciever: input.to,
      });

      if (!chatExist || chatExist.length < 1) {
        await Chat.create({
          sender: user._id,
          reciever: input.to,
        });

        await Chat.create({
          sender: input.to,
          reciever: user._id,
        });

        await Chat.findOneAndUpdate(
          { sender: user._id },
          { $push: { sent: input.message } }
        );
        await Chat.findOneAndUpdate(
          { sender: input.to },
          { $push: { recieved: input.message } }
        );
      } else {
        await Chat.findOneAndUpdate(
          { sender: user._id },
          { $push: { sent: input.message } }
        );
        await Chat.findOneAndUpdate(
          { sender: input.to },
          { $push: { recieved: input.message } }
        );
      }

      const chatBody = {
        from: user._id,
        ...input,
      };

      return chatBody;
    },
  },
};

export default ChatResolvers;
