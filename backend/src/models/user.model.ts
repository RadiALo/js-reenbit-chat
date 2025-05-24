import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
})

export const User = model('User', userSchema);
