<script setup lang="ts">
  import { DIRECTIVE_NAMES, getPrefix, isShowMask } from '../../utils';
  import Core from '../core/Core.vue';
  import { computed, inject, ref, reactive, useSlots, onMounted } from 'vue';
  import { chain, isObject, isString, omitBy, omit, isArray } from 'lodash';
  import type { DefaultPageProps, OmitKeys } from './type';
  import { PROPS_KEY } from './keys';

  const props = defineProps<DefaultPageProps>();

  const initProps = inject(PROPS_KEY, props.initProps);
  const formatInitProps = computed(() => ({
    ...omit(initProps, DIRECTIVE_NAMES),
    ...chain(initProps)
      .pick(DIRECTIVE_NAMES)
      .mapKeys((_, key) => `${key}Props`)
      .value(),
  }));

  const omitKeys: OmitKeys[] = ['icon', 'miniIcon'];
  const formatProps = computed<DefaultPageProps>(() =>
    chain(props)
      .omit('initProps')
      .mapValues((prop) => {
        if (!(isObject(prop) && !isArray(prop))) return prop;
        return omitBy(
          prop,
          (value, key) => omitKeys.includes(key as OmitKeys) && isString(value)
        );
      })
      .defaultsDeep(formatInitProps.value)
      .value()
  );

  const formatShowMask = computed(() => isShowMask(formatProps.value));

  const formatClass = computed(
    () =>
      formatShowMask.value && [getPrefix('position'), getPrefix('min-height')]
  );

  const slotNames = [
    'loading-icon',
    'loading-mini-icon',
    'error-icon',
    'error-mini-icon',
    'empty-icon',
    'empty-mini-icon',
  ] as const;
  const hostSlots: Partial<Record<(typeof slotNames)[number], boolean>> =
    reactive({});

  const root = ref<HTMLDivElement>();
  onMounted(() => {
    const shadowRoot = root.value?.parentNode;
    if (!(shadowRoot instanceof ShadowRoot)) return;
    const children = Array.from(shadowRoot.host.children);
    slotNames.forEach((name) => {
      hostSlots[name] = children.some(
        (item) => item.getAttribute('slot') === name
      );
    });
  });

  const slots = useSlots();
  const formatSlotNames = () =>
    slotNames.filter((name) => slots[name] || hostSlots[name]);
</script>

<template>
  <div ref="root" :class="formatClass">
    <Core v-if="formatShowMask" v-bind="formatProps">
      <!-- 兼容 Web Components slot 写法 -->
      <template v-for="name in formatSlotNames()" :key="name" #[name]>
        <slot :name="name"></slot>
      </template>
    </Core>
    <slot></slot>
  </div>
</template>

<style lang="less">
  // 兼容 Web Components 写法
  @import '../../style/index.less';
</style>
