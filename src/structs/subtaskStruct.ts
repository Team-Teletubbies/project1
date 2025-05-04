import { object, string, nonempty, size, partial } from 'superstruct';

export const createSubtaskBodyStruct = object({
  title: size(nonempty(string()), 1, 100), // 제목은 1~100자
});

export const updateSubtaskBodyStruct = partial(createSubtaskBodyStruct);
