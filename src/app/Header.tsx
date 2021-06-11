import React from 'react';
import cn from '@utils/classnames';
import { appTitle } from '@utils/constants';

import './Header.css';

const Header = ({ className = '' }: { className?: string }) => (
  <header className={cn(className, 'header')}>
    <h1 className="header__title">{appTitle}</h1>
  </header>
);

export default Header;
