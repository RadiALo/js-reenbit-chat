import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
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

  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
    required: true
  }
})

export const Chat = model('Chat', chatSchema);
