import { chain, isNil, kebabCase } from 'lodash';
import type { CamelName, CoreProps } from '../components/core/type';

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

export const INSTANCE_KEY = Symbol(getPrefix());

export const DIRECTIVE_NAMES: CamelName[] = [
  'loading',
  'skeleton',
  'skeletonAvatar',
  'skeletonList',
  'error',
  'empty',
];

export const isShowMask = (props: CoreProps) =>
  chain(props)
    .pick(DIRECTIVE_NAMES)
    .some((val) => (Array.isArray(val) ? val[0] : !!val))
    .value();

export function isLayoutPosition(position: string) {
  return /relative|absolute|fixed/i.test(position);
}
