import { type Plugin } from 'vue';
import type { DefaultPageType, DefaultPageOptions } from './type';
import _DefaultPage from './DefaultPage.vue';
import { PROPS_KEY } from './keys';

export const DefaultPage = {
  ..._DefaultPage,
  install(app, options = {}) {
    const { name = 'DefaultPage', ...initProps } = options;
    app.provide(PROPS_KEY, initProps);
    app.component(name, _DefaultPage);
  },
} as DefaultPageType & Plugin<[options?: DefaultPageOptions]>;

declare module 'vue' {
  export interface GlobalComponents {
    DefaultPage: DefaultPageType;
  }
}
