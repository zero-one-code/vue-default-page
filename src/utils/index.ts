import { isNil, kebabCase } from 'lodash';

export function isNumeric(value: number | string) {
  return typeof value === 'number' || /^\d+(\.\d+)?$/.test(value);
}

export function addUnit(value?: number | string) {
  if (isNil(value)) return undefined;
  return isNumeric(value) ? `${value}px` : String(value);
}

const namespace = 'vdp';
export function getPrefix(string = '', chars = '-') {
  return [namespace, ...kebabCase(string).split('-')]
    .filter((item) => item)
    .join(chars);
}
