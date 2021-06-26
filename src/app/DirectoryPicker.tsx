import React from 'react';
import { Button, Notification } from '@theme';
import { getDirectoryEntries, getDirectoryHandle } from '@utils/fileSystem';
import { useDirHandle, usePenFiles } from '@app/FilesContext';
import styles from './DirectoryPicker.css';

const DirectoryPicker = () => {
  const [dirHandle, setDirHandle] = useDirHandle();

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
        size="large"
        icon="mdi/pen"
        onClick={() => {
          setError('');
          getDirectoryHandle()
            .then(handle => {
              Promise.all([handle, getDirectoryEntries(handle)]).then(
                ([handle, entries]) => {
                  const icoFile = entries.find(
                    entry =>
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
            .catch(e => {
              setError('An unexpected error occured');
              console.error(e);
            });
        }}
        disabled={pendig}
      >
        select pen
      </Button>
      <div className={styles.description}>
        <p>
          Please connect your Tiptoi pen to your computer using the supplied USB
          cable first.
        </p>
        <p>Then you can select the pen using the button above.</p>
      </div>
    </div>
  );
};

export default DirectoryPicker;
