import { Schema, Document, model } from 'mongoose';
import { User, UserType } from '../../types/index.js';

export interface UserDocument extends User, Document {
  userType: UserType;
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  avatar: String,
  password: String,
  userType: {
    type: String,
    enum: Object.values(UserType),
    required: true
  },
}, { timestamps: true });


export const UserModel = model<UserDocument>('User', userSchema);
