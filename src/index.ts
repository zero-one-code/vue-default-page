import type { Directive } from 'vue';
import type { VdpValue } from './components/core/type';
import { createPlugin } from './components/core';

export type {
  VueDefaultPage,
  VdpLoading,
  VdpSkeleton,
  VdpSkeletonList,
  VdpSkeletonAvatar,
  VdpError,
  VdpEmpty,
  VdpValue,
} from './components/core/type';
export {
  vueDefaultPage,
  vueDefaultPage as default,
  createVueDefaultPage,
} from './components/core';

export const vdpLoading = createPlugin('loading');
export const vdpSkeleton = createPlugin('skeleton');
export const vdpSkeletonAvatar = createPlugin('skeleton-avatar');
export const vdpSkeletonList = createPlugin('skeleton-list');
export const vdpError = createPlugin('error');
export const vdpEmpty = createPlugin('empty');

export type {
  DefaultPageOptions,
  DefaultPageProps,
} from './components/default-page/type';
export { DefaultPage } from './components/default-page';

declare module 'vue' {
  interface ComponentCustomProperties {
    vLoading: Directive<any, boolean>;
    vSkeleton: Directive<any, boolean>;
    vError: Directive<any, VdpValue<'error'>>;
    vEmpty: Directive<any, boolean>;
  }
}
