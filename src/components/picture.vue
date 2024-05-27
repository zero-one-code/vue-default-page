<script lang="ts" setup>
  import { computed, type VNodeRef, nextTick, ref } from 'vue';
  import { addUnit, getPrefix, INSTANCE_KEY } from '../utils';
  import type { El } from '../types';

  export interface PictureProps {
    icon?: string;
    iconMaxSize?: number | string;
    iconShowText?: boolean;
    miniIcon?: boolean | string;
    textColor?: string;
  }

  interface InnerProps extends PictureProps {
    type?: 'error' | 'empty' | 'loading';
    iconStroke?: string;
    miniIconStroke?: string;
  }

  const props = withDefaults(defineProps<InnerProps>(), {
    type: 'error',
    miniIcon: true,
    iconShowText: true,
  });

  const isElement = (node: El) => {
    const ELEMENT_NODE_TYPE = 1;
    return (
      node.tagName !== 'HTML' &&
      node.tagName !== 'BODY' &&
      node.nodeType === ELEMENT_NODE_TYPE
    );
  };

  const containerPositionReg = /relative|absolute|fixed/i;
  const getContainer = (el: El) => {
    let node = el;
    while (node && isElement(node)) {
      const { position } = getComputedStyle(node);
      if (
        node[INSTANCE_KEY] ||
        (containerPositionReg.test(position) && node !== el.parentNode)
      ) {
        return node;
      }
      node = node.parentNode as El;
    }
  };

  const formatShowIcon = ref(false);
  const root: VNodeRef = async (el) => {
    if (!el) return;
    await nextTick();
    // 修复高度获取不准问题
    const container = getContainer(el as El);
    if (!container) return;
    formatShowIcon.value =
      parseInt(getComputedStyle(container).height, 10) > 120;
  };

  const svgCommon = `<defs><linearGradient id="be595b27-5838-4fa8-9b74-d90d46f5bb3e" x1="80" y1="-1063.51" x2="80" y2="-1082.94" gradientTransform="matrix(1, 0, 0, -1, 0, -922.94)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e8e8e8"/><stop offset="0.6" stop-color="#f8f8f8" stop-opacity="0.5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><path d="M152.29,160c0-5.36-32.38-19.43-72.29-19.43S7.71,154.64,7.71,160Z" fill="url(#be595b27-5838-4fa8-9b74-d90d46f5bb3e)"/>`;
  const svgMap = {
    empty: `${svgCommon}<defs><linearGradient id="a22af725-6048-4e83-83b3-5d54e6c5c6e8" x1="53.06" y1="1162.28" x2="53.06" y2="1071.42" gradientTransform="translate(0 -1035.58)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c2c2c2"/><stop offset="1" stop-color="#d1d1d1"/></linearGradient><linearGradient id="acc13d7c-9c76-439d-ae53-3058ad909473" x1="76.16" y1="1155.18" x2="76.16" y2="1145.58" gradientTransform="translate(0 -1118.67)" xlink:href="#a22af725-6048-4e83-83b3-5d54e6c5c6e8"/><linearGradient id="bf63630c-2d9d-44be-8fb8-4100cc342785" x1="81.82" y1="1245.37" x2="81.82" y2="1145.58" gradientTransform="translate(0 -1118.67)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d6d6d6"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="f7de73a5-a123-463a-9748-de5862b9a21f" x1="115" y1="43.37" x2="86.07" y2="43.37" gradientTransform="matrix(1, 0, 0, -1, 0, 162)" xlink:href="#a22af725-6048-4e83-83b3-5d54e6c5c6e8"/><linearGradient id="bca14f87-ae30-4ae4-962d-1368ddd7f25c" x1="83.12" y1="1160.2" x2="83.12" y2="1150.97" gradientTransform="translate(0 -1118.67)" xlink:href="#a22af725-6048-4e83-83b3-5d54e6c5c6e8"/></defs><path d="M49.58,35.84H65.12V126.7H49.58A8.55,8.55,0,0,1,41,118.18h0V44.39a8.54,8.54,0,0,1,8.53-8.55h0Z" fill="url(#a22af725-6048-4e83-83b3-5d54e6c5c6e8)"/><path d="M70.23,36c0-5.41,4-9.09,11.86-9.09C81.44,29,73.2,38.83,70.23,36Z" fill-rule="evenodd" fill="url(#acc13d7c-9c76-439d-ae53-3058ad909473)"/><path d="M114.09,35.84H91.16a9.07,9.07,0,1,0-18.14,0H49.56a4.87,4.87,0,0,0-4.88,4.86v0h0v81.1a4.87,4.87,0,0,0,4.86,4.88h64.55a4.87,4.87,0,0,0,4.88-4.86V40.72a4.87,4.87,0,0,0-4.86-4.88Zm-32,5.5A5.35,5.35,0,1,1,87.44,36h0A5.35,5.35,0,0,1,82.09,41.34Z" fill-rule="evenodd" fill="url(#bf63630c-2d9d-44be-8fb8-4100cc342785)"/><path d="M114.16,116.78l.84,2.32s-6.29.73-12,1c-6.74.35-17,.39-17,.39Z" fill-rule="evenodd" fill="url(#f7de73a5-a123-463a-9748-de5862b9a21f)"/><path d="M116.59,116.15a136.78,136.78,0,0,1-29.84,4.3c-14.78.49-34.47-2-34.47-2s-2.47-.4-2.47-24V45.06h64.64s-1.52,43-.57,56.74A53.24,53.24,0,0,0,116.59,116.15Z" fill="#fff" fill-rule="evenodd"/><path d="M58.35,55.67h50.23A1.32,1.32,0,0,1,109.9,57h0a1.32,1.32,0,0,1-1.32,1.32H58.35A1.32,1.32,0,0,1,57,57v0h0a1.32,1.32,0,0,1,1.31-1.33Z" fill="#f0f2f5"/><path d="M58.35,62.94h50.23a1.32,1.32,0,0,1,1.32,1.32h0a1.32,1.32,0,0,1-1.32,1.32H58.35A1.32,1.32,0,0,1,57,64.29v0h0a1.32,1.32,0,0,1,1.32-1.32Z" fill="#f0f2f5"/><path d="M58.35,70.2H84.63A1.32,1.32,0,0,1,86,71.47v0h0a1.32,1.32,0,0,1-1.32,1.32H58.35A1.32,1.32,0,0,1,57,71.55v0h0a1.32,1.32,0,0,1,1.32-1.32Z" fill="#f0f2f5"/><path d="M58.35,105.88h9.26a1.32,1.32,0,0,1,1.32,1.32h0a1.32,1.32,0,0,1-1.32,1.32H58.35A1.32,1.32,0,0,1,57,107.23v0h0a1.32,1.32,0,0,1,1.32-1.32Z" fill="#f0f2f5"/><path d="M86,32.3a5.35,5.35,0,0,1-7.56,7.56,5.36,5.36,0,0,0,8-7.14l-.26-.27C86.07,32.41,86,32.35,86,32.3Z" fill-rule="evenodd" fill="url(#bca14f87-ae30-4ae4-962d-1368ddd7f25c)"/>`,
    error: `${svgCommon}<defs><linearGradient id="b4202bbd-e224-48d1-b241-721c5fdb2232" x1="47.51" y1="117.77" x2="76.22" y2="89.05" gradientTransform="matrix(1, 0, 0, -1, 0, 162)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f0f0f0"/><stop offset="1" stop-color="#d6d6d6"/></linearGradient><linearGradient id="bd2aa713-8909-43ca-af0c-13676284287a" x1="80.18" y1="34.63" x2="80.18" y2="64.71" gradientTransform="matrix(1, 0, 0, -1, 0, 162)" gradientUnits="userSpaceOnUse"><stop offset="0.03" stop-color="#c2c2c2"/><stop offset="0.88" stop-color="#d1d1d1"/></linearGradient><linearGradient id="ee54c419-4a23-4184-9885-eff1d65ad4c6" x1="41.44" y1="72.63" x2="87.53" y2="99.24" xlink:href="#bd2aa713-8909-43ca-af0c-13676284287a"/><linearGradient id="e62900b0-4889-4cc7-9f09-186c60699869" x1="89.99" y1="85.13" x2="97.78" y2="85.13" gradientTransform="matrix(1, 0, 0, -1, 0, 162)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c2c2c2"/><stop offset="1" stop-color="#d1d1d1"/></linearGradient><linearGradient id="bdc5e859-6a7a-4ca9-8139-4097a2b0b7e8" x1="92.68" y1="65.17" x2="98.93" y2="68.77" gradientTransform="matrix(1, 0, 0, -1, 0, 162)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d1d1d1"/><stop offset="1" stop-color="#c2c2c2"/></linearGradient><linearGradient id="fac3be96-42ba-41cb-b9f8-645bc36b1126" x1="33.89" y1="77.48" x2="24.01" y2="94.58" xlink:href="#e62900b0-4889-4cc7-9f09-186c60699869"/><linearGradient id="ef7b8ed2-bc43-43ba-ac22-a55c188d3b66" x1="21.92" y1="91.67" x2="88.07" y2="129.86" gradientTransform="matrix(1, 0, 0, -1, 0, 162)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#c2c2c2"/><stop offset="0.93" stop-color="#d1d1d1"/></linearGradient><linearGradient id="b20dfe97-279b-4dee-b5a3-2a02c71939d3" x1="100.65" y1="108.45" x2="112.4" y2="108.45" xlink:href="#e62900b0-4889-4cc7-9f09-186c60699869"/><linearGradient id="a94fa15c-d22e-489e-9654-7f45b059bad5" x1="108.01" y1="88.34" x2="117.55" y2="93.85" xlink:href="#bdc5e859-6a7a-4ca9-8139-4097a2b0b7e8"/><linearGradient id="e77cefc4-f707-451e-a124-a4176ad6432c" x1="71.07" y1="59.72" x2="91.81" y2="38.98" xlink:href="#b4202bbd-e224-48d1-b241-721c5fdb2232"/><linearGradient id="a04c7e0d-1a68-4736-b2ee-bbe465a9c4c8" x1="62.02" y1="92.64" x2="100" y2="54.67" xlink:href="#b4202bbd-e224-48d1-b241-721c5fdb2232"/><linearGradient id="ba86254c-dde8-40f4-82dc-5a9bb49ac3be" x1="107.44" y1="110.86" x2="131.04" y2="87.26" xlink:href="#b4202bbd-e224-48d1-b241-721c5fdb2232"/><linearGradient id="a9dafc5d-7b57-40e5-ae21-d92b8a623c74" x1="41.35" y1="65.16" x2="58.27" y2="65.16" xlink:href="#e62900b0-4889-4cc7-9f09-186c60699869"/><linearGradient id="ae51e7cd-ae95-480a-bad4-cffb1009bf10" x1="94.39" y1="94.81" x2="94.39" y2="125.62" xlink:href="#e62900b0-4889-4cc7-9f09-186c60699869"/><linearGradient id="e6886b1b-502f-46f2-90ed-5ea1b1b11916" x1="89.24" y1="141.13" x2="115.65" y2="114.72" xlink:href="#b4202bbd-e224-48d1-b241-721c5fdb2232"/><linearGradient id="be754a68-6531-4b3a-b048-7d495871be26" x1="88.36" y1="127.47" x2="108.26" y2="161.95" xlink:href="#e62900b0-4889-4cc7-9f09-186c60699869"/></defs><path d="M92.41,39.65l-1,18.12a50.1,50.1,0,0,0-10-1c-18.81,0-35.35,10.43-44.72,26.12l-13-13C36.52,51,57.61,38.77,81.44,38.77A68.39,68.39,0,0,1,92.41,39.65Z" fill="url(#b4202bbd-e224-48d1-b241-721c5fdb2232)"/><ellipse cx="80.18" cy="112.33" rx="15.61" ry="15.04" fill="url(#bd2aa713-8909-43ca-af0c-13676284287a)"/><path d="M90.83,68.47c-.83-.19-1.67-.36-2.52-.5a41.63,41.63,0,0,0-6.87-.57c-16.06,0-30.08,9.1-37.59,22.6l-2.5-.79c7.51-13.52,21.53-22.62,37.59-22.62a41.8,41.8,0,0,1,9.39,1.07Z" fill="url(#ee54c419-4a23-4184-9885-eff1d65ad4c6)"/><polygon points="97.78 70.72 89.99 83.8 90.29 78.31 95.28 69.93 97.78 70.72" fill="url(#e62900b0-4889-4cc7-9f09-186c60699869)"/><path d="M104.18,103.16l-2.5-.79A25.41,25.41,0,0,0,87.07,87.11a24.85,24.85,0,0,1,16.11,13.65C103.55,101.54,103.88,102.34,104.18,103.16Z" fill="url(#bdc5e859-6a7a-4ca9-8139-4097a2b0b7e8)"/><polygon points="36.72 82.89 34.22 82.1 21.18 69.05 23.68 69.84 36.72 82.89" fill="url(#fac3be96-42ba-41cb-b9f8-645bc36b1126)"/><path d="M92.41,39.65q-1.26-.21-2.52-.36a68.22,68.22,0,0,0-8.45-.52C57.61,38.77,36.52,51,23.68,69.84l-2.5-.79C34,50.25,55.11,38,78.94,38a68.76,68.76,0,0,1,11,.88Z" fill="url(#ef7b8ed2-bc43-43ba-ac22-a55c188d3b66)"/><polygon points="112.4 46.18 103.15 61.71 100.65 60.92 109.9 45.39 112.4 46.18" fill="url(#b20dfe97-279b-4dee-b5a3-2a02c71939d3)"/><path d="M124.89,80.89l-2.5-.79a53.93,53.93,0,0,0-21.74-19.18l2.5.79a53.66,53.66,0,0,1,20.36,17.18C124,79.55,124.45,80.21,124.89,80.89Z" fill="url(#a94fa15c-d22e-489e-9654-7f45b059bad5)"/><ellipse cx="81.44" cy="112.65" rx="14.36" ry="14.97" fill="url(#e77cefc4-f707-451e-a124-a4176ad6432c)"/><path d="M118,88.29l-13.83,14.87c-3.54-9.8-12.4-16.76-22.74-16.76-10.79,0-20,7.57-23.17,18L43.85,90c7.51-13.5,21.53-22.6,37.59-22.6a41.8,41.8,0,0,1,9.39,1.07L90,83.8l7.79-13.08A44.06,44.06,0,0,1,118,88.29Z" fill="url(#a04c7e0d-1a68-4736-b2ee-bbe465a9c4c8)"/><path d="M137.45,67.4,124.89,80.89a53.93,53.93,0,0,0-21.74-19.18l9.25-15.53A71.77,71.77,0,0,1,137.45,67.4Z" fill="url(#ba86254c-dde8-40f4-82dc-5a9bb49ac3be)"/><polygon points="58.27 104.44 55.77 103.65 41.35 89.23 43.85 90.02 58.27 104.44" fill="url(#a9dafc5d-7b57-40e5-ae21-d92b8a623c74)"/><path d="M95.18,67.19l-2.35-.85h0a.6.6,0,0,1-.43-.64L94,36.38l2.38.83L94.77,66.56A.63.63,0,0,0,95.18,67.19Z" fill="url(#ae51e7cd-ae95-480a-bad4-cffb1009bf10)"/><path d="M96.41,37.21,94.77,66.56a.65.65,0,0,0,1.21.36l19.38-32.69a.78.78,0,0,0-.29-1.07l-.11,0-6.38-2.27,1.58-29.29a.65.65,0,0,0-.69-.61.63.63,0,0,0-.47.25L89.64,33.89a.77.77,0,0,0,.28,1l.13.06Z" fill="url(#e6886b1b-502f-46f2-90ed-5ea1b1b11916)"/><path d="M109.75.91h0a.62.62,0,0,0-.79.27L89.64,33.89a.74.74,0,0,0,.25,1l-2.22-.77a.8.8,0,0,1-.47-1l.06-.12L106.57.32a.64.64,0,0,1,.8-.27Z" fill="url(#be754a68-6531-4b3a-b048-7d495871be26)"/>`,
    loading: `<circle cx="80" cy="80" r="74" fill="none" stroke="inherit" stroke-linecap="round" stroke-width="12"/>`,
  };
  const formatIcon = computed(() => {
    const { type } = props;
    return `<svg
        class="${getPrefix('block')} ${getPrefix('picture')}-${type}"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 160 160"
      >${svgMap[type]}</svg>`;
  });
  const formatIconStyle = computed(() => {
    const { iconMaxSize, iconStroke, icon } = props;
    return {
      maxHeight: addUnit(iconMaxSize),
      stroke: icon ? '' : iconStroke,
    };
  });
</script>

<template>
  <div :ref="root" :class="[getPrefix('picture'), getPrefix('center')]">
    <template v-if="formatShowIcon">
      <div
        v-html="icon || formatIcon"
        :class="[getPrefix('picture-icon'), getPrefix('picture-space')]"
        :style="formatIconStyle"
      ></div>
    </template>
    <div
      v-if="$slots.default"
      :class="[
        getPrefix('picture-text'),
        getPrefix('picture-space'),
        getPrefix('center'),
      ]"
    >
      <div
        v-if="miniIcon && !formatShowIcon"
        v-html="miniIcon === true ? formatIcon : miniIcon"
        :class="getPrefix('picture-text-icon')"
        :style="{ stroke: miniIcon === true ? miniIconStroke : '' }"
      >
      </div>
      <div v-if="iconShowText || !formatShowIcon" :style="{ color: textColor }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  :root {
    --vdp-picture-w: 100%;
    --vdp-picture-h: 100%;
    --vdp-picture-space-y: 6px;
    --vdp-picture-space-x: 0;
    --vdp-picture-icon-max-h: 180px;
    --vdp-picture-icon-child-margin-x: auto;
    --vdp-picture-icon-child-margin-y: 0;
    --vdp-picture-text-size: 14px;
    --vdp-picture-text-space: 4px;
    --vdp-picture-text-icon-min-w: 1em;
    --vdp-picture-text-icon-min-h: 1em;
  }

  .vdp-picture {
    flex-direction: column;
    width: var(--vdp-picture-w);
    height: var(--vdp-picture-h);

    &-space {
      margin: var(--vdp-picture-space-y) var(--vdp-picture-space-x);
    }

    &-icon {
      flex: auto;
      position: relative;
      width: 100%;
      max-height: var(--vdp-picture-icon-max-h);

      & > * {
        position: absolute;
        width: 100%;
        height: 100%;
        display: block; // 大图标居中时需单独设置
        margin: var(--vdp-picture-icon-child-margin-y)
          var(--vdp-picture-icon-child-margin-x);
      }
    }

    &-text {
      flex: none;
      color: var(--vdp-text-color);
      font-size: var(--vdp-picture-text-size);

      &-icon {
        margin-right: var(--vdp-picture-text-space);
        min-width: var(--vdp-picture-text-icon-min-w);
        min-height: var(--vdp-picture-text-icon-min-h);
      }
    }

    &-loading {
      animation: vdp-picture-rotate 3s linear infinite;

      circle {
        animation: vdp-picture-stroke 1.5s ease-in-out infinite;
      }
    }
  }

  @keyframes vdp-picture-stroke {
    0% {
      stroke-dasharray: 1, 500;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 350, 500;
      stroke-dashoffset: -160px;
    }

    100% {
      stroke-dasharray: 350, 500;
      stroke-dashoffset: -450px;
    }
  }

  @keyframes vdp-picture-rotate {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
