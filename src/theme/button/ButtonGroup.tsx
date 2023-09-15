import React from 'react';

import cn from '@utils/classnames';

import styles from './ButtonGroup.module.css';

const ButtonGroup: React.FC<{
  children: any;
  className?: string;
  align?: 'center' | 'left' | 'right';
}> = ({ children, className = '', align = 'right' }) => (
  <div className={cn(className, styles.root, styles[`align-${align}`])}>
    {children}
  </div>
);

export default ButtonGroup;
