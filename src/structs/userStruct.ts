import {
  define,
  nonempty,
  refine,
  size,
  string,
  object,
  optional,
  nullable,
  union,
  intersection,
} from 'superstruct';

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

const userInfoStruct = object({
  email: optional(Email),
  name: optional(size(nonempty(string()), 1, 10)),
  profileImage: optional(nullable(ImageExtensionStruct)),
});

const passwordUpdateStruct = object({
  currentPassword: Password,
  newPassword: Password,
});

export const updateUserBodyStruct = union([
  userInfoStruct,
  passwordUpdateStruct,
  intersection([userInfoStruct, passwordUpdateStruct]),
]);
