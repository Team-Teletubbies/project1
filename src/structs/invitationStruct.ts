import { object, nonempty, string } from 'superstruct';

export const invitationActionStruct = object({
  invitationId: nonempty(string()),
});
