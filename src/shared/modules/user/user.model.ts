import { Schema, Document, model } from 'mongoose';
import { User, UserType } from '../../types/index.js';

export interface UserDocument extends User, Document {
  userType: UserType;
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [1,'Min length for name is 1'],
    maxlength: [15,'Max length for name is 15'],
  },
  email: {
    type: String,
    unique: true,
    match: [ /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
  },
  avatar: {
    type: String,
    match: [/\.(jpg|png)$/i, 'User image not in .jpg or .png format'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6,'Min length for password is 6'],
    maxlength: [12,'Max length for password is 12'],
  },
  userType: {
    type: String,
    enum: Object.values(UserType),
    required: true
  },
}, { timestamps: true });


export const UserModel = model<UserDocument>('User', userSchema);
