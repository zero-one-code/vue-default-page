import { defineCustomElement } from 'vue';
import _DefaultPage from '../components/default-page/DefaultPage.ce.vue';
import type { DefaultPageOptions } from '../components/default-page/type';

export const DefaultPage = defineCustomElement(_DefaultPage);
export function createDefaultPage(options: DefaultPageOptions = {}) {
  const { name = 'default-page', ...initProps } = options;
  customElements.define(
    name,
    class extends DefaultPage {
      constructor() {
        super({ initProps });
      }
    }
  );
}
