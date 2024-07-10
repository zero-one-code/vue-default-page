<script setup lang="ts">
  import { getPrefix } from '../../utils';
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 160.5 160"
    :class="getPrefix('block')"
  >
    <path
      d="M144,132H16A10,10,0,0,1,6,122V66.92L32.64,28h94.72L154,66.92V122A10,10,0,0,1,144,132Z"
      fill="none"
      stroke-miterlimit="10"
      stroke-width="12"
      :class="getPrefix('icon-stroke')"
    />
    <path
      d="M3,71H54.09a26.39,26.39,0,0,0,52.05,0H158"
      fill="none"
      stroke-miterlimit="10"
      stroke-width="12"
      :class="getPrefix('icon-stroke')"
    />
  </svg>
</template>
