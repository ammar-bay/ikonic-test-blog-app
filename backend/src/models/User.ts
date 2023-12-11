import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

export default mongoose.model<IUser>('User', userSchema);