import { UserType } from './user-type.type.js';

export type User = {
  name: string;
  email: string;
  avatar: string;
  password: string;
  userType: UserType;
}
