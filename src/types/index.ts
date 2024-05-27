import { INSTANCE_KEY } from 'src/utils';

import type {
  EmptyProps,
  ErrorProps,
  LoadingProps,
  Props,
} from '../components/index.vue';
import type {
  SkeletonAvatarProps,
  SkeletonListProps,
  SkeletonProps,
} from '../components/skeleton.vue';

export type Name =
  | 'loading'
  | 'skeleton'
  | 'skeleton-avatar'
  | 'skeletonAvatar'
  | 'skeleton-list'
  | 'skeletonList'
  | 'error'
  | 'empty';

export type CamelName = Exclude<Name, 'skeleton-avatar' | 'skeleton-list'>;

export type Value<T extends Name> = T extends 'error'
  ? boolean | [boolean, (() => void)?]
  : boolean;

export type PublicOptions = Pick<Props, 'zIndex' | 'background'>;

export type DirectiveOptions<T extends Name> = (T extends 'loading'
  ? LoadingProps
  : T extends 'skeleton'
    ? SkeletonProps
    : T extends 'skeleton-list' | 'skeletonList'
      ? SkeletonListProps
      : T extends 'skeleton-avatar' | 'skeletonAvatar'
        ? SkeletonAvatarProps
        : T extends 'error'
          ? ErrorProps
          : T extends 'empty'
            ? EmptyProps
            : never) &
  PublicOptions;

export type Options = {
  [N in CamelName]?: (DirectiveOptions<N> & { enable?: boolean }) | boolean;
} & PublicOptions;

export interface El extends HTMLElement {
  [INSTANCE_KEY]?: {
    props: Props;
    unmount(): void;
  };
}
