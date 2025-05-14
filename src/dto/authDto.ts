import { userCreateDataType } from '../types/authType';

export class createUserResponseDTO {
  id: number;
  email: string;
  name: string;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(users: userCreateDataType) {
    this.id = users.id;
    this.email = users.email;
    this.name = users.name;
    this.profileImage = users.profileImage ?? '';
    this.createdAt = users.createdAt;
    this.updatedAt = users.updatedAt;
  }
}

export class tokenResponsDTO {
  accessToken: string;
  refreshToken: string;

  constructor(tokens: { accessToken: string; refreshToken: string }) {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
  }
}
