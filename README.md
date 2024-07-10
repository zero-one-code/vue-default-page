English | [中文](./README.zh-CN.md)

# Vue-Default-Page

[![NPM Version](https://img.shields.io/npm/v/vue-default-page)](https://www.npmjs.com/package/vue-default-page)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/edit/vue-default-page?file=src%2FApp.vue)

A Vue 3.0 custom directives plugin package, built-in with `v-loading`, `v-skeleton`, `v-skeleton-avatar`, `v-skeleton-list`, `v-error`, and `v-empty` default page directives, focusing on solving scenarios such as waiting, feedback, and error during network requests.

## Table of Contents

- [Installation](#installation)
- [Quickstart](#quickstart)
  - [Full Import](#full-import)
  - [Global Configuration](#global-configuration)
  - [On-demand Import](#on-demand-import)
  - [On-demand Import Global Configuration](#on-demand-import-global-configuration)
  - [Partial Import](#partial-import)
  - [Partial Import Configuration](#partial-import-configuration)
  - [Advanced](#advanced)
  - [Show Priority](#show-priority)
- [v-loading](#v-loading)
  - [VdpLoading](#vdploading)
  - [Attribute Configurations](#attribute-configurations)
- [v-skeleton](#v-skeleton)
  - [VdpSkeleton](#vdpskeleton)
  - [Attribute Configurations](#attribute-configurations-1)
  - [Animation](#animation)
  - [VdpSkeletonAvatar](#vdpskeletonavatar)
  - [VdpSkeletonList](#vdpskeletonlist)
- [v-error](#v-error)
  - [VdpError](#vdperror)
  - [Attribute Configurations](#attribute-configurations-2)
- [v-empty](#v-empty)
  - [VdpEmpty](#vdpempty)
  - [Attribute Configurations](#attribute-configurations-3)
- [Adapt to Mobile](#adapt-to-mobile)
- [Thanks](#thanks)
- [LICENSE](#license)

## Installation

```sh
npm i vue-default-page
```

## Quickstart

### Full Import

```js
// main.js

// Import the directives
import vueDefaultPage from 'vue-default-page';
// Import the style
import 'vue-default-page/index.css';

import { createApp } from 'vue';

const app = createApp();

// Register the directives
app.use(vueDefaultPage);
```

```vue
<!-- demo.vue -->

<div v-loading="true"></div>
```

### Global Configuration

```js
// main.js

app.use(vueDefaultPage, {
  background: '#000',
  loading: {
    iconColor: '#fff',
    miniIconColor: '#fff',
    textColor: '#fff',
  },
});
```

| Name           | Description                      | Type                                              | Default |
| -------------- | -------------------------------- | ------------------------------------------------- | ------- |
| zIndex         | The stack level of the directive | number / string                                   | 100     |
| background     | Background color of the mask     | string                                            | #fff    |
| loading        | v-loading configurations         | boolean / [VdpLoading](#vdploading)               | true    |
| skeleton       | v-skeleton configurations        | boolean / [VdpSkeleton](#vdpskeleton)             | true    |
| skeletonAvatar | v-skeleton-avatar configurations | boolean / [VdpSkeletonAvatar](#vdpskeletonavatar) | false   |
| skeletonList   | v-skeleton-list configurations   | boolean / [VdpSkeletonList](#vdpskeletonlist)     | false   |
| error          | v-error configurations           | boolean / [VdpError](#vdperror)                   | true    |
| empty          | v-empty configurations           | boolean / [VdpEmpty](#vdpempty)                   | true    |

### On-demand Import

```js
// main.js

// Import the directive
import { vdpLoading } from 'vue-default-page';
// Import the style
import 'vue-default-page/index.css';

import { createApp } from 'vue';

const app = createApp();

// Register the directive
app.use(vdpLoading);
```

### On-demand Import Global Configuration

```js
// main.js

app.use(vdpLoading, {
  background: '#000',
  iconColor: '#fff',
  miniIconColor: '#fff',
  textColor: '#fff',
});
```

| Name              | Description       | Configurations Type                     |
| ----------------- | ----------------- | --------------------------------------- |
| vdpLoading        | v-loading         | [VdpLoading](#vdploading)               |
| vdpSkeleton       | v-skeleton        | [VdpSkeleton](#vdpskeleton)             |
| vdpSkeletonAvatar | v-skeleton-avatar | [VdpSkeletonAvatar](#vdpskeletonavatar) |
| vdpSkeletonList   | v-skeleton-list   | [VdpSkeletonList](#vdpskeletonlist)     |
| vdpError          | v-error           | [VdpError](#vdperror)                   |
| vdpEmpty          | v-empty           | [VdpEmpty](#vdpempty)                   |

### Partial Import

```vue
<!-- demo.vue -->

<script setup lang="js">
  // Import the directives creation function
  import { createVueDefaultPage } from 'vue-default-page';
  // Import the style
  import 'vue-default-page/index.css';
  // Create the directive
  const vLoading = createVueDefaultPage('loading');
</script>

<template>
  <div v-loading="true"></div>
</template>
```

### Partial Import Configuration

Method 1: Configure in the directives creation function, the detailed configurations is consistent with [On-demand Import Global Configuration](#on-demand-import-global-configuration).

```vue
<!-- demo.vue -->

<script setup lang="js">
  // Create the directive
  const vLoading = createVueDefaultPage('loading', {
    background: '#000',
    iconColor: '#fff',
    miniIconColor: '#fff',
    textColor: '#fff',
  });
</script>

<template>
  <div v-loading="true"></div>
</template>
```

Method 2: Add attribute configurations to the element.

```vue
<!-- demo.vue -->

<template>
  <div
    v-loading="true"
    vdp-background="#000"
    vdp-loading-icon-color="#fff"
    vdp-loading-mini-icon-color="#fff"
    vdp-loading-text-color="#fff"
  ></div>
</template>
```

Common attribute configurations, for specific directive attribute configurations, please refer to the detailed sections below.

| Name           | Description                      | Type   | Default |
| -------------- | -------------------------------- | ------ | ------- |
| vdp-z-index    | The stack level of the directive | string | 100     |
| vdp-background | Background color of the mask     | string | #fff    |

### Advanced

```vue
<!-- demo.vue -->

<script setup lang="js">
  import { ref } from 'vue';
  // npm i vue-hooks-plus
  import { useRequest } from 'vue-hooks-plus';

  const data = ref([]);
  // Simulate the first request failure, and then refresh to request successfully.
  let times = 0;
  const api = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        data.value = Array.from({ length: 10 }, (v, k) => k);
        times ? resolve('Successful') : reject('Failed');
        times++;
      }, 2000);
    });

  // https://inhiblabcore.github.io/docs/hooks/useRequest
  const { loading, error, refresh } = useRequest(api);
</script>

<template>
  <div v-loading="loading" v-error="[!!error, refresh]" v-empty="!data.length">
    <div v-for="i in data" :key="i">{{ i }}</div>
  </div>
</template>
```

### Show Priority

When all directives are true, it will be shown according to the following priority.

`v-loading` > `v-skeleton` = `v-skeleton-avatar` = `v-skeleton-list` > `v-error` > `v-empty`

## v-loading

Custom icon, same configuration as [v-error](#v-error) and [v-empty](#v-empty).

```vue
<!-- demo.vue -->

<script setup lang="js">
  import { createVueDefaultPage } from 'vue-default-page';
  const icon = `<svg class="circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
    <path
      d="M151.5,80A71.5,71.5,0,1,1,80,8.5"
      fill="none"
      stroke="#bbb"
      stroke-miterlimit="10"
      stroke-width="16"
    />
  </svg>`;
  // Create the directive
  const vLoading = createVueDefaultPage('loading', {
    icon,
    miniIcon: icon,
  });
</script>

<template>
  <div v-loading="true"></div>
</template>

<style>
  .circle {
    display: block;
    animation: spin 1.5s ease-in-out infinite;
  }
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
```

### VdpLoading

| Name          | Description                                                                      | Type             | Default  |
| ------------- | -------------------------------------------------------------------------------- | ---------------- | -------- |
| enable        | Enable the directive (Enable when [Global Configuration](#global-configuration)) | boolean          | true     |
| text          | Text                                                                             | string           | Loading… |
| textColor     | Text color                                                                       | string           | #999     |
| iconColor     | Icon color (Disable when custom icon)                                            | string           | #bbb     |
| miniIconColor | Mini icon color (Disable when custom mini icon)                                  | string           | #bbb     |
| icon          | Custom icon                                                                      | string           | —        |
| miniIcon      | Custom mini icon                                                                 | boolean / string | true     |
| iconMaxSize   | Maximum size of icon                                                             | number / string  | 24       |
| iconShowText  | Whether to show text when using large icon                                       | boolean          | true     |
| zIndex        | The stack level of the directive                                                 | number / string  | 100      |
| background    | Background color of the mask                                                     | string           | #fff     |

### Attribute Configurations

| Name                        | Description                                    | Type   | Default  |
| --------------------------- | ---------------------------------------------- | ------ | -------- |
| vdp-loading-text            | Text                                           | string | Loading… |
| vdp-loading-text-color      | Text color                                     | string | #999     |
| vdp-loading-icon-color      | Icon color (Disable when custom icon)          | string | #bbb     |
| vdp-loading-mini-icon-color | Mini icon color (Disable when custom mini ico) | string | #bbb     |
| vdp-loading-icon            | Custom icon                                    | string | —        |
| vdp-loading-mini-icon       | Custom mini icon                               | string | —        |
| vdp-loading-icon-max-size   | Maximum size of icon                           | string | 24       |

## v-skeleton

Default show avatar and list skeleton, can also be used independently.

```vue
<!-- demo.vue -->

<template>
  <div v-skeleton="true"></div>
  <div v-skeleton.avatar="true"></div>
  <div v-skeleton.list="true"></div>
</template>
```

### VdpSkeleton

| Name          | Description                                                                      | Type                                                       | Default |
| ------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------- |
| enable        | Enable the directive (Enable when [Global Configuration](#global-configuration)) | boolean                                                    | true    |
| animation     | Animation                                                                        | boolean / ('avatar' ｜ 'list')[] / [Animation](#animation) | true    |
| avatarMaxSize | Maximum size of avatar                                                           | number / string                                            | 54      |
| zIndex        | The stack level of the directive                                                 | number / string                                            | 100     |
| background    | Background color of the mask                                                     | string                                                     | #fff    |

### Attribute Configurations

| Name                         | Description            | Type   | Default |
| ---------------------------- | ---------------------- | ------ | ------- |
| vdp-skeleton-avatar-max-size | Maximum size of avatar | string | 54      |

### Animation

| Name   | Description             | Type    | Default |
| ------ | ----------------------- | ------- | ------- |
| avatar | Enable avatar animation | boolean | true    |
| list   | Enable list animation   | boolean | true    |

Avatar or list skeleton can also be used individually by registering directives, but unlike other directives, these two are `false` by default and need to be manually enabled.

```js
// main.js

app.use(vueDefaultPage, {
  skeletonAvatar: true,
  skeletonList: true,
});
```

```vue
<!-- demo.vue -->

<template>
  <div v-skeleton-avatar="true"></div>
  <div v-skeleton-list="true"></div>
</template>
```

### VdpSkeletonAvatar

| Name          | Description                                                                      | Type            | Default |
| ------------- | -------------------------------------------------------------------------------- | --------------- | ------- |
| enable        | Enable the directive (Enable when [Global Configuration](#global-configuration)) | boolean         | false   |
| animation     | Animation                                                                        | boolean         | true    |
| avatarMaxSize | Maximum size of avatar                                                           | number / string | 54      |
| zIndex        | The stack level of the directive                                                 | number / string | 100     |
| background    | Background color of the mask                                                     | string          | #fff    |

### VdpSkeletonList

| Name       | Description                                                                      | Type            | Default |
| ---------- | -------------------------------------------------------------------------------- | --------------- | ------- |
| enable     | Enable the directive (Enable when [Global Configuration](#global-configuration)) | boolean         | false   |
| animation  | Animation                                                                        | boolean         | true    |
| zIndex     | The stack level of the directive                                                 | number / string | 100     |
| background | Background color of the mask                                                     | string          | #fff    |

## v-error

Like other directives, it can be controlled to show or hide using a Boolean.

```vue
<!-- demo.vue -->

<template>
  <div v-error="true"></div>
</template>
```

You can also pass a refresh function in an Array. For detailed usage, refer to [Advanced](#advanced).

```vue
<!-- demo.vue -->

<template>
  <div v-error="[error, () => {}]"></div>
</template>
```

### VdpError

| Name         | Description                                                                      | Type             | Default            |
| ------------ | -------------------------------------------------------------------------------- | ---------------- | ------------------ |
| enable       | Enable the directive (Enable when [Global Configuration](#global-configuration)) | boolean          | true               |
| text         | Text                                                                             | string           | Network Error      |
| refreshText  | Refresh text (Enable when refresh function is passed)                            | boolean / string | , Click to Refresh |
| textColor    | Text color                                                                       | string           | #999               |
| icon         | Custom icon                                                                      | string           | —                  |
| miniIcon     | Custom mini icon                                                                 | boolean / string | true               |
| iconMaxSize  | Maximum size of icon                                                             | number / string  | 180                |
| iconShowText | Whether to show text when using large icon                                       | boolean          | true               |
| zIndex       | The stack level of the directive                                                 | number / string  | 100                |
| background   | Background color of the mask                                                     | string           | #fff               |

### Attribute Configurations

| Name                    | Description                                           | Type   | Default            |
| ----------------------- | ----------------------------------------------------- | ------ | ------------------ |
| vdp-error-text          | Text                                                  | string | Network Error      |
| vdp-error-refresh-text  | Refresh text (Enable when refresh function is passed) | string | , Click to Refresh |
| vdp-error-text-color    | Text color                                            | string | #999               |
| vdp-error-icon          | Custom icon                                           | string | —                  |
| vdp-error-mini-icon     | Custom mini icon                                      | string | —                  |
| vdp-error-icon-max-size | Maximum size of icon                                  | string | 180                |

## v-empty

All directives will automatically adjust their height according to the container's size, and they have different display states.

```vue
<!-- demo.vue -->

<template>
  <div v-empty="true" style="height: 500px;"></div>
  <div v-empty="true"></div>
</template>
```

The maximum icon size can be adjusted using the `iconMaxSize` or the `vdp-empty-icon-max-size` ([v-skeleton](#v-skeleton) series directives allow only the `avatarMaxSize` to change the maximum avatar size).

```vue
<!-- demo.vue -->

<template>
  <div
    v-empty="true"
    style="height: 500px;"
    vdp-empty-icon-max-size="400"
  ></div>
</template>
```

### VdpEmpty

| Name         | Description                                                                      | Type             | Default |
| ------------ | -------------------------------------------------------------------------------- | ---------------- | ------- |
| enable       | Enable the directive (Enable when [Global Configuration](#global-configuration)) | boolean          | true    |
| text         | Text                                                                             | string           | No Data |
| textColor    | Text color                                                                       | string           | #999    |
| icon         | Custom icon                                                                      | string           | —       |
| miniIcon     | Custom mini icon                                                                 | boolean / string | false   |
| iconMaxSize  | Maximum size of icon                                                             | number / string  | 180     |
| iconShowText | Whether to show text when using large                                            | boolean          | true    |
| zIndex       | The stack level of the directive                                                 | number / string  | 100     |
| background   | Background color of the mask                                                     | string           | #fff    |

### Attribute Configurations

| Name                    | Description          | Type   | Default |
| ----------------------- | -------------------- | ------ | ------- |
| vdp-empty-text          | Text                 | string | No Data |
| vdp-empty-text-color    | Text color           | string | #999    |
| vdp-empty-icon          | Custom icon          | string | —       |
| vdp-empty-mini-icon     | Custom mini icon     | string | —       |
| vdp-empty-icon-max-size | Maximum size of icon | string | 180     |

## Adapt to Mobile

Vue-Default-Page uses `px` by default and design width is `375`. You can use plugins such as [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) to convert to `viewport` units.

```js
// vite.config.js

import pxToViewport from 'postcss-px-to-viewport';

export default defineConfig(() => {
  return {
    css: {
      postcss: {
        plugins: [pxToViewport({ viewportWidth: 375 })],
      },
    },
  };
});
```

## Thanks

Thank [element-plus](https://github.com/element-plus/element-plus) for providing inspiration.

## LICENSE

[MIT](./LICENSE).
