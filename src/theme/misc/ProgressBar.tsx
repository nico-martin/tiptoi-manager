import React from 'react';

import cn from '@utils/classnames.ts';

import { Tooltip } from '../index.ts';
import styles from './ProgressBar.module.css';

const ProgressBar: React.FC<{
  className?: string;
  full?: number;
  progress: number;
  tooltip?: string;
}> = ({ className = '', full = 100, progress, tooltip = '' }) => {
  const relative = (100 / full) * progress;
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  return (
    <React.Fragment>
      {Boolean(tooltip) && <Tooltip tooltipRef={tooltipRef}>{tooltip}</Tooltip>}
      <div className={cn(className, styles.root)} ref={tooltipRef}>
        <div className={styles.progress} style={{ width: `${relative}%` }} />
      </div>
    </React.Fragment>
  );
};

export default ProgressBar;
