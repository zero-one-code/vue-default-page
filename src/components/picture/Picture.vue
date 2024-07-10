<script lang="ts" setup>
  import { computed, type VNodeRef, nextTick, ref } from 'vue';
  import {
    INSTANCE_KEY,
    addUnit,
    getPrefix,
    isLayoutPosition,
  } from '../../utils';
  import type { PictureProps } from './type';
  import type { VdpEl } from '../core/type';

  const props = withDefaults(defineProps<PictureProps>(), {
    iconShowText: true,
  });

  const isElement = (node: VdpEl) => {
    const ELEMENT_NODE_TYPE = 1;
    return (
      node.tagName !== 'HTML' &&
      node.tagName !== 'BODY' &&
      node.nodeType === ELEMENT_NODE_TYPE
    );
  };

  const getContainer = (el: VdpEl) => {
    let node = el;
    while (node && isElement(node)) {
      const { position } = getComputedStyle(node);
      if (
        node[INSTANCE_KEY] ||
        (isLayoutPosition(position) && node !== el.parentNode)
      ) {
        return node;
      }
      node = node.parentNode as VdpEl;
    }
  };

  const formatShowIcon = ref(false);
  const root: VNodeRef = async (el) => {
    if (!el) return;
    await nextTick();
    // 修复高度获取不准问题
    const container = getContainer(el as VdpEl);
    if (!container) return;
    formatShowIcon.value =
      parseInt(getComputedStyle(container).height, 10) > 120;
  };

  const formatIconAttrs = computed(() => {
    const { iconMaxSize } = props;
    return {
      class: [getPrefix('picture-icon'), getPrefix('picture-space')],
      style: {
        maxHeight: addUnit(iconMaxSize),
      },
    };
  });

  const minWidth = 'var(--vdp-picture-text-icon-min-w)';
  const miniIconRef: VNodeRef = async (el) => {
    await nextTick();
    if (!(el instanceof HTMLDivElement)) return;
    el.style.minWidth === minWidth && (el.style.minWidth = '');
    if (el.getBoundingClientRect().width) return;
    el.style.minWidth = minWidth;
  };
  const formatMiniIconAttrs = computed(() => ({
    class: getPrefix('picture-text-icon'),
  }));
</script>

<template>
  <div :ref="root" :class="[getPrefix('picture'), getPrefix('center')]">
    <template v-if="formatShowIcon">
      <div v-if="$slots['icon']" v-bind="formatIconAttrs">
        <slot name="icon"></slot>
      </div>
      <div v-else v-html="icon" v-bind="formatIconAttrs"></div>
    </template>
    <div
      v-if="$slots.default"
      :class="[
        getPrefix('picture-text'),
        getPrefix('picture-space'),
        getPrefix('center'),
      ]"
    >
      <template v-if="!formatShowIcon">
        <div
          v-if="$slots['mini-icon']"
          v-bind="formatMiniIconAttrs"
          :ref="miniIconRef"
        >
          <slot name="mini-icon"></slot>
        </div>
        <div
          v-else-if="miniIcon"
          v-html="miniIcon"
          v-bind="formatMiniIconAttrs"
          :ref="miniIconRef"
        ></div>
      </template>
      <div v-if="iconShowText || !formatShowIcon" :style="{ color: textColor }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
