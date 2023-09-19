import React from 'react';
import { useIntl } from 'react-intl';

import DirectoryPicker from '@app/DirectoryPicker.tsx';
import { useDirHandle, usePenFiles } from '@app/FilesContext.tsx';
import PenFile from '@app/Pen/PenFile.tsx';

import cn from '@utils/classnames.ts';

import styles from './Pen.module.css';

const Pen: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { files, reloadFiles } = usePenFiles();
  const [dirHandle] = useDirHandle();

  const { formatMessage } = useIntl();

  React.useEffect(() => {
    reloadFiles();
  }, [dirHandle]);

  return (
    <div className={cn(className, styles.root)}>
      {dirHandle ? (
        <React.Fragment>
          <h2>{formatMessage({ id: 'pen.title' })}</h2>
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
