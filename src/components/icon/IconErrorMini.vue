<script setup lang="ts">
  import { getPrefix } from '../../utils';
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 160 160"
    :class="[getPrefix('block'), getPrefix('icon-error-mini')]"
  >
    <circle cx="80" cy="116" r="8" :class="getPrefix('icon-error-mini-fill')" />
    <circle
      cx="80"
      cy="80"
      r="75"
      fill="none"
      stroke-miterlimit="10"
      stroke-width="12"
      :class="getPrefix('icon-stroke')"
    />
    <rect
      x="72"
      y="36"
      width="16"
      height="64"
      rx="8"
      :class="getPrefix('icon-error-mini-fill')"
    />
  </svg>
</template>
