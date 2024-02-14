<script lang="ts" setup>
  import { computed, nextTick, ref, type VNodeRef } from 'vue';
  import { addUnit, getPrefix } from '../utils';
  import { fromPairs } from 'lodash';

  interface Animation {
    avatar?: boolean;
    list?: boolean;
  }

  export interface SkeletonProps {
    avatarMaxSize?: number | string;
    animation?: boolean | (keyof Animation)[] | Animation;
  }

  export interface SkeletonListProps {
    animation?: boolean;
  }
  export type SkeletonAvatarProps = Pick<SkeletonProps, 'avatarMaxSize'> &
    SkeletonListProps;

  interface InnerProps extends SkeletonProps {
    disabledAvatar?: boolean;
    disabledList?: boolean;
  }

  const props = withDefaults(defineProps<InnerProps>(), {
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
    if (!el) return;
    await nextTick();
    const row = Math.ceil(
      parseInt(getComputedStyle(el as Element).height, 10) / 50
    );
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

<style lang="less">
  :root {
    --vdp-skeleton-w: 100%;
    --vdp-skeleton-h: 100%;
    --vdp-skeleton-space: 14px;
    --vdp-skeleton-bg: #f0f2f5;
    --vdp-skeleton-deep-bg: #e6e8eb;
    --vdp-skeleton-radius: 4px;
    --vdp-skeleton-avatar-w: 100%;
    --vdp-skeleton-avatar-h: 100%;
    --vdp-skeleton-avatar-min-w: var(--vdp-skeleton-list-h);
    --vdp-skeleton-avatar-min-h: var(--vdp-skeleton-list-h);
    --vdp-skeleton-avatar-max-w: 54px;
    --vdp-skeleton-avatar-max-h: 54px;
    --vdp-skeleton-list-h: 20px;
    --vdp-skeleton-list-space: var(--vdp-skeleton-space);
  }

  .vdp-skeleton {
    display: flex;
    width: var(--vdp-skeleton-w);
    height: var(--vdp-skeleton-h);

    &-space {
      margin-right: var(--vdp-skeleton-space);
    }

    &-avatar {
      flex: none;
      width: var(--vdp-skeleton-avatar-w);
      height: var(--vdp-skeleton-avatar-h);
      min-width: var(--vdp-skeleton-avatar-min-w);
      min-height: var(--vdp-skeleton-avatar-min-h);
      max-width: var(--vdp-skeleton-avatar-max-w);
      max-height: var(--vdp-skeleton-avatar-max-h);
    }

    &-list {
      flex: auto;
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        height: var(--vdp-skeleton-list-h);
        margin-bottom: var(--vdp-skeleton-list-space);
      }
    }

    &-avatar,
    &-list li {
      background: var(--vdp-skeleton-bg);
      border-radius: var(--vdp-skeleton-radius);
    }

    & &-animation {
      background: linear-gradient(
        90deg,
        var(--vdp-skeleton-bg) 25%,
        var(--vdp-skeleton-deep-bg) 37%,
        var(--vdp-skeleton-bg) 63%
      );
      background-size: 400% 100%;
      animation: vdp-skeleton-bg 1.4s ease infinite;
    }
  }

  @keyframes vdp-skeleton-bg {
    0% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0 50%;
    }
  }
</style>
