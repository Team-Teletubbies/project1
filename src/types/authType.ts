export interface userInput {
  email: string;
  password: string;
  name: string;
  profileImage?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  profileImage: string | null;
  refreshToken: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type userCreateDataType = Omit<User, 'password' | 'refreshToken'>;

export type userLoginType = Pick<User, 'email' | 'password'>;
