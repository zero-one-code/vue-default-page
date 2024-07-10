import { mount } from '@vue/test-utils';
import { createDefaultPage } from '..';
import { test, expect, beforeAll, vi, describe } from 'vitest';
import { attrs } from '../../__tests__/utils';
import { nextTick } from 'vue';
import '../../style/index.less';

beforeAll(() => createDefaultPage());

const options = {
  attachTo: document.body,
};

describe('容器有高度', () => {
  test('loading', async () => {
    const wrapper = mount(
      () => <default-page loading {...attrs}></default-page>,
      options
    );
    const { shadowRoot } = wrapper.element;
    await vi.waitUntil(() =>
      shadowRoot?.querySelector('.vdp-picture-icon svg')
    );
    expect(shadowRoot?.querySelector('div')?.outerHTML).toMatchSnapshot();
  });
  test('error', async () => {
    const wrapper = mount(
      () => <default-page error {...attrs}></default-page>,
      options
    );
    const { shadowRoot } = wrapper.element;
    await vi.waitUntil(() =>
      shadowRoot?.querySelector('.vdp-picture-icon svg')
    );
    expect(shadowRoot?.querySelector('div')?.outerHTML).toMatchSnapshot();
  });
  test('empty', async () => {
    const wrapper = mount(
      () => <default-page empty {...attrs}></default-page>,
      options
    );
    const { shadowRoot } = wrapper.element;
    await vi.waitUntil(() =>
      shadowRoot?.querySelector('.vdp-picture-icon svg')
    );
    expect(shadowRoot?.querySelector('div')?.outerHTML).toMatchSnapshot();
  });
});

describe('容器无高度', () => {
  test('loading', async () => {
    const wrapper = mount(() => <default-page loading></default-page>, options);
    const { shadowRoot } = wrapper.element;
    await vi.waitUntil(() =>
      shadowRoot?.querySelector('.vdp-picture-text-icon svg')
    );
    expect(shadowRoot?.querySelector('div')?.outerHTML).toMatchSnapshot();
  });
  test('skeleton', async () => {
    const wrapper = mount(
      () => <default-page skeleton></default-page>,
      options
    );
    const { shadowRoot } = wrapper.element;
    await nextTick();
    expect(shadowRoot?.querySelector('div')?.outerHTML).toMatchSnapshot();
  });
  test('skeleton-avatar', async () => {
    const wrapper = mount(
      () => <default-page skeletonAvatar></default-page>,
      options
    );
    const { shadowRoot } = wrapper.element;
    await nextTick();
    expect(shadowRoot?.querySelector('div')?.outerHTML).toMatchSnapshot();
  });
  test('skeleton-list', async () => {
    const wrapper = mount(
      () => <default-page skeletonList></default-page>,
      options
    );
    const { shadowRoot } = wrapper.element;
    await nextTick();
    expect(shadowRoot?.querySelector('div')?.outerHTML).toMatchSnapshot();
  });
  test('error', async () => {
    const wrapper = mount(() => <default-page error></default-page>, options);
    const { shadowRoot } = wrapper.element;
    await vi.waitUntil(() =>
      shadowRoot?.querySelector('.vdp-picture-text-icon svg')
    );
    expect(shadowRoot?.querySelector('div')?.outerHTML).toMatchSnapshot();
  });
  test('empty', async () => {
    const wrapper = mount(() => <default-page empty></default-page>, options);
    const { shadowRoot } = wrapper.element;
    await nextTick();
    expect(shadowRoot?.querySelector('div')?.outerHTML).toMatchSnapshot();
  });
});
