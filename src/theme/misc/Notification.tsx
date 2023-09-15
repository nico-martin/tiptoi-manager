import React from 'react';

import cn from '@utils/classnames';

import styles from './Notification.module.css';

const Notification: React.FC<{
  className?: string;
  type?: 'message' | 'success' | 'error';
  children: any;
}> = ({ className = '', type = 'message', children }) => (
  <div className={cn(className, styles.root, styles[`type-${type}`])}>
    <p className={styles.text}>{children}</p>
  </div>
);

export default Notification;
