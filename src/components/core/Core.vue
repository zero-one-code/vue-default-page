<script lang="ts" setup>
  import { computed, useSlots } from 'vue';
  import {
    defaults,
    endsWith,
    isBoolean,
    isObject,
    isUndefined,
    mapValues,
    omit,
    pick,
  } from 'lodash';
  import { getPrefix } from '../../utils';
  import IconErrorMini from '../icon/IconErrorMini.vue';
  import type { CamelName, CoreProps, TargetProps } from './type';
  import { PUBLIC_PROPS_KEYS } from './utils';
  import type { PictureBaseProps } from '../picture/type';
  import Picture from '../picture/Picture.vue';
  import Skeleton from '../skeleton/Skeleton.vue';
  import IconLoading from '../icon/IconLoading.vue';
  import IconImage from '../icon/IconImage.vue';
  import IconEmptyMini from '../icon/IconEmptyMini.vue';

  const props = defineProps<CoreProps>();

  const priority: CamelName[] = [
    'loading',
    'skeleton',
    'skeletonAvatar',
    'skeletonList',
    'error',
    'empty',
  ];
  const formatStyle = computed(() => {
    const key = priority.find((item) => props[item]);
    const showProps = key ? props[`${key}Props`] : {};
    const { zIndex, background } = { ...props, ...showProps };
    return {
      background,
      zIndex,
    };
  });

  const formatProps = computed<TargetProps>(() =>
    mapValues(props, (value, key: keyof TargetProps) =>
      endsWith(key, 'Props') && isObject(value)
        ? omit(value, PUBLIC_PROPS_KEYS)
        : value
    )
  );

  const pictureBaseProps: (keyof PictureBaseProps)[] = [
    'icon',
    'iconMaxSize',
    'iconShowText',
    'miniIcon',
    'textColor',
  ];

  // loading
  const formatLoadingProps = computed(() => {
    const { loadingProps = {} } = formatProps.value;
    return defaults(
      { ...loadingProps },
      {
        text: 'Loading…',
        miniIcon: true,
        iconMaxSize: 24,
      }
    );
  });
  const formatLoadingBind = computed(() =>
    pick(formatLoadingProps.value, pictureBaseProps)
  );

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
    } = formatProps.value;
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
  const formatError = computed(() => {
    const { error } = props;
    return isBoolean(error) ? ([error] as const) : error;
  });
  const formatRefreshText = computed(() => {
    const { refreshText = true } = props.errorProps || {};
    const onRefresh = formatError.value?.[1];
    if (!onRefresh || !refreshText) return '';
    if (refreshText === true) return ', Click to Refresh';
    if (/^，|,/.test(refreshText)) return refreshText;
    return `, ${refreshText}`;
  });
  const formatErrorProps = computed(() => {
    const { errorProps = {} } = formatProps.value;
    const { text = 'Network Error' } = errorProps;
    return defaults(
      { ...errorProps },
      {
        formatText: text + formatRefreshText.value,
        miniIcon: true,
      }
    );
  });
  const formatErrorBind = computed(() =>
    pick(formatErrorProps.value, pictureBaseProps)
  );

  // empty
  const formatEmptyProps = computed(() => {
    const { emptyProps = {} } = formatProps.value;
    return defaults(
      { ...emptyProps },
      {
        text: 'No Data',
      }
    );
  });
  const formatEmptyBind = computed(() =>
    pick(formatEmptyProps.value, pictureBaseProps)
  );

  const slots = useSlots();
  const isIcon = (name: string, props: PictureBaseProps) => {
    if (slots[name]) return true;
    if (name.split('-').includes('mini')) return props.miniIcon === true;
    return !props.icon;
  };
</script>

<template>
  <div
    :class="[getPrefix('core'), getPrefix('center'), getPrefix('main')]"
    :style="formatStyle"
  >
    <!-- 👆 getPrefix('main') 兼容 1.0.2 之前版本 -->
    <Picture v-if="loading" v-bind="formatLoadingBind">
      <template v-if="isIcon('loading-icon', formatLoadingProps)" #icon>
        <slot name="loading-icon">
          <IconLoading :stroke="formatLoadingProps.iconColor" />
        </slot>
      </template>
      <template
        v-if="isIcon('loading-mini-icon', formatLoadingProps)"
        #mini-icon
      >
        <slot name="loading-mini-icon">
          <IconLoading :stroke="formatLoadingProps.miniIconColor" />
        </slot>
      </template>
      {{ formatLoadingProps.text }}
    </Picture>
    <Skeleton v-else-if="formatShowSkeleton" v-bind="formatSkeletonProps" />
    <Picture
      v-else-if="formatError?.[0]"
      v-bind="formatErrorBind"
      :class="{ [getPrefix('pointer')]: formatError[1] }"
      @click="formatError[1]"
    >
      <template v-if="isIcon('error-icon', formatErrorProps)" #icon>
        <slot name="error-icon">
          <IconImage type="error" />
        </slot>
      </template>
      <template v-if="isIcon('error-mini-icon', formatErrorProps)" #mini-icon>
        <slot name="error-mini-icon">
          <IconErrorMini />
        </slot>
      </template>
      {{ formatErrorProps.formatText }}
    </Picture>
    <Picture v-else-if="empty" v-bind="formatEmptyBind">
      <template v-if="isIcon('empty-icon', formatEmptyProps)" #icon>
        <slot name="empty-icon">
          <IconImage type="empty" />
        </slot>
      </template>
      <template v-if="isIcon('empty-mini-icon', formatEmptyProps)" #mini-icon>
        <slot name="empty-mini-icon">
          <IconEmptyMini />
        </slot>
      </template>
      {{ formatEmptyProps.text }}
    </Picture>
  </div>
</template>
