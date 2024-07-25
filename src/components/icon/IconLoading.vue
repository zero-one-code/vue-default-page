<script lang="ts" setup>
  import { getPrefix } from '../../utils';

  defineProps({
    stroke: String,
  });
</script>

<template>
  <!-- getPrefix('picture-loading') 兼容 1.0.2 之前版本 -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 160 160"
    :style="{ stroke }"
    :class="[
      getPrefix('block'),
      getPrefix('icon-loading'),
      getPrefix('icon-stroke'),
      getPrefix('picture-loading'),
    ]"
  >
    <circle
      cx="80"
      cy="80"
      r="74"
      fill="none"
      stroke-linecap="round"
      stroke-width="12"
    />
  </svg>
</template>
