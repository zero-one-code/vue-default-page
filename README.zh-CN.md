# Vue-Default-Page

[![NPM Version](https://img.shields.io/npm/v/vue-default-page)](https://www.npmjs.com/package/vue-default-page)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/edit/vue-default-page?file=src%2FApp.vue)

一个 Vue 3.0 自定义指令包插件，内置 `v-loading`，`v-skeleton`，`v-skeleton-avatar`，`v-skeleton-list`，`v-error`，`v-empty` 等缺省页指令，专注解决网络请求时等待、回显和报错等场景。

## 目录

- [安装](#安装)
- [快速上手](#快速上手)
  - [完整引入](#完整引入)
  - [全局配置](#全局配置)
  - [按需引入](#按需引入)
  - [按需引入全局配置](#按需引入全局配置)
  - [局部引入](#局部引入)
  - [局部引入配置](#局部引入配置)
  - [进阶](#进阶)
  - [显示优先级](#显示优先级)
- [v-loading](#v-loading)
  - [VdpLoading 配置项](#vdploading-配置项)
  - [属性配置项](#属性配置项)
- [v-skeleton](#v-skeleton)
  - [VdpSkeleton 配置项](#vdpskeleton-配置项)
  - [属性配置项](#属性配置项-1)
  - [Animation](#animation)
  - [VdpSkeletonAvatar 配置项](#vdpskeletonavatar-配置项)
  - [VdpSkeletonList 配置项](#vdpskeletonlist-配置项)
- [v-error](#v-error)
  - [VdpError 配置项](#vdperror-配置项)
  - [属性配置项](#属性配置项-2)
- [v-empty](#v-empty)
  - [VdpEmpty 配置项](#vdpempty-配置项)
  - [属性配置项](#属性配置项-3)
- [兼容移动端](#兼容移动端)
- [鸣谢](#鸣谢)
- [开源协议](#开源协议)

## 安装

```sh
npm i vue-default-page
```

## 快速上手

### 完整引入

```js
// main.js

// 引入指令
import vueDefaultPage from 'vue-default-page';
// 引入样式
import 'vue-default-page/index.css';

import { createApp } from 'vue';

const app = createApp();

// 注册指令
app.use(vueDefaultPage);
```

```vue
<!-- demo.vue -->

<div v-loading="true"></div>
```

### 全局配置

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

| 名称           | 说明                       | 类型                                                     | 默认值 |
| -------------- | -------------------------- | -------------------------------------------------------- | ------ |
| zIndex         | 指令的层叠顺序             | number / string                                          | 100    |
| background     | 背景遮罩的颜色             | string                                                   | #fff   |
| loading        | v-loading 指令配置         | boolean / [VdpLoading](#vdploading-配置项)               | true   |
| skeleton       | v-skeleton 指令配置        | boolean / [VdpSkeleton](#vdpskeleton-配置项)             | true   |
| skeletonAvatar | v-skeleton-avatar 指令配置 | boolean / [VdpSkeletonAvatar](#vdpskeletonavatar-配置项) | false  |
| skeletonList   | v-skeleton-list 指令配置   | boolean / [VdpSkeletonList](#vdpskeletonlist-配置项)     | false  |
| error          | v-error 指令配置           | boolean / [VdpError](#vdperror-配置项)                   | true   |
| empty          | v-empty 指令配置           | boolean / [VdpEmpty](#vdpempty-配置项)                   | true   |

### 按需引入

```js
// main.js

// 引入指令
import { vdpLoading } from 'vue-default-page';
// 引入样式
import 'vue-default-page/index.css';

import { createApp } from 'vue';

const app = createApp();

// 注册指令
app.use(vdpLoading);
```

### 按需引入全局配置

```js
// main.js

app.use(vdpLoading, {
  background: '#000',
  iconColor: '#fff',
  miniIconColor: '#fff',
  textColor: '#fff',
});
```

| 名称              | 说明                   | 配置项类型                                     |
| ----------------- | ---------------------- | ---------------------------------------------- |
| vdpLoading        | v-loading 指令         | [VdpLoading](#vdploading-配置项)               |
| vdpSkeleton       | v-skeleton 指令        | [VdpSkeleton](#vdpskeleton-配置项)             |
| vdpSkeletonAvatar | v-skeleton-avatar 指令 | [VdpSkeletonAvatar](#vdpskeletonavatar-配置项) |
| vdpSkeletonList   | v-skeleton-list 指令   | [VdpSkeletonList](#vdpskeletonlist-配置项)     |
| vdpError          | v-error 指令           | [VdpError](#vdperror-配置项)                   |
| vdpEmpty          | v-empty 指令           | [VdpEmpty](#vdpempty-配置项)                   |

### 局部引入

```vue
<!-- demo.vue -->

<script setup lang="js">
  // 引入指令创建方法
  import { createVueDefaultPage } from 'vue-default-page';
  // 引入样式
  import 'vue-default-page/index.css';
  // 创建指令
  const vLoading = createVueDefaultPage('loading');
</script>

<template>
  <div v-loading="true"></div>
</template>
```

### 局部引入配置

方法一：在指令创建方法中配置，具体配置与[按需引入全局配置](#按需引入全局配置)一致。

```vue
<!-- demo.vue -->

<script setup lang="js">
  // 创建指令
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

方法二：在元素上添加属性配置。

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

通用属性配置项，各指令属性配置项请前往下方具体章节查看。

| 名称           | 说明           | 类型   | 默认值 |
| -------------- | -------------- | ------ | ------ |
| vdp-z-index    | 指令的层叠顺序 | string | 100    |
| vdp-background | 背景遮罩的颜色 | string | #fff   |

### 进阶

```vue
<!-- demo.vue -->

<script setup lang="js">
  import { ref } from 'vue';
  // npm i vue-hooks-plus
  import { useRequest } from 'vue-hooks-plus';

  const data = ref([]);
  // 模拟首次请求失败，刷新重试请求成功
  let times = 0;
  const api = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        data.value = Array.from({ length: 10 }, (v, k) => k);
        times ? resolve('请求成功') : reject('请求失败');
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

### 显示优先级

指令均为 true 时会按以下优先级显示。

`v-loading` > `v-skeleton` = `v-skeleton-avatar` = `v-skeleton-list` > `v-error` > `v-empty`

## v-loading

可自定义图标，[v-error](#v-error) 和 [v-empty](#v-empty) 中也有相同的配置项。

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
  // 创建指令
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

### VdpLoading 配置项

| 名称          | 说明                                            | 类型             | 默认值   |
| ------------- | ----------------------------------------------- | ---------------- | -------- |
| enable        | 是否使用指令（仅在[全局配置](#全局配置)时生效） | boolean          | true     |
| text          | 文案                                            | string           | Loading… |
| textColor     | 文案颜色                                        | string           | #999     |
| iconColor     | 图标颜色（自定义图标时失效）                    | string           | #bbb     |
| miniIconColor | 小图标颜色（自定义小图标时失效）                | string           | #bbb     |
| icon          | 自定义图标                                      | string           | —        |
| miniIcon      | 自定义小图标                                    | boolean / string | true     |
| iconMaxSize   | 图标最大尺寸                                    | number / string  | 24       |
| iconShowText  | 大图标时是否显示文案                            | boolean          | true     |
| zIndex        | 指令的层叠顺序                                  | number / string  | 100      |
| background    | 背景遮罩的颜色                                  | string           | #fff     |

### 属性配置项

| 名称                        | 说明                             | 类型   | 默认值   |
| --------------------------- | -------------------------------- | ------ | -------- |
| vdp-loading-text            | 文案                             | string | Loading… |
| vdp-loading-text-color      | 文案颜色                         | string | #999     |
| vdp-loading-icon-color      | 图标颜色（自定义图标时失效）     | string | #bbb     |
| vdp-loading-mini-icon-color | 小图标颜色（自定义小图标时失效） | string | #bbb     |
| vdp-loading-icon            | 自定义图标                       | string | —        |
| vdp-loading-mini-icon       | 自定义小图标                     | string | —        |
| vdp-loading-icon-max-size   | 图标最大尺寸                     | string | 24       |

## v-skeleton

默认显示头像和列表 skeleton，也可以单独使用。

```vue
<!-- demo.vue -->

<template>
  <div v-skeleton="true"></div>
  <div v-skeleton.avatar="true"></div>
  <div v-skeleton.list="true"></div>
</template>
```

### VdpSkeleton 配置项

| 名称          | 说明                                            | 类型                                                       | 默认值 |
| ------------- | ----------------------------------------------- | ---------------------------------------------------------- | ------ |
| enable        | 是否使用指令（仅在[全局配置](#全局配置)时生效） | boolean                                                    | true   |
| animation     | 动画                                            | boolean / ('avatar' ｜ 'list')[] / [Animation](#animation) | true   |
| avatarMaxSize | 头像最大尺寸                                    | number / string                                            | 54     |
| zIndex        | 指令的层叠顺序                                  | number / string                                            | 100    |
| background    | 背景遮罩的颜色                                  | string                                                     | #fff   |

### 属性配置项

| 名称                         | 说明         | 类型   | 默认值 |
| ---------------------------- | ------------ | ------ | ------ |
| vdp-skeleton-avatar-max-size | 头像最大尺寸 | string | 54     |

### Animation

| 名称   | 说明         | 类型    | 默认值 |
| ------ | ------------ | ------- | ------ |
| avatar | 开启头像动画 | boolean | true   |
| list   | 开启列表动画 | boolean | true   |

头像或列表 skeleton 也可以通过定义指令的形式单独使用，但与其他指令不同的是这两个指令默认是关闭的，需手动开启。

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

### VdpSkeletonAvatar 配置项

| 名称          | 说明                                            | 类型            | 默认值 |
| ------------- | ----------------------------------------------- | --------------- | ------ |
| enable        | 是否使用指令（仅在[全局配置](#全局配置)时生效） | boolean         | false  |
| animation     | 动画                                            | boolean         | true   |
| avatarMaxSize | 头像最大尺寸                                    | number / string | 54     |

### VdpSkeletonList 配置项

| 名称      | 说明                                            | 类型    | 默认值 |
| --------- | ----------------------------------------------- | ------- | ------ |
| enable    | 是否使用指令（仅在[全局配置](#全局配置)时生效） | boolean | false  |
| animation | 动画                                            | boolean | true   |

## v-error

和其他指令一样可以通过布尔值控制显示和隐藏。

```vue
<!-- demo.vue -->

<template>
  <div v-error="true"></div>
</template>
```

也可以通过数组传入对应的刷新函数，具体使用可以查看[进阶](#进阶)篇章。

```vue
<!-- demo.vue -->

<template>
  <div v-error="[error, () => {}]"></div>
</template>
```

### VdpError 配置项

| 名称         | 说明                                            | 类型             | 默认值             |
| ------------ | ----------------------------------------------- | ---------------- | ------------------ |
| enable       | 是否使用指令（仅在[全局配置](#全局配置)时生效） | boolean          | true               |
| text         | 文案                                            | string           | Network Error      |
| refreshText  | 刷新文案（传入刷新函数时生效）                  | boolean / string | , Click to Refresh |
| textColor    | 文案颜色                                        | string           | #999               |
| icon         | 自定义图标                                      | string           | —                  |
| miniIcon     | 自定义小图标                                    | boolean / string | true               |
| iconMaxSize  | 图标最大尺寸                                    | number / string  | 180                |
| iconShowText | 大图标时是否显示文案                            | boolean          | true               |
| zIndex       | 指令的层叠顺序                                  | number / string  | 100                |
| background   | 背景遮罩的颜色                                  | string           | #fff               |

### 属性配置项

| 名称                    | 说明                           | 类型   | 默认值             |
| ----------------------- | ------------------------------ | ------ | ------------------ |
| vdp-error-text          | 文案                           | string | Network Error      |
| vdp-error-refresh-text  | 刷新文案（传入刷新函数时生效） | string | , Click to Refresh |
| vdp-error-text-color    | 文案颜色                       | string | #999               |
| vdp-error-icon          | 自定义图标                     | string | —                  |
| vdp-error-mini-icon     | 自定义小图标                   | string | —                  |
| vdp-error-icon-max-size | 图标最大尺寸                   | string | 180                |

## v-empty

所有指令都会根据容器大小自动调整高度，并且有不同的显示状态。

```vue
<!-- demo.vue -->

<template>
  <div v-empty="true" style="height: 500px;"></div>
  <div v-empty="true"></div>
</template>
```

可通过 `iconMaxSize` 配置项或 `vdp-empty-icon-max-size` 属性配置项更改图标最大尺寸（[v-skeleton](#v-skeleton) 系列指令只能通过 `avatarMaxSize` 配置项更改头像最大尺寸）。

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

### VdpEmpty 配置项

| 名称         | 说明                                            | 类型             | 默认值  |
| ------------ | ----------------------------------------------- | ---------------- | ------- |
| enable       | 是否使用指令（仅在[全局配置](#全局配置)时生效） | boolean          | true    |
| text         | 文案                                            | string           | No Data |
| textColor    | 文案颜色                                        | string           | #999    |
| icon         | 自定义图标                                      | string           | —       |
| miniIcon     | 自定义小图标                                    | boolean / string | true    |
| iconMaxSize  | 图标最大尺寸                                    | number / string  | 180     |
| iconShowText | 大图标时是否显示文案                            | boolean          | true    |
| zIndex       | 指令的层叠顺序                                  | number / string  | 100     |
| background   | 背景遮罩的颜色                                  | string           | #fff    |

### 属性配置项

| 名称                    | 说明         | 类型   | 默认值  |
| ----------------------- | ------------ | ------ | ------- |
| vdp-empty-text          | 文案         | string | No Data |
| vdp-empty-text-color    | 文案颜色     | string | #999    |
| vdp-empty-icon          | 自定义图标   | string | —       |
| vdp-empty-mini-icon     | 自定义小图标 | string | —       |
| vdp-empty-icon-max-size | 图标最大尺寸 | string | 180     |

## 兼容移动端

Vue-Default-Page 默认使用 `px` 作为样式单位，设计稿宽度为 `375`，可以使用 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 等插件转换为 `viewport` 单位。

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

## 鸣谢

感谢 [element-plus](https://github.com/element-plus/element-plus) 提供灵感。

## 开源协议

本项目基于 [MIT](./LICENSE). 协议。
