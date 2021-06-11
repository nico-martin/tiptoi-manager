import React from 'react';

import cn from '@utils/classNames';

const Pen = ({ className = '' }: { className?: string }) => {
  return <div className={cn(className, 'pen')}>Pen</div>;
};

export default Pen;
