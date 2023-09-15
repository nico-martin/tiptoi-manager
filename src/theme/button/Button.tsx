import React from 'react';

import cn from '@utils/classnames';

import { Icon, IconType, Loader } from '../index';
import styles from './Button.module.css';

const Button: React.FC<{
  children?: React.JSX.Element | React.JSX.Element[] | string;
  className?: string;
  onClick?: Function;
  layout?: 'solid' | 'ghost';
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
    className={cn(className, styles.root, {
      [styles.sizeSmall]: size === 'small',
      [styles.sizeLarge]: size === 'large',
      [styles.colorBlack]: color === 'black',
      [styles.isLoading]: loading,
      [styles.isDisabled]: disabled,
      [styles.layoutGhost]: layout === 'ghost',
    })}
    onClick={() => onClick()}
  >
    <div className={styles.bkg} />
    <Loader className={styles.loader} />
    {Boolean(icon) && !iconRight && (
      <Icon className={cn(styles.icon, styles.iconLeft)} icon={icon} />
    )}
    {Boolean(children) && <span className={styles.content}>{children}</span>}
    {Boolean(icon) && iconRight && (
      <Icon className={cn(styles.icon, styles.iconRight)} icon={icon} />
    )}
  </button>
);

export default Button;
