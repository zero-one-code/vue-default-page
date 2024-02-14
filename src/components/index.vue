<script lang="ts" setup>
  import { computed } from 'vue';
  import VdpPicture, { type PictureProps } from './picture.vue';
  import VdpSkeleton, {
    type SkeletonAvatarProps,
    type SkeletonListProps,
    type SkeletonProps,
  } from './skeleton.vue';
  import { isUndefined } from 'lodash';
  import { getPrefix } from '../utils';

  export interface EmptyProps extends PictureProps {
    text?: string;
  }
  export interface LoadingProps extends EmptyProps {
    iconColor?: string;
    miniIconColor?: string;
  }
  export interface ErrorProps extends EmptyProps {
    refreshText?: boolean | string;
  }

  export interface Props {
    loading?: boolean;
    skeleton?: boolean;
    skeletonAvatar?: boolean;
    skeletonList?: boolean;
    error?: boolean;
    empty?: boolean;
    onRefresh?(): void;
    loadingProps?: LoadingProps;
    errorProps?: ErrorProps;
    emptyProps?: EmptyProps;
    skeletonProps?: SkeletonProps;
    skeletonListProps?: SkeletonListProps;
    skeletonAvatarProps?: SkeletonAvatarProps;
    zIndex?: number | string;
    background?: string;
  }

  const props = defineProps<Props>();

  const iconDefaultColor = `var(--${getPrefix('icon-color')})`;

  const formatStyle = computed(() => {
    const { zIndex, background } = props;
    return {
      background,
      zIndex: Number(zIndex),
    };
  });

  // loading
  const formatLoadingProps = computed(() => {
    const {
      iconColor = iconDefaultColor,
      miniIconColor = iconDefaultColor,
      iconMaxSize = 24,
      text = 'Loading…',
    } = props.loadingProps || {};
    return {
      iconColor,
      iconMaxSize,
      text,
      iconStroke: iconColor,
      miniIconStroke: miniIconColor,
      ...props.loadingProps,
    };
  });

  // skeleton
  const formatShowSkeleton = computed(() => {
    const { skeleton, skeletonList, skeletonAvatar } = props;
    return skeleton || skeletonList || skeletonAvatar;
  });
  const formatSkeletonProps = computed(() => {
    const {
      skeletonProps,
      skeletonAvatarProps: { animation: avatar, ...avatarProps } = {},
      skeletonListProps: { animation: list, ...listProps } = {},
      skeletonAvatar,
      skeletonList,
    } = props;
    return {
      ...skeletonProps,
      ...avatarProps,
      ...listProps,
      animation: isUndefined(avatar ?? list)
        ? skeletonProps?.animation
        : { avatar, list },
      disabledAvatar: !skeletonAvatar && skeletonList,
      disabledList: !skeletonList && skeletonAvatar,
    };
  });

  // error
  const formatRefreshText = computed(() => {
    const { errorProps: { refreshText = true } = {}, onRefresh } = props;
    if (!onRefresh || !refreshText) return '';
    if (refreshText === true) return ', Click to Refresh';
    if (/^，|,/.test(refreshText)) return refreshText;
    return `, ${refreshText}`;
  });
  const errorMiniSvg = `<svg class="${getPrefix('block')}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><circle cx="80" cy="116" r="8" fill="${iconDefaultColor}"/><circle cx="80" cy="80" r="75" fill="none" stroke="${iconDefaultColor}" stroke-miterlimit="10" stroke-width="12"/><rect x="72" y="36" width="16" height="64" rx="8" fill="${iconDefaultColor}"/></svg>`;
  const formatErrorProps = computed(() => {
    const { text = 'Network Error', miniIcon = true } = props.errorProps || {};
    return {
      miniIcon: miniIcon === true ? errorMiniSvg : miniIcon,
      ...props.errorProps,
      formatText: text + formatRefreshText.value,
    };
  });

  // empty
  const formatEmptyProps = computed(() => {
    const { text = 'No Data', miniIcon = false } = props.emptyProps || {};
    return {
      text,
      miniIcon,
      ...props.emptyProps,
    };
  });
</script>

<template>
  <div :class="[getPrefix('main'), getPrefix('center')]" :style="formatStyle">
    <vdp-picture v-if="loading" v-bind="formatLoadingProps" type="loading">
      {{ formatLoadingProps.text }}
    </vdp-picture>
    <vdp-skeleton v-else-if="formatShowSkeleton" v-bind="formatSkeletonProps" />
    <vdp-picture
      v-else-if="error"
      v-bind="formatErrorProps"
      :class="{ [getPrefix('pointer')]: onRefresh }"
      @click="onRefresh?.()"
    >
      {{ formatErrorProps.formatText }}
    </vdp-picture>
    <vdp-picture v-else-if="empty" v-bind="formatEmptyProps" type="empty">
      {{ formatEmptyProps.text }}
    </vdp-picture>
  </div>
</template>

<style lang="less">
  :root {
    --vdp-main-z-index: 100;
    --vdp-main-padding: 10px;
    --vdp-main-bg: #fff;
  }

  .vdp-main {
    position: absolute;
    inset: 0;
    z-index: var(--vdp-main-z-index);
    padding: var(--vdp-main-padding);
    background: var(--vdp-main-bg);
  }
</style>
