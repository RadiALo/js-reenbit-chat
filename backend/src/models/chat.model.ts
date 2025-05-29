import { Schema, model, Types, Document } from 'mongoose';
import { IResponder } from './responder.model';
import { Message } from './message.model';

export interface IChat extends Document {
  owner: Types.ObjectId;
  responder: Types.ObjectId | IResponder;
  prefferedName: string;
  messages: Types.ObjectId[];
  lastMessage: Types.ObjectId;
}

const chatSchema = new Schema<IChat>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  responder: {
    type: Schema.Types.ObjectId,
    ref: 'Responder',
    required: true
  },

  prefferedName: {
    type: Schema.Types.String,
    default: ''
  },

  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message',
    required: true
  }],

  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }
})

chatSchema.pre('findOneAndDelete', async function (next) {
  const chat = await this.model.findOne(this.getFilter());

  if (chat) {
    const messageIds = [...chat.messages];

    await Message.deleteMany({ _id: { $in: messageIds } });
  }

  next();
});

export const Chat = model<IChat>('Chat', chatSchema);
