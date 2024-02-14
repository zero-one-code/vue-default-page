# Vue-Default-Page

一个 Vue 3.0 自定义指令包插件，内置 `v-loading`，`v-skeleton`，`v-skeleton-avatar`，`v-skeleton-list`，`v-error`，`v-empty` 等指令，专注解决网络请求时等待、回显和报错等场景。

## 目录

- [安装](#安装)
- [快速上手](#快速上手)
  - [进阶](#进阶)
  - [显示优先级](#显示优先级)
- [自定义配置](#自定义配置)
  - [通用配置项](#通用配置项)
  - [属性通用配置项](#属性通用配置项)
- [v-loading](#v-loading)
  - [配置项](#配置项)
  - [属性配置项](#属性配置项)
- [v-skeleton](#v-skeleton)
  - [配置项](#配置项-1)
  - [属性配置项](#属性配置项-1)
  - [Animation](#animation)
  - [v-skeleton-avatar 配置项](#v-skeleton-avatar-配置项)
  - [v-skeleton-list 配置项](#v-skeleton-list-配置项)
- [v-error](#v-error)
  - [配置项](#配置项-2)
  - [属性配置项](#属性配置项-2)
- [v-empty](#v-empty)
  - [配置项](#配置项-3)
  - [属性配置项](#属性配置项-3)
- [兼容移动端](#兼容移动端)
- [鸣谢](#鸣谢)
- [开源协议](#开源协议)

## 安装

```sh
npm i vue-default-page
```

## 快速上手

```js
// main.js

// 引入指令
import vueDefaultPage from 'vue-default-page';
// 引入样式
import 'vue-default-page/style.css';

import { createApp } from 'vue';

const app = createApp();

// 注册指令
app.use(vueDefaultPage);
```

```vue
<!-- demo.vue -->

<div v-loading="true"></div>
```

单独使用某个指令。

```js
// main.js

// 引入指令
import { vdpLoading } from 'vue-default-page';

import { createApp } from 'vue';

const app = createApp();

// 注册指令
app.use(vdpLoading);
```

直接在组件中引入。

```vue
<!-- demo.vue -->

<script setup lang="js">
  // 引入指令
  import { createVueDefaultPage } from 'vue-default-page';
  // 创建指令
  const vLoading = createVueDefaultPage('loading');
</script>

<template>
  <div v-loading="true"></div>
</template>
```

### 进阶

```vue
<!-- demo.vue -->

<script setup lang="js">
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
  const api = () => {
    // 模拟请求，一般是返回 Promise 对象
    return setTimeout(() => {
      data.value = Array.from({ length: 10 }, (v, k) => k);
    }, 1000);
  };

  const [loading, error, init] = useRun(api);

  init();
</script>

<template>
  <div v-loading="loading" v-error="[error, init]" v-empty="!data.length">
    <div v-for="i in data" :key="i">{{ i }}</div>
  </div>
</template>
```

### 显示优先级

指令均为 true 时会按以下优先级显示。

`v-loading` > `v-skeleton` = `v-skeleton-avatar` = `v-skeleton-list` > `v-error` > `v-empty`

## 自定义配置

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

单独使用某个指令时添加配置。

```js
// main.js

app.use(vdpLoading, {
  background: '#000',
  iconColor: '#fff',
  miniIconColor: '#fff',
  textColor: '#fff',
});
```

在组件中引入时添加配置。

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

通过在元素上添加属性配置。

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

直接传布尔值关闭不想要的指令。

```js
// main.js

app.use(vueDefaultPage, {
  error: false,
});
```

### 通用配置项

| 名称       | 说明           | 类型            | 默认值 |
| ---------- | -------------- | --------------- | ------ |
| zIndex     | 指令的层叠顺序 | number / string | 100    |
| background | 背景遮罩的颜色 | string          | #fff   |

### 属性通用配置项

| 名称           | 说明           | 类型   | 默认值 |
| -------------- | -------------- | ------ | ------ |
| vdp-z-Index    | 指令的层叠顺序 | string | 100    |
| vdp-background | 背景遮罩的颜色 | string | #fff   |

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

### 配置项

| 名称          | 说明                             | 类型             | 默认值   |
| ------------- | -------------------------------- | ---------------- | -------- |
| enable        | 是否使用指令                     | boolean          | true     |
| text          | 文案                             | string           | Loading… |
| textColor     | 文案颜色                         | string           | #999     |
| iconColor     | 图标颜色（自定义图标时失效）     | string           | #bbb     |
| miniIconColor | 小图标颜色（自定义小图标时失效） | string           | #bbb     |
| icon          | 自定义图标                       | string           | —        |
| miniIcon      | 自定义小图标                     | boolean / string | true     |
| iconMaxSize   | 图标最大尺寸                     | number / string  | 24       |
| iconShowText  | 大图标时是否显示文案             | boolean          | true     |
| zIndex        | 指令的层叠顺序                   | number /string   | 100      |
| background    | 背景遮罩的颜色                   | string           | #fff     |

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

默认显示头像和列表 skeleton， 也可以单独使用。

```vue
<!-- demo.vue -->

<template>
  <div v-skeleton="true"></div>
  <div v-skeleton.avatar="true"></div>
  <div v-skeleton.list="true"></div>
</template>
```

可以通过定义指令的形式单独使用，与其他指令不同的是这两个指令默认是关闭的，需手动开启。

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

### 配置项

| 名称          | 说明           | 类型                                         | 默认值 |
| ------------- | -------------- | -------------------------------------------- | ------ |
| enable        | 是否使用指令   | boolean                                      | true   |
| animation     | 动画           | boolean / ('avatar' ｜ 'list')[] / Animation | true   |
| avatarMaxSize | 头像最大尺寸   | number / string                              | 54     |
| zIndex        | 指令的层叠顺序 | number /string                               | 100    |
| background    | 背景遮罩的颜色 | string                                       | #fff   |

### 属性配置项

| 名称                         | 说明         | 类型   | 默认值 |
| ---------------------------- | ------------ | ------ | ------ |
| vdp-skeleton-avatar-max-size | 头像最大尺寸 | string | 54     |

### Animation

| 名称   | 说明     | 类型    | 默认值 |
| ------ | -------- | ------- | ------ |
| avatar | 显示头像 | boolean | true   |
| list   | 显示列表 | boolean | true   |

### v-skeleton-avatar 配置项

| 名称          | 说明         | 类型            | 默认值 |
| ------------- | ------------ | --------------- | ------ |
| enable        | 是否使用指令 | boolean         | false  |
| animation     | 动画         | boolean         | true   |
| avatarMaxSize | 头像最大尺寸 | number / string | 54     |

### v-skeleton-list 配置项

| 名称      | 说明         | 类型    | 默认值 |
| --------- | ------------ | ------- | ------ |
| enable    | 是否使用指令 | boolean | false  |
| animation | 动画         | boolean | true   |

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

### 配置项

| 名称         | 说明                           | 类型             | 默认值             |
| ------------ | ------------------------------ | ---------------- | ------------------ |
| enable       | 是否使用指令                   | boolean          | true               |
| text         | 文案                           | string           | Network Error      |
| refreshText  | 刷新文案（传入刷新函数时生效） | boolean / string | , Click to Refresh |
| textColor    | 文案颜色                       | string           | #999               |
| icon         | 自定义图标                     | string           | —                  |
| miniIcon     | 自定义小图标                   | boolean / string | true               |
| iconMaxSize  | 图标最大尺寸                   | number /string   | 180                |
| iconShowText | 大图标时是否显示文案           | boolean          | true               |
| zIndex       | 指令的层叠顺序                 | number /string   | 100                |
| background   | 背景遮罩的颜色                 | string           | #fff               |

### 属性配置项

| 名称                    | 说明                           | 类型             | 默认值             |
| ----------------------- | ------------------------------ | ---------------- | ------------------ |
| vdp-error-text          | 文案                           | string           | Network Error      |
| vdp-error-refresh-text  | 刷新文案（传入刷新函数时生效） | boolean / string | , Click to Refresh |
| vdp-error-text-color    | 文案颜色                       | string           | #999               |
| vdp-error-icon          | 自定义图标                     | string           | —                  |
| vdp-error-mini-icon     | 自定义小图标                   | string           | —                  |
| vdp-error-icon-max-size | 图标最大尺寸                   | string           | 180                |

## v-empty

所有指令都会根据容器大小自动调整高度，并且有不同的显示状态。

```vue
<!-- demo.vue -->

<template>
  <div v-empty="true" style="{height: 1000px;}"></div>
  <div v-empty="true"></div>
</template>
```

可通过 `iconMaxSize` 配置项或 `vdp-empty-icon-max-size` 属性配置项更改图标最大尺寸（[v-skeleton](#v-skeleton) 系列指令只能通过 `avatarMaxSize` 配置项更改头像最大尺寸）。

```vue
<!-- demo.vue -->

<template>
  <div
    v-empty="true"
    style="{height: 1000px;}"
    vdp-empty-icon-max-size="500"
  ></div>
</template>
```

### 配置项

| 名称         | 说明                 | 类型             | 默认值  |
| ------------ | -------------------- | ---------------- | ------- |
| enable       | 是否使用指令         | boolean          | true    |
| text         | 文案                 | string           | No Data |
| textColor    | 文案颜色             | string           | #999    |
| icon         | 自定义图标           | string           | —       |
| miniIcon     | 自定义小图标         | boolean / string | true    |
| iconMaxSize  | 图标最大尺寸         | number /string   | 180     |
| iconShowText | 大图标时是否显示文案 | boolean          | true    |
| zIndex       | 指令的层叠顺序       | number /string   | 100     |
| background   | 背景遮罩的颜色       | string           | #fff    |

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

本项目基于 [MIT]() 协议。
