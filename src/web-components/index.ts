import { defineCustomElement } from 'vue';
import _DefaultPage from '../components/default-page/DefaultPage.vue';
import type { DefaultPageOptions } from '../components/default-page/type';
import styles from '../style/index.less?inline';

_DefaultPage.styles = [styles];
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
