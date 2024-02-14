import type { Directive, Plugin } from 'vue';
import { createVueDefaultPage, createPlugin, publicPropsKeys } from './core';
import type { DirectiveOptions, Options, Value } from './types';
import { omit, pick } from 'lodash';

export type VdpLoading = DirectiveOptions<'loading'>;
export type VdpSkeleton = DirectiveOptions<'skeleton'>;
export type VdpSkeletonList = DirectiveOptions<'skeletonList'>;
export type VdpSkeletonAvatar = DirectiveOptions<'skeletonAvatar'>;
export type VdpError = DirectiveOptions<'error'>;
export type VdpEmpty = DirectiveOptions<'empty'>;

export const vdpLoading = createPlugin('loading');
export const vdpSkeleton = createPlugin('skeleton');
export const vdpSkeletonAvatar = createPlugin('skeleton-avatar');
export const vdpSkeletonList = createPlugin('skeleton-list');
export const vdpError = createPlugin('error');
export const vdpEmpty = createPlugin('empty');

const names = [
  'loading',
  'skeleton',
  'skeletonAvatar',
  'skeletonList',
  'error',
  'empty',
] as const;
export const vueDefaultPage: Plugin<[options?: Options]> = {
  install(app, options = {}) {
    names.forEach((name) => {
      const other = omit(options, publicPropsKeys)[name] ?? {};
      const { enable, ...otherOptions } =
        typeof other === 'boolean' ? { enable: other } : other;
      const isEnable =
        enable ?? !['skeletonAvatar', 'skeletonList'].includes(name);
      if (!isEnable) return;
      app.directive(
        name,
        createVueDefaultPage(name, {
          ...pick(options, publicPropsKeys),
          ...otherOptions,
        })
      );
    });
  },
};

export {
  type Options as VueDefaultPage,
  type Value as VdpValue,
  vueDefaultPage as default,
  createVueDefaultPage,
};

declare module 'vue' {
  interface ComponentCustomProperties {
    vLoading: Directive<any, boolean>;
    vSkeleton: Directive<any, boolean>;
    vError: Directive<any, Value<'error'>>;
    vEmpty: Directive<any, boolean>;
  }
}
