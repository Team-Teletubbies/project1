import { userCrateDataType } from '../types/authType';

export class createUserResponseDTO {
  id: number;
  email: string;
  name: string;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(users: userCrateDataType) {
    this.id = users.id;
    this.email = users.email;
    this.name = users.name;
    this.profileImage = users.profileImage ?? '';
    this.createdAt = users.createdAt;
    this.updatedAt = users.updatedAt;
  }
}
