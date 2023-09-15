import React from 'react';

import cn from '@utils/classnames';
import { appTitle } from '@utils/constants';

import styles from './Header.module.css';
import HeaderNav from './HeaderNav.tsx';

const Header: React.FC<{ className?: string }> = ({ className = '' }) => (
  <header className={cn(className, styles.root)}>
    <h1 className={styles.title}>{appTitle}</h1>
    <HeaderNav />
  </header>
);

export default Header;
