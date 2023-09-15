import { Button, Notification } from '@theme';
import React from 'react';

import { useDirHandle } from '@app/FilesContext';

import { getDirectoryEntries, getDirectoryHandle } from '@utils/fileSystem';

import styles from './DirectoryPicker.module.css';

const DirectoryPicker: React.FC = () => {
  const [, setDirHandle] = useDirHandle();

  const [pendig, setPending] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  return (
    <div className={styles.root}>
      {error && (
        <Notification type="error" className={styles.error}>
          {error}
        </Notification>
      )}
      <Button
        icon="pen"
        onClick={() => {
          setError('');
          setPending(true);
          getDirectoryHandle()
            .then((handle) => {
              Promise.all([handle, getDirectoryEntries(handle)]).then(
                ([handle, entries]) => {
                  const icoFile = entries.find(
                    (entry) =>
                      entry.kind === 'file' && entry.name === 'tiptoi.ico'
                  );

                  if (!icoFile) {
                    setError('The selected directory is not a Tiptoi pen.');
                  } else {
                    setDirHandle(handle);
                  }
                }
              );
            })
            .catch((e) => {
              setError('An unexpected error occured');
              console.error(e);
            })
            .finally(() => setPending(false));
        }}
        disabled={pendig}
      >
        connect pen
      </Button>
    </div>
  );
};

export default DirectoryPicker;
