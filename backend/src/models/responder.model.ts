import { Schema, model } from 'mongoose';

const ResponderSchema = new Schema({
  apiId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
}, {
  timestamps: true,
});

export const Responder = model('Responder', ResponderSchema);