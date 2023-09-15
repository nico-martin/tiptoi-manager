import React from 'react';

import { usePenFiles } from '@app/FilesContext';
import PenFile from '@app/PenFile';

import cn from '@utils/classnames';

import styles from './Pen.module.css';

const Pen: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { files, reloadFiles } = usePenFiles();

  React.useEffect(() => {
    reloadFiles();
  }, []);

  return (
    <div className={cn(className, styles.root)}>
      <h2>Audio Files on your pen:</h2>
      <ul className={styles.list}>
        {files.map((file) => (
          <li className={styles.file}>
            <PenFile file={file} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pen;
