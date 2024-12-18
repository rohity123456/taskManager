export const constants = {
  //common
  defaultError: 'Something went wrong. Please try again later.',
  apiTimeout: 100000,
  TASK_PRIORITIES: ['Low', 'Medium', 'High', 'Critical'],
  TASK_STATUS: ['Pending', 'In Progress', 'Done']
};

type ConstantsType = typeof constants;

export const getConstant = (code: keyof ConstantsType) =>
  constants[code] as (typeof constants)[typeof code];

export enum PriorityEnum {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}
