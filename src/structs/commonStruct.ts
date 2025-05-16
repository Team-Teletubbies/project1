import {
  coerce,
  integer,
  string,
  object,
  defaulted,
  optional,
  nonempty,
  Infer,
  literal,
  union,
  pattern,
} from 'superstruct';

const integerString = coerce(integer(), string(), (value: string) => parseInt(value));

export const IdParamsStruct = object({
  id: integerString,
});

export type IdParams = Infer<typeof IdParamsStruct>;

export const PageParamsStruct = object({
  page: defaulted(integerString, 1),
  pageSize: defaulted(integerString, 8),
  keyword: optional(nonempty(string())),
});

export type PageParams = Infer<typeof PageParamsStruct>;

export const userPageParamStruct = object({
  page: defaulted(integerString, 1),
  limit: defaulted(integerString, 8),
  order: defaulted(union([literal('asc'), literal('desc')]), 'desc'),
  order_by: defaulted(union([literal('createdAt'), literal('name')]), 'createdAt'),
});

const dataString = pattern(string(), /^\d{4}-\d{2}-\d{2}$/);

export const userTaskPageParamStruct = object({
  from: optional(dataString),
  to: optional(dataString),
  project_id: optional(integerString),
  status: optional(union([literal('todo'), literal('in_progress'), literal('done')])),
  assignee: optional(integerString),
  keyword: optional(string()),
});
