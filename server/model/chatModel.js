import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
    },
    reciever: {
      type: Schema.Types.ObjectId,
    },
    sent: {
      type: [String],
    },
    recieved: {
      type: [String],
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Chat = model("Chat", chatSchema);
export default Chat;
