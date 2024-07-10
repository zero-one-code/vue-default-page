import { mount } from '@vue/test-utils';
import { describe, test, expect, vi } from 'vitest';
import {
  attrs,
  EmptyMiniRender,
  EmptyRender,
  ErrorMiniRender,
  ErrorRender,
  getGlobalPlugins,
  LoadingMiniRender,
  LoadingRender,
  SkeletonAvatarRender,
  SkeletonListRender,
  SkeletonRender,
} from './utils';
import {
  DefaultPage,
  vdpEmpty,
  vdpError,
  vdpLoading,
  vdpSkeleton,
  vdpSkeletonAvatar,
  vdpSkeletonList,
} from '..';
import { nextTick } from 'vue';

describe('容器有高度', () => {
  test('指令（loading）', async () => {
    const wrapper = mount(LoadingRender, getGlobalPlugins(vdpLoading));
    await vi.waitUntil(() => wrapper.find('.vdp-picture-icon svg').exists());
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('指令（error）', async () => {
    const wrapper = mount(ErrorRender, getGlobalPlugins(vdpError));
    await vi.waitUntil(() => wrapper.find('.vdp-picture-icon svg').exists());
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('指令（empty）', async () => {
    const wrapper = mount(EmptyRender, getGlobalPlugins(vdpEmpty));
    await vi.waitUntil(() => wrapper.find('.vdp-picture-icon svg').exists());
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('组件（loading）', async () => {
    const wrapper = mount(() => <DefaultPage loading {...attrs}></DefaultPage>);
    await vi.waitUntil(() => wrapper.find('.vdp-picture-icon svg').exists());
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('组件（error）', async () => {
    const wrapper = mount(() => <DefaultPage error {...attrs}></DefaultPage>);
    await vi.waitUntil(() => wrapper.find('.vdp-picture-icon svg').exists());
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('组件（empty）', async () => {
    const wrapper = mount(() => <DefaultPage empty {...attrs}></DefaultPage>);
    await vi.waitUntil(() => wrapper.find('.vdp-picture-icon svg').exists());
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('容器无高度', () => {
  test('指令（loading）', async () => {
    const wrapper = mount(LoadingMiniRender, getGlobalPlugins(vdpLoading));
    await vi.waitUntil(() =>
      wrapper.find('.vdp-picture-text-icon svg').exists()
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('指令（skeleton）', async () => {
    const wrapper = mount(SkeletonRender, getGlobalPlugins(vdpSkeleton));
    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('指令（skeleton-avatar）', async () => {
    const wrapper = mount(
      SkeletonAvatarRender,
      getGlobalPlugins(vdpSkeletonAvatar)
    );
    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('指令（skeleton-list）', async () => {
    const wrapper = mount(
      SkeletonListRender,
      getGlobalPlugins(vdpSkeletonList)
    );
    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('指令（error）', async () => {
    const wrapper = mount(ErrorMiniRender, getGlobalPlugins(vdpError));
    await vi.waitUntil(() =>
      wrapper.find('.vdp-picture-text-icon svg').exists()
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('指令（empty）', async () => {
    const wrapper = mount(EmptyMiniRender, getGlobalPlugins(vdpEmpty));
    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('组件（loading）', async () => {
    const wrapper = mount(() => <DefaultPage loading></DefaultPage>);
    await vi.waitUntil(() =>
      wrapper.find('.vdp-picture-text-icon svg').exists()
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('组件（skeleton）', async () => {
    const wrapper = mount(() => <DefaultPage skeleton></DefaultPage>);
    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('组件（skeleton-avatar）', async () => {
    const wrapper = mount(() => <DefaultPage skeleton-avatar></DefaultPage>);
    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('组件（skeleton-list）', async () => {
    const wrapper = mount(() => <DefaultPage skeleton-list></DefaultPage>);
    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('组件（error）', async () => {
    const wrapper = mount(() => <DefaultPage error></DefaultPage>);
    await vi.waitUntil(() =>
      wrapper.find('.vdp-picture-text-icon svg').exists()
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('组件（empty）', async () => {
    const wrapper = mount(() => <DefaultPage empty></DefaultPage>);
    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
