import { mount } from 'cypress/vue';
import {
  DefaultPage,
  createVueDefaultPage,
  vdpEmpty,
  vdpError,
  vdpLoading,
  vdpSkeleton,
  vdpSkeletonAvatar,
  vdpSkeletonList,
  vueDefaultPage,
  type VdpSkeleton,
  type VdpValue,
} from '..';
import { createDefaultPage } from '../web-components';
import type { VueWrapper } from '@vue/test-utils';
import { ref } from 'vue';
import {
  attrs,
  EmptyMiniRender,
  EmptyRender,
  ErrorMiniRender,
  ErrorRender,
  getGlobalPlugins,
  LoadingMiniRender,
  LoadingRender,
  SkeletonAvatarRender,
  SkeletonListRender,
  SkeletonMiniRender,
  SkeletonRender,
} from './utils';

before(() => createDefaultPage());

describe('loading', () => {
  describe('渲染（容器有高度）', () => {
    it('指令', () => {
      mount(LoadingRender, getGlobalPlugins(vdpLoading));
    });
    it('组件', () => {
      mount(() => <DefaultPage loading {...attrs}></DefaultPage>);
    });
    it('Web Components', () => {
      mount(() => <default-page loading {...attrs}></default-page>);
    });
    afterEach(() => cy.get('.vdp-icon-loading circle').should('exist'));
  });
  describe('渲染（容器无高度）', () => {
    it('指令', () => {
      mount(LoadingMiniRender, getGlobalPlugins(vdpLoading));
    });
    it('组件', () => {
      mount(() => <DefaultPage loading></DefaultPage>);
    });
    it('Web Components', () => {
      mount(() => <default-page loading></default-page>);
    });
    afterEach(() => cy.get('.vdp-icon-loading circle').should('exist'));
  });
  describe('修改图标颜色', () => {
    const options = { iconColor: '#000' };
    it('指令配置项', () => {
      mount(LoadingRender, getGlobalPlugins([vdpLoading, options]));
    });
    it('指令属性配置项', () => {
      mount(
        () => (
          <div
            v-loading={true}
            vdp-loading-icon-color={options.iconColor}
            {...attrs}
          ></div>
        ),
        getGlobalPlugins(vdpLoading)
      );
    });
    it('组件', () => {
      mount(() => (
        <DefaultPage loading loadingProps={options} {...attrs}></DefaultPage>
      ));
    });
    it('Web Components', () => {
      mount(() => (
        <default-page loading loadingProps={options} {...attrs}></default-page>
      ));
    });
    afterEach(() =>
      cy
        .get('svg.vdp-icon-loading')
        .should('have.css', 'stroke', 'rgb(0, 0, 0)')
    );
  });
  describe('修改小图标颜色', () => {
    const options = { miniIconColor: '#000' };
    it('指令配置项', () => {
      mount(LoadingMiniRender, getGlobalPlugins([vdpLoading, options]));
    });
    it('指令属性配置项', () => {
      mount(
        () => (
          <div
            v-loading={true}
            vdp-loading-mini-icon-color={options.miniIconColor}
          ></div>
        ),
        getGlobalPlugins(vdpLoading)
      );
    });
    it('组件', () => {
      mount(() => <DefaultPage loading loadingProps={options}></DefaultPage>);
    });
    it('Web Components', () => {
      mount(() => <default-page loading loadingProps={options}></default-page>);
    });
    afterEach(() =>
      cy
        .get('svg.vdp-icon-loading')
        .should('have.css', 'stroke', 'rgb(0, 0, 0)')
    );
  });
});

describe('skeleton', () => {
  describe('渲染（容器有高度）', () => {
    it('指令', () => {
      mount(SkeletonRender, getGlobalPlugins(vdpSkeleton));
    });
    it('组件', () => {
      mount(() => <DefaultPage skeleton {...attrs}></DefaultPage>);
    });
    it('Web Components', () => {
      mount(() => <default-page skeleton {...attrs}></default-page>);
    });
    afterEach(() =>
      cy
        .get('.vdp-skeleton-avatar')
        .should('exist')
        .get('.vdp-skeleton-list li')
        .should('have.length.be.gt', 2)
    );
  });
  describe('渲染（容器无高度）', () => {
    it('指令', () => {
      mount(SkeletonMiniRender, getGlobalPlugins(vdpSkeleton));
    });
    it('组件', () => {
      mount(() => <DefaultPage skeleton></DefaultPage>);
    });
    it('Web Components', () => {
      mount(() => <default-page skeleton></default-page>);
    });
    afterEach(() =>
      cy
        .get('.vdp-skeleton-avatar')
        .should('exist')
        .get('.vdp-skeleton-list li')
        .should('have.length', 2)
    );
  });
  describe('渲染（头像）', () => {
    it('指令修饰符', () => {
      mount(
        () => <div v-skeleton={[true, ['avatar']]}></div>,
        getGlobalPlugins(vdpSkeleton)
      );
    });
    it('单独注册指令', () => {
      mount(SkeletonAvatarRender, getGlobalPlugins(vdpSkeletonAvatar));
    });
    it('组件', () => {
      mount(() => <DefaultPage skeleton-avatar></DefaultPage>);
    });
    it('Web Components', () => {
      mount(() => <default-page skeletonAvatar></default-page>);
    });
    afterEach(() =>
      cy
        .get('.vdp-skeleton-avatar')
        .should('exist')
        .get('.vdp-skeleton-list')
        .should('not.exist')
    );
  });
  describe('渲染（列表）', () => {
    it('指令修饰符', () => {
      mount(
        () => <div v-skeleton={[true, ['list']]}></div>,
        getGlobalPlugins(vdpSkeleton)
      );
    });
    it('单独注册指令', () => {
      mount(SkeletonListRender, getGlobalPlugins(vdpSkeletonList));
    });
    it('组件', () => {
      mount(() => <DefaultPage skeleton-list></DefaultPage>);
    });
    it('Web Components', () => {
      mount(() => <default-page skeletonList></default-page>);
    });
    afterEach(() =>
      cy
        .get('.vdp-skeleton-list')
        .should('exist')
        .get('.vdp-skeleton-avatar')
        .should('not.exist')
    );
  });
  describe('关闭动画', () => {
    const options = { animation: false };
    it('指令（布尔值）', () => {
      mount(SkeletonRender, getGlobalPlugins([vdpSkeleton, options]));
    });
    it('指令（数组）', () => {
      mount(SkeletonRender, getGlobalPlugins([vdpSkeleton, { animation: [] }]));
    });
    it('指令（对象）', () => {
      mount(
        SkeletonRender,
        getGlobalPlugins([
          vdpSkeleton,
          { animation: { avatar: false, list: false } },
        ])
      );
    });
    it('组件', () => {
      mount(() => <DefaultPage skeleton skeletonProps={options}></DefaultPage>);
    });
    it('Web Components', () => {
      mount(() => (
        <default-page skeleton skeletonProps={options}></default-page>
      ));
    });
    afterEach(() => cy.get('.vdp-skeleton-animation').should('not.exist'));
  });
  describe('动画（头像）', () => {
    const options: VdpSkeleton = { animation: ['avatar'] };
    it('数组', () => {
      mount(SkeletonRender, getGlobalPlugins([vdpSkeleton, options]));
    });
    it('对象', () => {
      mount(
        SkeletonRender,
        getGlobalPlugins([vdpSkeleton, { animation: { avatar: true } }])
      );
    });
    it('组件', () => {
      mount(() => <DefaultPage skeleton skeletonProps={options}></DefaultPage>);
    });
    it('Web Components', () => {
      mount(() => (
        <default-page skeleton skeletonProps={options}></default-page>
      ));
    });
    afterEach(() =>
      cy
        .get('.vdp-skeleton-avatar.vdp-skeleton-animation')
        .should('exist')
        .get('.vdp-skeleton-list li.vdp-skeleton-animation')
        .should('not.exist')
    );
  });
  describe('动画（列表）', () => {
    const options = { animation: { list: true } };
    it('数组', () => {
      mount(
        SkeletonRender,
        getGlobalPlugins([vdpSkeleton, { animation: ['list'] }])
      );
    });
    it('对象', () => {
      mount(SkeletonRender, getGlobalPlugins([vdpSkeleton, options]));
    });
    it('组件', () => {
      mount(() => <DefaultPage skeleton skeletonProps={options}></DefaultPage>);
    });
    it('Web Components', () => {
      mount(() => (
        <default-page skeleton skeletonProps={options}></default-page>
      ));
    });
    afterEach(() =>
      cy
        .get('.vdp-skeleton-list li.vdp-skeleton-animation')
        .should('exist')
        .get('.vdp-skeleton-avatar.vdp-skeleton-animation')
        .should('not.exist')
    );
  });
  describe('修改头像最大尺寸', () => {
    const options = { avatarMaxSize: 20 };
    it('配置项', () => {
      mount(SkeletonRender, getGlobalPlugins([vdpSkeleton, options]));
    });
    it('属性配置项', () => {
      mount(
        () => <div v-skeleton={true} vdp-skeleton-avatar-max-size="20"></div>,
        getGlobalPlugins(vdpSkeleton)
      );
    });
    it('组件', () => {
      mount(() => <DefaultPage skeleton skeletonProps={options}></DefaultPage>);
    });
    it('Web Components', () => {
      mount(() => (
        <default-page skeleton skeletonProps={options}></default-page>
      ));
    });
    afterEach(() =>
      cy
        .get('.vdp-skeleton-avatar')
        .should('have.css', 'max-width', '20px')
        .should('have.css', 'max-height', '20px')
    );
  });
});

describe('error', () => {
  describe('渲染（容器有高度）', () => {
    it('指令（布尔值）', () => {
      mount(ErrorRender, getGlobalPlugins(vdpError));
    });
    it('指令（数组）', () => {
      mount(
        () => <div v-error={[true]} {...attrs}></div>,
        getGlobalPlugins(vdpError)
      );
    });
    it('组件', () => {
      mount(() => <DefaultPage error {...attrs}></DefaultPage>);
    });
    it('Web Components', () => {
      mount(() => <default-page error {...attrs}></default-page>);
    });
    afterEach(() =>
      cy.get('.vdp-picture-icon ellipse').should('have.length', 2)
    );
  });
  describe('渲染（容器无高度）', () => {
    it('指令', () => {
      mount(ErrorMiniRender, getGlobalPlugins(vdpError));
    });
    it('组件', () => {
      mount(() => <DefaultPage error></DefaultPage>);
    });
    it('Web Components', () => {
      mount(() => <default-page error></default-page>);
    });
    afterEach(() => cy.get('.vdp-icon-error-mini rect').should('exist'));
  });
  describe('刷新重试', () => {
    it('指令', () => {
      mount(
        {
          setup() {
            const error = ref(true);
            return () => (
              <div v-error={[[error.value, () => (error.value = false)]]}></div>
            );
          },
        },
        getGlobalPlugins(vdpError)
      );
    });
    it('组件', () => {
      mount({
        setup() {
          const error = ref(true);
          return () => (
            <DefaultPage
              error={[error.value, () => (error.value = false)]}
            ></DefaultPage>
          );
        },
      });
    });
    it('Web Components', () => {
      mount({
        setup() {
          const error = ref(true);
          return () => (
            <default-page
              error={[error.value, () => (error.value = false)]}
            ></default-page>
          );
        },
      });
    });
    afterEach(() =>
      cy
        .contains('Network Error, Click to Refresh')
        .should('exist')
        .get('.vdp-pointer')
        .click()
        .get('.vdp-core')
        .should('not.exist')
    );
  });
  describe('修改刷新文案', () => {
    const options = { refreshText: ', Test' };
    const error: VdpValue<'error'> = [true, () => {}];
    it('指令配置项', () => {
      mount(
        () => <div v-error={[[true, () => {}]]}></div>,
        getGlobalPlugins([vdpError, options])
      );
    });
    it('指令属性配置项', () => {
      mount(
        () => (
          <div
            v-error={error}
            vdp-error-refresh-text={options.refreshText}
          ></div>
        ),
        getGlobalPlugins(vdpError)
      );
    });
    it('组件', () => {
      mount(() => (
        <DefaultPage error={error} errorProps={options}></DefaultPage>
      ));
    });
    it('Web Components', () => {
      mount(() => (
        <default-page error={error} errorProps={options}></default-page>
      ));
    });
    afterEach(() => cy.contains('Network Error, Test').should('exist'));
  });
});

describe('empty', () => {
  describe('渲染（容器有高度）', () => {
    it('指令', () => {
      mount(EmptyRender, getGlobalPlugins(vdpEmpty));
    });
    it('组件', () => {
      mount(() => <DefaultPage empty {...attrs}></DefaultPage>);
    });
    it('Web Components', () => {
      mount(() => <default-page empty {...attrs}></default-page>);
    });
    afterEach(() => cy.get('.vdp-picture-icon path').should('have.length', 11));
  });
  describe('渲染（容器无高度）', () => {
    it('指令', () => {
      mount(EmptyMiniRender, getGlobalPlugins(vdpEmpty));
    });
    it('组件', () => {
      mount(() => <DefaultPage empty></DefaultPage>);
    });
    it('Web Components', () => {
      mount(() => <default-page empty></default-page>);
    });
    afterEach(() =>
      cy
        .contains('No Data')
        .should('exist')
        .get('.vdp-picture-text-icon')
        .should('not.exist')
    );
  });
});

// 公共配置
describe('全局配置中关闭指令', () => {
  it('loading', () => {
    mount(
      LoadingRender,
      getGlobalPlugins([vueDefaultPage, { loading: false }])
    );
  });
  it('skeleton', () => {
    mount(
      SkeletonRender,
      getGlobalPlugins([vueDefaultPage, { skeleton: false }])
    );
  });
  it('skeleton-avatar', () => {
    mount(SkeletonAvatarRender, getGlobalPlugins(vueDefaultPage));
  });
  it('skeleton-list', () => {
    mount(SkeletonListRender, getGlobalPlugins(vueDefaultPage));
  });
  it('error', () => {
    mount(ErrorRender, getGlobalPlugins([vueDefaultPage, { error: false }]));
  });
  it('empty', () => {
    mount(EmptyRender, getGlobalPlugins([vueDefaultPage, { empty: false }]));
  });
  afterEach(() => cy.get('.vdp-core').should('not.exist'));
});

describe('常规配置方式', () => {
  const options = { background: '#000' };
  it('指令（全局）', () => {
    mount(LoadingRender, getGlobalPlugins([vueDefaultPage, options]));
  });
  it('指令（按需）', () => {
    mount(LoadingRender, getGlobalPlugins([vdpLoading, options]));
  });
  it('指令（局部）', () => {
    mount(LoadingRender, {
      global: {
        directives: {
          Loading: createVueDefaultPage('loading', options),
        },
      },
    });
  });
  it('指令（元素属性）', () => {
    mount(
      () => <div v-loading={true} vdp-background={options.background}></div>,
      getGlobalPlugins(vdpLoading)
    );
  });
  it('组件（全局）', () => {
    mount(
      () => <DefaultPage loading></DefaultPage>,
      getGlobalPlugins([DefaultPage, options])
    );
  });
  it('组件（Props）', () => {
    mount(() => <DefaultPage loading {...options}></DefaultPage>);
  });
  it('Web Components（全局）', () => {
    createDefaultPage({
      name: 'default-page-background',
      ...options,
    });
    mount(() => <default-page-background loading></default-page-background>);
  });
  it('Web Components（Props）', () => {
    mount(() => <default-page loading {...options}></default-page>);
  });
  afterEach(() =>
    cy.get('.vdp-core').should('have.css', 'background-color', 'rgb(0, 0, 0)')
  );
});

describe('指定配置方式', () => {
  const zIndex = 200;
  const options = { zIndex: 300 };
  it('指令（全局）', () => {
    mount(
      {
        render() {
          return <div v-loading={this.loading} v-error={true}></div>;
        },
        data() {
          return {
            loading: true,
          };
        },
      },
      getGlobalPlugins([vueDefaultPage, { zIndex, loading: options }])
    ).as('instance');
  });
  it('指令（元素属性）', () => {
    mount(
      {
        render() {
          return (
            <div
              v-loading={this.loading}
              v-error={true}
              vdp-z-index={zIndex}
              vdp-loading-z-index={options.zIndex}
            ></div>
          );
        },
        data() {
          return {
            loading: true,
          };
        },
      },
      getGlobalPlugins(vueDefaultPage)
    ).as('instance');
  });
  it('组件（全局）', () => {
    mount(
      {
        render() {
          return (
            <DefaultPage loading={this.loading} error={true}></DefaultPage>
          );
        },
        data() {
          return {
            loading: true,
          };
        },
      },
      getGlobalPlugins([DefaultPage, { zIndex, loading: options }])
    ).as('instance');
  });
  it('组件（Props）', () => {
    mount({
      render() {
        return (
          <DefaultPage
            loading={this.loading}
            error={true}
            zIndex={zIndex}
            loadingProps={options}
          ></DefaultPage>
        );
      },
      data() {
        return {
          loading: true,
        };
      },
    }).as('instance');
  });
  it('Web Components（全局）', () => {
    createDefaultPage({
      name: 'default-page-z-index',
      zIndex,
      loading: options,
    });
    mount({
      render() {
        return (
          <default-page-z-index
            loading={this.loading}
            error={true}
          ></default-page-z-index>
        );
      },
      data() {
        return {
          loading: true,
        };
      },
    }).as('instance');
  });
  it('Web Components（Props）', () => {
    mount({
      render() {
        return (
          <default-page
            loading={this.loading}
            error={true}
            zIndex={zIndex}
            loadingProps={options}
          ></default-page>
        );
      },
      data() {
        return {
          loading: true,
        };
      },
    }).as('instance');
  });
  afterEach(() =>
    cy
      .get('.vdp-core')
      .should('have.css', 'z-index', '300')
      .get<{ wrapper: VueWrapper }>('@instance')
      .then(({ wrapper }) => wrapper.setData({ loading: false }))
      .get('.vdp-core')
      .should('have.css', 'z-index', '200')
  );
});

describe('修改文案', () => {
  const options = { text: 'Test' };
  it('指令配置项（loading）', () => {
    mount(LoadingRender, getGlobalPlugins([vdpLoading, options]));
  });
  it('指令配置项（error）', () => {
    mount(ErrorRender, getGlobalPlugins([vdpError, options]));
  });
  it('指令配置项（empty）', () => {
    mount(EmptyRender, getGlobalPlugins([vdpEmpty, options]));
  });
  it('指令属性配置项（loading）', () => {
    mount(
      () => <div v-loading={true} vdp-loading-text={options.text}></div>,
      getGlobalPlugins(vdpLoading)
    );
  });
  it('指令属性配置项（error）', () => {
    mount(
      () => <div v-error={true} vdp-error-text={options.text}></div>,
      getGlobalPlugins(vdpError)
    );
  });
  it('指令属性配置项（empty）', () => {
    mount(
      () => <div v-empty={true} vdp-empty-text={options.text}></div>,
      getGlobalPlugins(vdpEmpty)
    );
  });
  it('组件', () => {
    mount(() => <DefaultPage loading loadingProps={options}></DefaultPage>);
  });
  it('Web Components', () => {
    mount(() => <default-page loading loadingProps={options}></default-page>);
  });
  afterEach(() => cy.contains('Test').should('exist'));
});

describe('修改文案颜色', () => {
  const options = { textColor: '#000' };
  it('指令配置项（loading）', () => {
    mount(LoadingRender, getGlobalPlugins([vdpLoading, options]));
  });
  it('指令配置项（error）', () => {
    mount(ErrorRender, getGlobalPlugins([vdpError, options]));
  });
  it('指令配置项（empty）', () => {
    mount(EmptyRender, getGlobalPlugins([vdpEmpty, options]));
  });
  it('指令属性配置项（loading）', () => {
    mount(
      () => (
        <div v-loading={true} vdp-loading-text-color={options.textColor}></div>
      ),
      getGlobalPlugins(vdpLoading)
    );
  });
  it('指令属性配置项（error）', () => {
    mount(
      () => <div v-error={true} vdp-error-text-color={options.textColor}></div>,
      getGlobalPlugins(vdpError)
    );
  });
  it('指令属性配置项（empty）', () => {
    mount(
      () => <div v-empty={true} vdp-empty-text-color={options.textColor}></div>,
      getGlobalPlugins(vdpEmpty)
    );
  });
  it('组件', () => {
    mount(() => <DefaultPage loading loadingProps={options}></DefaultPage>);
  });
  it('Web Components', () => {
    mount(() => <default-page loading loadingProps={options}></default-page>);
  });
  afterEach(() =>
    cy
      .contains(/Loading…|Network Error|No Data/)
      .should('have.css', 'color', 'rgb(0, 0, 0)')
  );
});

const icon = `<svg data-cy="icon" class="vdp-block" style="height: 100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><rect width="160" height="30" fill="#bbb"/><rect x="65" width="30" height="160" fill="#bbb"/></svg>`;

describe('自定义图标', () => {
  const options = { icon };
  it('指令配置项（loading）', () => {
    mount(LoadingRender, getGlobalPlugins([vdpLoading, options]));
  });
  it('指令配置项（error）', () => {
    mount(ErrorRender, getGlobalPlugins([vdpError, options]));
  });
  it('指令配置项（empty）', () => {
    mount(EmptyRender, getGlobalPlugins([vdpEmpty, options]));
  });
  it('指令属性配置项（loading）', () => {
    mount(
      () => (
        <div v-loading={true} vdp-loading-icon={options.icon} {...attrs}></div>
      ),
      getGlobalPlugins(vdpLoading)
    );
  });
  it('指令属性配置项（error）', () => {
    mount(
      () => <div v-error={true} vdp-error-icon={options.icon} {...attrs}></div>,
      getGlobalPlugins(vdpError)
    );
  });
  it('指令属性配置项（empty）', () => {
    mount(
      () => <div v-empty={true} vdp-empty-icon={options.icon} {...attrs}></div>,
      getGlobalPlugins(vdpEmpty)
    );
  });
  // @ts-ignore
  const IconRender = () => <div v-html={icon} slot="loading-icon"></div>;
  it('组件', () => {
    mount(() => (
      <DefaultPage loading {...attrs}>
        {{ 'loading-icon': IconRender }}
      </DefaultPage>
    ));
  });
  it('Web Components', () => {
    mount(() => (
      <default-page loading {...attrs}>
        <IconRender />
      </default-page>
    ));
  });
  afterEach(() =>
    cy
      .get('.vdp-icon-stroke')
      .should('not.exist')
      .get('[data-cy="icon"]')
      .should('exist')
  );
});

describe('自定义小图标', () => {
  describe('布尔值', () => {
    const options = { miniIcon: false };
    it('指令配置项（loading）', () => {
      mount(LoadingMiniRender, getGlobalPlugins([vdpLoading, options]));
    });
    it('指令配置项（error）', () => {
      mount(ErrorMiniRender, getGlobalPlugins([vdpError, options]));
    });
    it('指令配置项（empty）', () => {
      mount(EmptyMiniRender, getGlobalPlugins(vdpEmpty));
    });
    it('组件', () => {
      mount(() => <DefaultPage loading loadingProps={options}></DefaultPage>);
    });
    it('Web Components', () => {
      mount(() => <default-page loading loadingProps={options}></default-page>);
    });
    afterEach(() => cy.get('.vdp-picture-text-icon').should('not.exist'));
  });
  describe('字符串或插槽', () => {
    const options = { miniIcon: icon };
    it('指令配置项（loading）', () => {
      mount(LoadingMiniRender, getGlobalPlugins([vdpLoading, options]));
    });
    it('指令配置项（error）', () => {
      mount(ErrorMiniRender, getGlobalPlugins([vdpError, options]));
    });
    it('指令配置项（empty）', () => {
      mount(EmptyMiniRender, getGlobalPlugins([vdpEmpty, options]));
    });
    it('指令属性配置项（loading）', () => {
      mount(
        () => (
          <div v-loading={true} vdp-loading-mini-icon={options.miniIcon}></div>
        ),
        getGlobalPlugins(vdpLoading)
      );
    });
    it('指令属性配置项（error）', () => {
      mount(
        () => <div v-error={true} vdp-error-mini-icon={options.miniIcon}></div>,
        getGlobalPlugins(vdpError)
      );
    });
    it('指令属性配置项（empty）', () => {
      mount(
        () => <div v-empty={true} vdp-empty-mini-icon={options.miniIcon}></div>,
        getGlobalPlugins(vdpEmpty)
      );
    });
    // @ts-ignore
    const IconRender = () => <div v-html={icon} slot="loading-mini-icon"></div>;
    it('组件', () => {
      mount(() => (
        <DefaultPage loading>{{ 'loading-mini-icon': IconRender }}</DefaultPage>
      ));
    });
    it('Web Components', () => {
      mount(() => (
        <default-page loading>
          <IconRender />
        </default-page>
      ));
    });
    afterEach(() =>
      cy
        .get('.vdp-icon-stroke')
        .should('not.exist')
        .get('[data-cy="icon"]')
        .should('exist')
    );
  });
});

describe('修改图标最大尺寸', () => {
  const options = { iconMaxSize: 30 };
  it('指令配置项（loading）', () => {
    mount(LoadingRender, getGlobalPlugins([vdpLoading, options]));
  });
  it('指令配置项（error）', () => {
    mount(ErrorRender, getGlobalPlugins([vdpError, options]));
  });
  it('指令配置项（empty）', () => {
    mount(EmptyRender, getGlobalPlugins([vdpEmpty, options]));
  });
  it('指令属性配置项（loading）', () => {
    mount(
      () => (
        <div
          v-loading={true}
          vdp-loading-icon-max-size={options.iconMaxSize}
          {...attrs}
        ></div>
      ),
      getGlobalPlugins(vdpLoading)
    );
  });
  it('指令属性配置项（error）', () => {
    mount(
      () => (
        <div
          v-error={true}
          vdp-error-icon-max-size={options.iconMaxSize}
          {...attrs}
        ></div>
      ),
      getGlobalPlugins(vdpError)
    );
  });
  it('指令属性配置项（empty）', () => {
    mount(
      () => (
        <div
          v-empty={true}
          vdp-empty-icon-max-size={options.iconMaxSize}
          {...attrs}
        ></div>
      ),
      getGlobalPlugins(vdpEmpty)
    );
  });
  it('组件', () => {
    mount(() => (
      <DefaultPage loading loadingProps={options} {...attrs}></DefaultPage>
    ));
  });
  it('Web Components', () => {
    mount(() => (
      <default-page loading loadingProps={options} {...attrs}></default-page>
    ));
  });
  afterEach(() =>
    cy.get('.vdp-picture-icon').should('have.css', 'max-height', '30px')
  );
});

describe('禁用大图标文案', () => {
  const options = { iconShowText: false };
  it('指令配置项（loading）', () => {
    mount(LoadingRender, getGlobalPlugins([vdpLoading, options]));
  });
  it('指令配置项（error）', () => {
    mount(ErrorRender, getGlobalPlugins([vdpError, options]));
  });
  it('指令配置项（empty）', () => {
    mount(EmptyRender, getGlobalPlugins([vdpEmpty, options]));
  });
  it('组件', () => {
    mount(() => (
      <DefaultPage loading loadingProps={options} {...attrs}></DefaultPage>
    ));
  });
  it('Web Components', () => {
    mount(() => (
      <default-page loading loadingProps={options} {...attrs}></default-page>
    ));
  });
  afterEach(() =>
    cy.contains(/Loading…|Network Error|No Data/).should('not.exist')
  );
});
