import React from 'react';

import cn from '@utils/classnames.ts';

import styles from './Badge.module.css';

const Badge: React.FC<{
  className?: string;
  text: string;
  type?: 'message' | 'success' | 'error';
}> = ({ className, text, type }) => {
  return (
    <span
      className={cn(className, styles.root, {
        [styles.success]: type === 'success',
        [styles.error]: type === 'error',
      })}
    >
      {text}
    </span>
  );
};

export default Badge;
