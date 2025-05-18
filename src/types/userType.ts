type BaseUserUpdate = {
  id: number;
  name?: string;
  email?: string;
  profileImage?: string | null;
};

type PasswordUpdate = {
  currentPassword: string;
  newPassword: string;
};

export type UpdateUserDataType = BaseUserUpdate | (BaseUserUpdate & PasswordUpdate);

export type UserUpdateDataForRepo = {
  name?: string;
  email?: string;
  profileImage?: string | null;
  password?: string;
};
