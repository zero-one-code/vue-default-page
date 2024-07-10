<script lang="ts" setup>
  import { computed, nextTick, ref, type VNodeRef } from 'vue';
  import { addUnit, getPrefix } from '../../utils';
  import { fromPairs } from 'lodash';
  import type { Animation, SkeletonProps } from './type';

  const props = withDefaults(defineProps<SkeletonProps>(), {
    animation: true,
  });

  const formatAvatarStyle = computed(() => {
    const maxSize = addUnit(props.avatarMaxSize);
    return {
      maxWidth: maxSize,
      maxHeight: maxSize,
    };
  });

  const formatArrToObj = (arr: string[], val = true) =>
    fromPairs(arr.map((key) => [key, val]));
  const formatAnimation = computed<Animation>(() => {
    const { animation = {} } = props;
    if (typeof animation === 'boolean')
      return formatArrToObj(['avatar', 'list'], animation);
    if (Array.isArray(animation)) return formatArrToObj(animation);
    return animation;
  });

  const formatAvatarClass = computed(() => [
    {
      [getPrefix('skeleton-space')]: !props.disabledList,
      [getPrefix('skeleton-animation')]: formatAnimation.value.avatar,
    },
    getPrefix('skeleton-avatar'),
  ]);

  const listRow = ref(1);
  const root: VNodeRef = async (el) => {
    if (!(el && el instanceof HTMLDivElement)) return;
    await nextTick();
    const row = Math.ceil(parseInt(getComputedStyle(el).height, 10) / 50);
    if (!row) return;
    listRow.value = row;
  };
</script>

<template>
  <div :ref="root" :class="getPrefix('skeleton')">
    <div
      v-if="!disabledAvatar"
      :class="formatAvatarClass"
      :style="formatAvatarStyle"
    ></div>
    <ul v-if="!disabledList" :class="getPrefix('skeleton-list')">
      <li
        v-for="item in listRow"
        :key="item"
        :class="{ [getPrefix('skeleton-animation')]: formatAnimation.list }"
      ></li>
    </ul>
  </div>
</template>
