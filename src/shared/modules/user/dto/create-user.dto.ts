import { UserType } from '../../../types/user-type.type.js';

export class CreateUserDto {
  public name: string;
  public email: string;
  public avatar: string;
  public password: string;
  public userType: UserType;
}
