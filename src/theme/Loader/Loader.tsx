import React from 'react';
import cn from '@utils/classnames';
import styles from './Loader.css';

const Loader = ({ className = '' }: { className?: string }) => (
  <svg
    className={cn(styles.root, className)}
    viewBox="0 0 40 40"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="15" />
  </svg>
);

export default Loader;
