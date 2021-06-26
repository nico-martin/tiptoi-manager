import React from 'react';
import cn from '@utils/classnames';
import styles from './ButtonGroup.css';

const ButtonGroup = ({
  children,
  className = '',
  align = 'right',
}: {
  children: any;
  className?: string;
  align?: 'center' | 'left' | 'right';
}) => (
  <div className={cn(className, styles.root, styles[`align-${align}`])}>
    {children}
  </div>
);

export default ButtonGroup;
