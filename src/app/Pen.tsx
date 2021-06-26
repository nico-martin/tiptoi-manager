import React from 'react';
import cn from '@utils/classnames';
import { usePenFiles } from '@app/FilesContext';
import PenFile from '@app/PenFile';
import styles from './Pen.css';

const Pen = ({ className = '' }: { className?: string }) => {
  const { files, reloadFiles } = usePenFiles();

  React.useEffect(() => {
    reloadFiles();
  }, []);

  return (
    <div className={cn(className, styles.root)}>
      <h2>Audio Files on your pen:</h2>
      <ul className={styles.list}>
        {files.map(file => (
          <li className={styles.file}>
            <PenFile file={file} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pen;
