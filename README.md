English | [中文](./README.zh-CN.md)

# Vue-Default-Page

A Vue 3.0 custom directives plugin, with built-in directives such as `v-loading`, `v-skeleton`, `v-skeleton-avatar`, `v-skeleton-list`, `v-error`, and `v-empty`, dedicated to addressing issues related to waiting, feedback, and error during network requests.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/vue-default-page?file=src%2FApp.vue)

## Table of Contents

- [Installation](#installation)
- [Quickstart](#quickstart)
  - [Advanced](#advanced)
  - [Show Priority](#show-priority)
- [Custom Options](#custom-options)
  - [Common Options](#common-options)
  - [Common Attribute Options](#common-attribute-options)
- [v-loading](#v-loading)
  - [Options](#options)
  - [Attribute Options](#attribute-options)
- [v-skeleton](#v-skeleton)
  - [Options](#options-1)
  - [Attribute Options](#attribute-options-1)
  - [Animation](#animation)
  - [v-skeleton-avatar Options](#v-skeleton-avatar-options)
  - [v-skeleton-list Options](#v-skeleton-list-options)
- [v-error](#v-error)
  - [Options](#options-2)
  - [Attribute Options](#attribute-options-2)
- [v-empty](#v-empty)
  - [Options](#options-3)
  - [Attribute Options](#attribute-options-3)
- [Adapt to Mobile](#adapt-to-mobile)
- [Thanks](#thanks)
- [LICENSE](#license)

## Installation

```sh
npm i vue-default-page
```

## Quickstart

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

Import a single directive.

```js
// main.js

// Import the directive
import { vdpLoading } from 'vue-default-page';

import { createApp } from 'vue';

const app = createApp();

// Register the directive
app.use(vdpLoading);
```

Import to the component.

```vue
<!-- demo.vue -->

<script setup lang="js">
  // Import the function
  import { createVueDefaultPage } from 'vue-default-page';
  // Create the directive
  const vLoading = createVueDefaultPage('loading');
</script>

<template>
  <div v-loading="true"></div>
</template>
```

### Advanced

```vue
<!-- demo.vue -->

<script setup lang="js">
  import { ref } from 'vue';

  const useRun = (api) => {
    const loading = ref(false);
    const error = ref(false);
    const formatApi = async (...args) => {
      error.value = false;
      loading.value = true;
      try {
        const ret = await api(...args);
        return ret;
      } catch (e) {
        error.value = true;
        throw e;
      } finally {
        loading.value = false;
      }
    };
    return [loading, error, formatApi];
  };

  const data = ref([]);
  // Simulate a request
  const api = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        data.value = Array.from({ length: 10 }, (v, k) => k);
        resolve();
      }, 2000);
    });

  const [loading, error, init] = useRun(api);

  init();
</script>

<template>
  <div v-loading="loading" v-error="[error, init]" v-empty="!data.length">
    <div v-for="i in data" :key="i">{{ i }}</div>
  </div>
</template>
```

### Show Priority

When all directives are true, it will be shown according to the following priority.

`v-loading` > `v-skeleton` = `v-skeleton-avatar` = `v-skeleton-list` > `v-error` > `v-empty`

## Custom Options

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

Set options when import a single directive.

```js
// main.js

app.use(vdpLoading, {
  background: '#000',
  iconColor: '#fff',
  miniIconColor: '#fff',
  textColor: '#fff',
});
```

Set options when import to the component.

```vue
<!-- demo.vue -->

<script setup lang="js">
  const vLoading = createVueDefaultPage('loading', {
    background: '#000',
    iconColor: '#fff',
    miniIconColor: '#fff',
    textColor: '#fff',
  });
</script>
```

Set options through attributes on the element.

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

Set a boolean to disable directive you don't wish to register.

```js
// main.js

app.use(vueDefaultPage, {
  error: false,
});
```

### Common Options

| Name       | Description                      | Type            | Default |
| ---------- | -------------------------------- | --------------- | ------- |
| zIndex     | the stack level of the directive | number / string | 100     |
| background | background color of the mask     | string          | #fff    |

### Common Attribute Options

| Name           | Description                      | Type   | Default |
| -------------- | -------------------------------- | ------ | ------- |
| vdp-z-Index    | the stack level of the directive | string | 100     |
| vdp-background | background color of the mask     | string | #fff    |

## v-loading

Custom icon, same option as [v-error](#v-error) and [v-empty](#v-empty).

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

### Options

| Name          | Description                                     | Type             | Default  |
| ------------- | ----------------------------------------------- | ---------------- | -------- |
| enable        | enable the directive                            | boolean          | true     |
| text          | text                                            | string           | Loading… |
| textColor     | text color                                      | string           | #999     |
| iconColor     | icon color (disable when custom icon)           | string           | #bbb     |
| miniIconColor | mini icon color (disable when custom mini icon) | string           | #bbb     |
| icon          | custom icon                                     | string           | —        |
| miniIcon      | custom mini icon                                | boolean / string | true     |
| iconMaxSize   | maximum size of icon                            | number / string  | 24       |
| iconShowText  | whether to show text when using large icon      | boolean          | true     |
| zIndex        | the stack level of the directive                | number / string  | 100      |
| background    | background color of the mask                    | string           | #fff     |

### Attribute Options

| Name                        | Description                                    | Type   | Default  |
| --------------------------- | ---------------------------------------------- | ------ | -------- |
| vdp-loading-text            | text                                           | string | Loading… |
| vdp-loading-text-color      | text color                                     | string | #999     |
| vdp-loading-icon-color      | icon color (disable when custom icon)          | string | #bbb     |
| vdp-loading-mini-icon-color | mini icon color (disable when custom mini ico) | string | #bbb     |
| vdp-loading-icon            | custom icon                                    | string | —        |
| vdp-loading-mini-icon       | custom mini icon                               | string | —        |
| vdp-loading-icon-max-size   | maximum size of icon                           | string | 24       |

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

These two directives can be used independently by registering them. Unlike other directives, they are false by default and need to be manually activated.

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

### Options

| Name          | Description                      | Type                                         | Default |
| ------------- | -------------------------------- | -------------------------------------------- | ------- |
| enable        | enable the directive             | boolean                                      | true    |
| animation     | animation                        | boolean / ('avatar' ｜ 'list')[] / Animation | true    |
| avatarMaxSize | maximum size of avatar           | number / string                              | 54      |
| zIndex        | the stack level of the directive | number / string                              | 100     |
| background    | background color of the mask     | string                                       | #fff    |

### Attribute Options

| Name                         | Description            | Type   | Default |
| ---------------------------- | ---------------------- | ------ | ------- |
| vdp-skeleton-avatar-max-size | maximum size of avatar | string | 54      |

### Animation

| Name   | Description | Type    | Default |
| ------ | ----------- | ------- | ------- |
| avatar | show avatar | boolean | true    |
| list   | show list   | boolean | true    |

### v-skeleton-avatar Options

| Name          | Description            | Type            | Default |
| ------------- | ---------------------- | --------------- | ------- |
| enable        | enable the directive   | boolean         | false   |
| animation     | animation              | boolean         | true    |
| avatarMaxSize | maximum size of avatar | number / string | 54      |

### v-skeleton-list Options

| Name      | Description          | Type    | Default |
| --------- | -------------------- | ------- | ------- |
| enable    | enable the directive | boolean | false   |
| animation | animation            | boolean | true    |

## v-error

Like other directives, it can be controlled to show or hide using a boolean.

```vue
<!-- demo.vue -->

<template>
  <div v-error="true"></div>
</template>
```

You can also pass a refresh function in an array. For detailed usage, refer to [Advanced](#Advanced).

```vue
<!-- demo.vue -->

<template>
  <div v-error="[error, () => {}]"></div>
</template>
```

### Options

| Name         | Description                                           | Type             | Default            |
| ------------ | ----------------------------------------------------- | ---------------- | ------------------ |
| enable       | enable the directive                                  | boolean          | true               |
| text         | text                                                  | string           | Network Error      |
| refreshText  | refresh text (enable when refresh function is passed) | boolean / string | , Click to Refresh |
| textColor    | text color                                            | string           | #999               |
| icon         | custom icon                                           | string           | —                  |
| miniIcon     | custom mini icon                                      | boolean / string | true               |
| iconMaxSize  | maximum size of icon                                  | number / string  | 180                |
| iconShowText | whether to show text when using large icon            | boolean          | true               |
| zIndex       | the stack level of the directive                      | number / string  | 100                |
| background   | background color of the mask                          | string           | #fff               |

### Attribute Options

| Name                    | Description                                           | Type   | Default            |
| ----------------------- | ----------------------------------------------------- | ------ | ------------------ |
| vdp-error-text          | text                                                  | string | Network Error      |
| vdp-error-refresh-text  | refresh text (enable when refresh function is passed) | string | , Click to Refresh |
| vdp-error-text-color    | text color                                            | string | #999               |
| vdp-error-icon          | custom icon                                           | string | —                  |
| vdp-error-mini-icon     | custom mini icon                                      | string | —                  |
| vdp-error-icon-max-size | maximum size of icon                                  | string | 180                |

## v-empty

All directives will automatically adjust their height according to the container's size, and exhibit varying display states.

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

### Options

| Name         | Description                           | Type             | Default |
| ------------ | ------------------------------------- | ---------------- | ------- |
| enable       | enable the directive                  | boolean          | true    |
| text         | text                                  | string           | No Data |
| textColor    | text color                            | string           | #999    |
| icon         | custom icon                           | string           | —       |
| miniIcon     | custom mini icon                      | boolean / string | true    |
| iconMaxSize  | maximum size of icon                  | number / string  | 180     |
| iconShowText | whether to show text when using large | boolean          | true    |
| zIndex       | the stack level of the directive      | number / string  | 100     |
| background   | background color of the mask          | string           | #fff    |

### Attribute Options

| Name                    | Description          | Type   | Default |
| ----------------------- | -------------------- | ------ | ------- |
| vdp-empty-text          | text                 | string | No Data |
| vdp-empty-text-color    | text color           | string | #999    |
| vdp-empty-icon          | custom icon          | string | —       |
| vdp-empty-mini-icon     | custom mini icon     | string | —       |
| vdp-empty-icon-max-size | maximum size of icon | string | 180     |

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
