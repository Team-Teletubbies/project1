import { string, object, nonempty, size, partial } from 'superstruct';

export const createCommentBodyStruct = object({
  content: size(nonempty(string()), 1, 50),
});

export const updateCommentBodyStruct = partial(createCommentBodyStruct);
