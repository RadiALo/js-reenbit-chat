import { Schema, model, Document } from 'mongoose';

export interface IResponder extends Document {
  _id: string;
  apiId: string;
  name: string;
}

const ResponderSchema = new Schema<IResponder>({
  apiId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
}, {
  timestamps: true,
});

export const Responder = model<IResponder>('Responder', ResponderSchema);