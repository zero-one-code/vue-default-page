export interface PictureBaseProps {
  /**
   * Custom icon
   */
  icon?: string;
  /**
   * Maximum size of icon
   */
  iconMaxSize?: number | string;
  /**
   * Whether to show text when using large icon
   */
  iconShowText?: boolean;
  /**
   * Custom mini icon
   */
  miniIcon?: boolean | string;
  /**
   * Text color
   */
  textColor?: string;
}

export interface PictureProps extends PictureBaseProps {}
