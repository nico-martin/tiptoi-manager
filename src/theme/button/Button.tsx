import React from 'react';

import cn from '@utils/classnames';
import { Loader, Icon } from '../index';

import './Button.css';

const Button = ({
  children = '',
  className = '',
  onClick = () => {},
  layout = 'solid',
  icon = '',
  iconRight = false,
  size = 'medium',
  loading = false,
  disabled = false,
  color = 'orange',
  fontWeight = 'bold',
  ...props
}: {
  children?: React.JSX.Element | React.JSX.Element[] | string;
  className?: string;
  onClick?: Function;
  layout?: 'solid';
  icon?: string;
  iconRight?: boolean;
  size?: 'medium' | 'small' | 'large';
  loading?: boolean;
  disabled?: boolean;
  color?: 'black' | 'orange';
  fontWeight?: 'normal' | 'bold';
  [key: string]: any;
}) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        className,
        'button',
        `button--type-${layout}`,
        `button--size-${size}`,
        `button--color-${color}`,
        `button--fontWeight-${fontWeight}`,
        {
          'button--loading': loading,
          'button--disabled': disabled,
          'button--notext': children === '',
          [`button--has-icon-${iconRight ? 'right' : 'left'}`]: icon !== '',
        }
      )}
      onClick={() => onClick()}
    >
      <div className="button__bkg" />
      <Loader className="button__loader" />
      {icon !== '' && !iconRight && (
        <Icon className="button__icon button__icon--left" icon={icon} />
      )}
      <span className="button__content">{children}</span>
      {icon !== '' && iconRight && (
        <Icon className="button__icon button__icon--right" icon={icon} />
      )}
    </button>
  );
};

export default Button;
