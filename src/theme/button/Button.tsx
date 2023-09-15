import React from 'react';

import cn from '@utils/classnames';

import { Icon, IconType, Loader } from '../index';
import styles from './Button.module.css';

const Button: React.FC<{
  children?: React.JSX.Element | React.JSX.Element[] | string;
  className?: string;
  onClick?: Function;
  layout?: 'solid';
  icon?: IconType;
  iconRight?: boolean;
  size?: 'medium' | 'small' | 'large';
  loading?: boolean;
  disabled?: boolean;
  color?: 'black' | 'orange';
  fontWeight?: 'normal' | 'bold';
  [key: string]: any;
}> = ({
  children = '',
  className = '',
  onClick = () => {},
  layout = 'solid',
  icon = null,
  iconRight = false,
  size = 'medium',
  loading = false,
  disabled = false,
  color = 'orange',
  fontWeight = 'bold',
  ...props
}) => (
  <button
    {...props}
    disabled={disabled}
    className={cn(
      className,
      styles.root,
      styles[`size-${size}`],
      styles[`color-${color}`],
      styles[`fontWeight-${fontWeight}`],
      {
        [styles.isLoading]: loading,
        [styles.isDisabled]: disabled,
        [styles.hasNnotext]: children === '',
        [styles[`hasIcon-${iconRight ? 'right' : 'left'}`]]: Boolean(icon),
      }
    )}
    onClick={() => onClick()}
  >
    <div className={styles.bkg} />
    <Loader className={styles.loader} />
    {Boolean(icon) && !iconRight && (
      <Icon className={cn(styles.icon, styles[`icon-left`])} icon={icon} />
    )}
    <span className={styles.content}>{children}</span>
    {Boolean(icon) && iconRight && (
      <Icon className={cn(styles.icon, styles[`icon-right`])} icon={icon} />
    )}
  </button>
);

export default Button;
