import { User } from './user.type.js';

export type Comment = {
  comment: string;
  postDate: Date;
  rating: number;
  user: User;
}
