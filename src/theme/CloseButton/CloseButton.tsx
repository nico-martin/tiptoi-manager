import React from 'react';

import cn from '@utils/classnames';

import styles from './CloseButton.module.css';

const CloseButton: React.FC<{
  className?: string;
  onClick: Function;
}> = ({ className = '', onClick }) => (
  <button className={cn(styles.root, className)} onClick={() => onClick()}>
    close
  </button>
);

export default CloseButton;
