// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

// Define interface for User document
interface UserDoc extends Document {
  username: string;
  email: string;
  password: string;
}

// Define schema for User collection
const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Define and export User model
const User = mongoose.model<UserDoc>('User', userSchema);

export default User;
