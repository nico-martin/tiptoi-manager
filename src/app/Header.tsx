import React from 'react';
import cn from '@utils/classnames';
import { appTitle } from '@utils/constants';
import styles from './Header.css';

const Header = ({ className = '' }: { className?: string }) => (
  <header className={cn(className, styles.root)}>
    <h1 className={styles.title}>{appTitle}</h1>
  </header>
);

export default Header;
