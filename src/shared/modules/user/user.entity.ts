import { defaultClasses, getModelForClass, prop } from '@typegoose/typegoose';
import { User, UserType } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, minlength: [1,'Min length for name is 1'], maxlength: [15,'Max length for name is 15'] })
  public name: string;

  @prop({ required: false, unique: true, match: [ /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect']})
  public email: string;

  @prop({ required: false, match: [/\.(jpg|png)$/i, 'User image not in .jpg or .png format']})
  public avatar: string;

  @prop({ required: true, minlength: [6,'Min length for password is 6'], maxlength: [12,'Max length for password is 12']})
  public password: string;

  @prop({ required: true, enum: Object.values(UserType)})
  public userType: UserType;
}

export const UserModel = getModelForClass(UserEntity);
