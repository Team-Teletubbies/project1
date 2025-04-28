import { string, object, nonempty, size, partial } from 'superstruct';

export const createProjectStruct = object({
  name: nonempty(size(string(), 1, 20)),
  description: nonempty(size(string(), 1, 50)),
});

export const updateProjectStruct = partial(createProjectStruct);
