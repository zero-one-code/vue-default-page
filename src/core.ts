import { camelCase, omit } from 'lodash';
import {
  type Directive,
  type DirectiveBinding,
  createApp,
  h,
  nextTick,
  reactive,
  type Plugin,
  toRaw,
} from 'vue';
import VueDefaultPage, { type Props } from './components/index.vue';
import type { DirectiveOptions, Name, Value, CamelName } from './types';
import './style/index.less';
import { getPrefix } from './utils';

const INSTANCE_KEY = Symbol(getPrefix());

export const publicPropsKeys = ['zIndex', 'background'] as const;

interface El extends HTMLElement {
  [INSTANCE_KEY]?: {
    props: Props;
    unmount(): void;
  };
}
interface InstanceOptions<T extends Name> {
  name: T;
  options?: DirectiveOptions<T>;
  el: El;
  binding: DirectiveBinding<Value<T>>;
}

function getArrVal<T extends Name>(
  instanceOptions: InstanceOptions<T>
): [boolean, (() => void)?] {
  const {
    name,
    binding: { value },
  } = instanceOptions;
  if (typeof value === 'boolean') return [value];
  if (name !== 'error') throw new Error(`v-${name} 传参类型只能为布尔值`);
  return value;
}

function create(el: El) {
  if (el[INSTANCE_KEY]) return;
  const props: Props = reactive({});
  const instance = createApp({
    render: () => h(VueDefaultPage, props),
  });
  el[INSTANCE_KEY] = {
    props,
    unmount: instance.unmount,
  };
  const vm = instance.mount(document.createElement('div'));
  el.appendChild(vm.$el);
}

async function setStyle(el: El) {
  await nextTick();
  const { position } = getComputedStyle(el); // 获取最终样式
  const classes: string[] = [];
  position !== 'absolute' &&
    position !== 'fixed' &&
    classes.push(getPrefix('position'));
  el.clientHeight <= 80 && classes.push(getPrefix('min-height'));
  el.classList.add(...classes);
}

function getName<T extends Name>(instanceOptions: InstanceOptions<T>) {
  const {
    name,
    binding: {
      modifiers: { avatar, list },
    },
  } = instanceOptions;
  const camelName = camelCase(name) as CamelName;
  if (camelName === 'skeleton' && avatar && !list) return 'skeletonAvatar';
  if (camelName === 'skeleton' && !avatar && list) return 'skeletonList';
  return camelName;
}

function getProps<T extends Name>(instanceOptions: InstanceOptions<T>) {
  const { name, el, options } = instanceOptions;
  const regExpName = new RegExp(
    [
      `^${getPrefix(name)}`,
      ...publicPropsKeys.map((key) => getPrefix(key)),
    ].join('|')
  );
  const regExpReplace = new RegExp(`^(${getPrefix(name)}-|${getPrefix()}-)`);
  const attrProps = Array.from(el.attributes).reduce(
    (ret, item) => {
      const { name: attrName, value } = item;
      if (regExpName.test(attrName)) {
        const key = camelCase(attrName.replace(regExpReplace, ''));
        ret[key] = value;
      }
      return ret;
    },
    {} as Record<string, string>
  );
  return {
    ...options,
    ...attrProps,
  } as DirectiveOptions<T>;
}

function setProps<T extends Name>(instanceOptions: InstanceOptions<T>) {
  const { name, el } = instanceOptions;
  if (!el[INSTANCE_KEY]) return;

  const [value, onRefresh] = getArrVal(instanceOptions);

  if (value) {
    // 设置 error 刷新事件
    onRefresh && (el[INSTANCE_KEY].props.onRefresh = onRefresh);

    const allProps = getProps(instanceOptions);

    // 设置父组件样式
    publicPropsKeys.forEach(
      (key) => (el[INSTANCE_KEY]!.props[key] = allProps[key] as string)
    );

    // 设置子组件 Props
    const key = `${camelCase(name)}Props` as `${CamelName}Props`;
    const props = el[INSTANCE_KEY].props[key];
    const childProps = omit(allProps, publicPropsKeys);
    childProps &&
      toRaw(props) !== childProps &&
      (el[INSTANCE_KEY].props[key] = childProps);
  }

  // 设置指令类型
  el[INSTANCE_KEY].props[getName(instanceOptions)] = value;
}

function show<T extends Name>(instanceOptions: InstanceOptions<T>) {
  const { el } = instanceOptions;
  create(el);
  setStyle(el);
  setProps(instanceOptions);
}

function removeInstance(el: El) {
  el[INSTANCE_KEY]?.unmount();
  delete el[INSTANCE_KEY];
}

function removeStyle(el: El) {
  el.classList.remove(getPrefix('position'), getPrefix('min-height'));
}

function destroy(el: El) {
  if (!el[INSTANCE_KEY]) return;
  removeInstance(el);
  removeStyle(el);
}

async function close<T extends Name>(instanceOptions: InstanceOptions<T>) {
  setProps(instanceOptions);
  await nextTick(); // 等待其他指令赋值后再判断，防止组件过度创建与销毁
  const { el } = instanceOptions;
  if (!el[INSTANCE_KEY]) return;
  Object.values(el[INSTANCE_KEY].props).some(
    (val) => typeof val === 'boolean' && val
  ) || destroy(el);
}

export function createVueDefaultPage<T extends Name>(
  name: T,
  options?: DirectiveOptions<T>
) {
  return {
    mounted(el, binding) {
      const instanceOptions = { name, options, el, binding };
      getArrVal(instanceOptions)[0] && show(instanceOptions);
    },
    updated(el, binding) {
      const { value, oldValue } = binding;
      const instanceOptions = { name, options, el, binding };
      if (value === oldValue) return setProps(instanceOptions);
      getArrVal(instanceOptions)[0]
        ? show(instanceOptions)
        : close(instanceOptions);
    },
    unmounted(el) {
      destroy(el);
    },
  } as Directive<El, Value<T>>;
}

export function createPlugin<T extends Name>(name: T) {
  return {
    install(app, options) {
      app.directive(name, createVueDefaultPage(name, options));
    },
  } as Plugin<[options?: DirectiveOptions<T>]>;
}
