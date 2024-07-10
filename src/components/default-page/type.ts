import type {
  DirectiveOptions,
  CamelName,
  PublicProps,
  CoreProps,
} from '../core/type';
import DefaultPage from './DefaultPage.ce.vue';

export type InitProps = {
  [N in CamelName]?: DirectiveOptions<N>;
} & PublicProps;

export type OmitKeys = 'icon' | 'miniIcon';
type PropsKey = `${'loading' | 'error' | 'empty'}Props`;
type OmitIcon = {
  [K in PropsKey]?: Omit<NonNullable<CoreProps[K]>, OmitKeys> & {
    miniIcon?: boolean;
  };
};
export interface DefaultPageProps extends Omit<CoreProps, PropsKey>, OmitIcon {
  initProps?: InitProps;
}

export interface DefaultPageOptions extends InitProps {
  /**
   * Component name
   */
  name?: string;
}

export type DefaultPageType = typeof DefaultPage;
