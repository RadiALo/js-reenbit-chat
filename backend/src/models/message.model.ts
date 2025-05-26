import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },

  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'senderModel',
  },

  senderModel: {
    type: String,
    required: true,
    enum: ['User', 'Responder'],
  },

  text: { type: String, required: true },
}, {
  timestamps: true,
});

export const Message = model('Message', messageSchema);
