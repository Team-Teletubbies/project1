import { define, nonempty, refine, size, string, object, optional, nullable } from 'superstruct';

const Email = define<string>(
  'Email',
  (value) => typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
);

const Password = refine(size(nonempty(string()), 8, 16), 'password', (value) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value),
);

const ImageExtensionStruct = refine(nonempty(string()), 'ImageExtension', (value) => {
  return /\.(png|jpg|jpeg)$/i.test(value);
});

const emailPasswordStruct = {
  email: Email,
  password: Password,
};

export const createUserBodyStruct = object({
  ...emailPasswordStruct,
  name: size(nonempty(string()), 1, 10),
  profileImage: optional(ImageExtensionStruct),
});

export const loginBodyStruct = object({
  ...emailPasswordStruct,
});

export const tokenResonesStruct = object({
  accessToken: string(),
  refreshToken: string(),
});

export const updateUserBodyStruct = object({
  email: optional(Email),
  name: optional(size(nonempty(string()), 1, 10)),
  currentPassword: Password,
  newPassword: optional(Password),
  profileImage: optional(nullable(ImageExtensionStruct)),
});
