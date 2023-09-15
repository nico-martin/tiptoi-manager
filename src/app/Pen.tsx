import React from 'react';

import DirectoryPicker from '@app/DirectoryPicker';
import { useDirHandle, usePenFiles } from '@app/FilesContext';
import PenFile from '@app/PenFile';

import cn from '@utils/classnames';

import styles from './Pen.module.css';

const Pen: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { files, reloadFiles } = usePenFiles();
  const [dirHandle] = useDirHandle();

  React.useEffect(() => {
    reloadFiles();
  }, []);

  return (
    <div className={cn(className, styles.root)}>
      {dirHandle ? (
        <React.Fragment>
          {' '}
          <h2>Audio Files on your pen:</h2>
          <ul className={styles.list}>
            {files.map((file, i) => (
              <li className={styles.file} key={i}>
                <PenFile file={file} />
              </li>
            ))}
          </ul>
        </React.Fragment>
      ) : (
        <DirectoryPicker />
      )}
    </div>
  );
};

export default Pen;
