<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="layout">
      <div class="item item-max-width">
        <div v-loading="true" class="item-height"></div>
        <div v-loading="true"></div>
        <p class="">v-loading</p>
      </div>
      <div class="item item-max-width">
        <div v-error="true" class="item-height"></div>
        <div v-error="true"></div>
        <p class="">v-error</p>
      </div>
      <div class="item item-max-width">
        <div v-empty="true" class="item-height"></div>
        <div v-empty="true"></div>
        <p class="">v-empty</p>
      </div>
      <div class="item">
        <div v-skeleton="true" class="item-height"></div>
        <div v-skeleton="true"></div>
        <p class="">v-skeleton</p>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  .container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .layout {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .item {
    flex: auto;
    margin: 14px;

    & > div {
      overflow: hidden;
      box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);
      border-radius: 10px;
      min-width: 180px;
      margin-bottom: 28px;
    }

    &-height {
      height: 224px;
    }

    &-max-width {
      max-width: 224px;
    }
  }
</style>
