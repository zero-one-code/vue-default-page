export interface Animation {
  /**
   * Enable avatar animation
   */
  avatar?: boolean;
  /**
   * Enable list animation
   */
  list?: boolean;
}

export interface SkeletonBaseProps {
  /**
   * Maximum size of avatar
   */
  avatarMaxSize?: number | string;
  /**
   * Animation
   */
  animation?: boolean | (keyof Animation)[] | Animation;
}

export interface SkeletonProps extends SkeletonBaseProps {
  disabledAvatar?: boolean;
  disabledList?: boolean;
}
