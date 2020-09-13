export const def = <T>(...values: T[]): T =>
  values.find((value) => typeof value !== 'undefined');
