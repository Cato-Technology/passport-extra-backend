// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

// Define interface for User document
interface UserDoc extends Document {
  username: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phoneNumber: string;
  password: string;
  role:string;
}

// Define schema for User collection
const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required:true},
});

// Define and export User model
const User = mongoose.model<UserDoc>('User', userSchema);

export default User;
