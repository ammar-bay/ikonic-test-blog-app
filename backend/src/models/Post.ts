import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  userId: mongoose.Types.ObjectId;
}

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<IPost>('Post', postSchema);