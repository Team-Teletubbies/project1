import {
  string,
  number,
  object,
  literal,
  union,
  refine,
  nonempty,
  size,
  array,
  partial,
} from 'superstruct';

const StatusStruct = union([literal('todo'), literal('in_progress'), literal('done')]);

const YearStruct = refine(number(), 'Year', (value) => value >= 2025);
const MonthStruct = refine(number(), 'Month', (value) => value >= 1 && value <= 12);
const DayStruct = refine(number(), 'Day', (value) => value >= 1 && value <= 31);

export const createTaskStruct = object({
  title: size(nonempty(string()), 1, 30),
  startYear: YearStruct,
  startMonth: MonthStruct,
  startDay: DayStruct,
  endYear: YearStruct,
  endMonth: MonthStruct,
  endDay: DayStruct,
  status: StatusStruct,
  tags: array(nonempty(string())),
  attachments: array(nonempty(string())),
});

export const updateTaskStruct = partial(createTaskStruct);
