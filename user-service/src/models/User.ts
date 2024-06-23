import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userId: mongoose.Types.ObjectId;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phoneNumber: string;
  password: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
