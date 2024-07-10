import type { DirectiveBinding } from 'vue';
import { INSTANCE_KEY } from '../../utils';
import type { PictureBaseProps } from '../picture/type';
import type { SkeletonBaseProps } from '../skeleton/type';

export interface PublicProps {
  /**
   * The stack level of the directive
   */
  zIndex?: number | string;
  /**
   * Background color of the mask
   */
  background?: string;
}

export type PublicPropsKeys = keyof PublicProps;

export interface VdpEmpty extends PictureBaseProps, PublicProps {
  /**
   * Text
   */
  text?: string;
}
export interface VdpLoading extends VdpEmpty {
  /**
   * Icon color (Disable when custom icon)
   */
  iconColor?: string;
  /**
   * Mini icon color (Disable when custom mini icon)
   */
  miniIconColor?: string;
}
export interface VdpError extends VdpEmpty {
  /**
   * Refresh text (Enable when refresh function is passed)
   */
  refreshText?: boolean | string;
}

export type VdpSkeleton = SkeletonBaseProps & PublicProps;

export interface VdpSkeletonList extends PublicProps {
  /**
   * Animation
   */
  animation?: boolean;
}
export type VdpSkeletonAvatar = Pick<VdpSkeleton, 'avatarMaxSize'> &
  VdpSkeletonList;

export interface CoreProps extends PublicProps {
  loading?: boolean;
  skeleton?: boolean;
  skeletonAvatar?: boolean;
  skeletonList?: boolean;
  error?: boolean | [boolean, (() => void)?];
  empty?: boolean;
  loadingProps?: VdpLoading;
  errorProps?: VdpError;
  emptyProps?: VdpEmpty;
  skeletonProps?: VdpSkeleton;
  skeletonListProps?: VdpSkeletonList;
  skeletonAvatarProps?: VdpSkeletonAvatar;
}

export type Name =
  | 'loading'
  | 'skeleton'
  | 'skeleton-avatar'
  | 'skeletonAvatar'
  | 'skeleton-list'
  | 'skeletonList'
  | 'error'
  | 'empty';

export type DirectiveOptions<T extends Name> = NonNullable<
  CoreProps[`${CamelName<T>}Props`]
>;

export type VdpValue<T extends Name> = NonNullable<CoreProps[CamelName<T>]>;

export type CamelName<T = Name> = T extends `${infer P}-${infer S}`
  ? `${P}${Capitalize<S>}`
  : T;

export type VueDefaultPage = {
  [N in CamelName]?:
    | (DirectiveOptions<N> & {
        /**
         * Enable the directive (Enable when Global Configuration)
         */
        enable?: boolean;
      })
    | boolean;
} & PublicProps;

export type TargetProps = {
  [K in keyof CoreProps]?: K extends `${CamelName}Props`
    ? Omit<NonNullable<CoreProps[K]>, PublicPropsKeys>
    : CoreProps[K];
};

export interface VdpEl extends HTMLElement {
  [INSTANCE_KEY]?: {
    props: CoreProps;
    unmount(): void;
  };
}

export interface InstanceOptions<T extends Name> {
  name: T;
  options?: DirectiveOptions<T>;
  el: VdpEl;
  binding: DirectiveBinding<VdpValue<T>>;
}
