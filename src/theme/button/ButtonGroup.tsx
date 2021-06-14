import React from 'react';

import cn from '@utils/classnames';

import './ButtonGroup.css';

const ButtonGroup = ({
  children,
  className = '',
  align = 'right',
}: {
  children: any;
  className?: string;
  align?: 'center' | 'left' | 'right';
}) => (
  <div
    className={cn(className, 'button-group', `button-group--align-${align}`)}
  >
    {children}
  </div>
);

export default ButtonGroup;
