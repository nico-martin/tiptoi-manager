import React from 'react';
import cn from '@utils/classnames';
import styles from './Icon.css';
import SVG from './SVG';

const Icon = ({
  icon,
  className = '',
  round = false,
  circle = false,
  ...props
}: {
  icon: string;
  className?: string;
  round?: boolean;
  circle?: boolean;
  [key: string]: any;
}) => {
  return (
    <SVG
      className={cn(className, styles.root, {
        [styles.isRound]: round,
        [styles.isCircle]: circle,
      })}
      path={`icon/${icon}.svg`}
      {...props}
    />
  );
};

export default Icon;
