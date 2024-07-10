import { camelCase, pick } from 'lodash';
import {
  type Directive,
  createApp,
  h,
  nextTick,
  reactive,
  type Plugin,
  toRaw,
} from 'vue';
import Core from './Core.vue';
import {
  DIRECTIVE_NAMES,
  INSTANCE_KEY,
  getPrefix,
  isLayoutPosition,
  isShowMask,
} from '../../utils';
import type {
  CamelName,
  DirectiveOptions,
  InstanceOptions,
  Name,
  CoreProps,
  VdpValue,
  VueDefaultPage,
  VdpEl,
} from './type';
import '../../style/index.less';
import { PUBLIC_PROPS_KEYS } from './utils';

function getValue<T extends Name>(instanceOptions: InstanceOptions<T>) {
  const {
    name,
    binding: { value },
  } = instanceOptions;
  if (typeof value === 'boolean') return value;
  if (name !== 'error')
    throw new Error(`The expected param type for v-${name} is a Boolean`);
  return value[0];
}

function create(el: VdpEl) {
  if (el[INSTANCE_KEY]) return;
  const props: CoreProps = reactive({});
  const instance = createApp({
    render: () => h(Core, props),
  });
  el[INSTANCE_KEY] = {
    props,
    unmount: instance.unmount,
  };
  const vm = instance.mount(document.createElement('div'));
  el.appendChild(vm.$el);
}

async function setStyle(el: VdpEl) {
  await nextTick();
  const { position } = getComputedStyle(el); // 获取最终样式
  const classes: string[] = [];
  isLayoutPosition(position) || classes.push(getPrefix('position'));
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
      ...PUBLIC_PROPS_KEYS.map((key) => getPrefix(key)),
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
  };
}

function setProps<T extends Name>(instanceOptions: InstanceOptions<T>) {
  const { name, el } = instanceOptions;
  if (!el[INSTANCE_KEY]) return;

  if (getValue(instanceOptions)) {
    // 设置子组件 Props
    const key = `${camelCase(name)}Props` as `${CamelName}Props`;
    const props = el[INSTANCE_KEY].props[key];
    const childProps = getProps(instanceOptions);
    childProps &&
      toRaw(props) !== childProps &&
      (el[INSTANCE_KEY].props[key] = childProps);
  }

  // 设置指令类型
  (el[INSTANCE_KEY].props[getName<T>(instanceOptions)] as VdpValue<T>) =
    instanceOptions.binding.value;
}

function show<T extends Name>(instanceOptions: InstanceOptions<T>) {
  const { el } = instanceOptions;
  create(el);
  setStyle(el);
  setProps(instanceOptions);
}

function removeInstance(el: VdpEl) {
  el[INSTANCE_KEY]?.unmount();
  delete el[INSTANCE_KEY];
}

function removeStyle(el: VdpEl) {
  el.classList.remove(getPrefix('position'), getPrefix('min-height'));
}

function destroy(el: VdpEl) {
  if (!el[INSTANCE_KEY]) return;
  removeInstance(el);
  removeStyle(el);
}

async function close<T extends Name>(instanceOptions: InstanceOptions<T>) {
  setProps(instanceOptions);
  await nextTick(); // 等待其他指令赋值后再判断，防止组件过度创建与销毁
  const { el } = instanceOptions;
  if (!el[INSTANCE_KEY] || isShowMask(el[INSTANCE_KEY].props)) return;
  destroy(el);
}

export function createVueDefaultPage<T extends Name>(
  name: T,
  options?: DirectiveOptions<T>
) {
  return {
    mounted(el, binding) {
      const instanceOptions = { name, options, el, binding };
      getValue(instanceOptions) && show(instanceOptions);
    },
    updated(el, binding) {
      const { value, oldValue } = binding;
      const instanceOptions = { name, options, el, binding };
      if (value === oldValue) return setProps(instanceOptions);
      getValue(instanceOptions)
        ? show(instanceOptions)
        : close(instanceOptions);
    },
    unmounted(el) {
      destroy(el);
    },
  } as Directive<VdpEl, VdpValue<T>>;
}

export function createPlugin<T extends Name>(name: T) {
  return {
    install(app, options) {
      app.directive(name, createVueDefaultPage(name, options));
    },
  } as Plugin<[options?: DirectiveOptions<T>]>;
}

export const vueDefaultPage: Plugin<[options?: VueDefaultPage]> = {
  install(app, options = {}) {
    DIRECTIVE_NAMES.forEach((name) => {
      const currentOptions = options[name] ?? {};
      const { enable, ...otherOptions } =
        typeof currentOptions === 'boolean'
          ? { enable: currentOptions }
          : currentOptions;
      const isEnable =
        enable ?? !['skeletonAvatar', 'skeletonList'].includes(name);
      if (!isEnable) return;
      app.directive(
        name,
        createVueDefaultPage(name, {
          ...pick(options, PUBLIC_PROPS_KEYS),
          ...otherOptions,
        })
      );
    });
  },
};
