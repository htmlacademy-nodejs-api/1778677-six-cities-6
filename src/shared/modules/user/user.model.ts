import { Schema, Document, model } from 'mongoose';
import { User, UserType } from '../../types/index.js';

export interface UserDocument extends User, Document {
  userType: UserType;
}

const userSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  password: String,
  userType: {
    type: String,
    enum: Object.values(UserType),
    required: true
  }
});

export const UserModel = model<UserDocument>('User', userSchema);
