import type { Plugin } from 'vue';

export function getGlobalPlugins(plugin: Plugin | [Plugin, ...any[]]) {
  return {
    global: {
      plugins: [plugin],
    },
  };
}

export const attrs = { style: { height: '484px' } };

export function LoadingRender() {
  return <div v-loading={true} {...attrs}></div>;
}
export function LoadingMiniRender() {
  return <div v-loading={true}></div>;
}
export function SkeletonRender() {
  return <div v-skeleton={true} {...attrs}></div>;
}
export function SkeletonMiniRender() {
  return <div v-skeleton={true}></div>;
}
export function SkeletonAvatarRender() {
  return <div v-skeleton-avatar={true} {...attrs}></div>;
}
export function SkeletonListRender() {
  return <div v-skeleton-list={true} {...attrs}></div>;
}
export function ErrorRender() {
  return <div v-error={true} {...attrs}></div>;
}
export function ErrorMiniRender() {
  return <div v-error={true}></div>;
}
export function EmptyRender() {
  return <div v-empty={true} {...attrs}></div>;
}
export function EmptyMiniRender() {
  return <div v-empty={true}></div>;
}
