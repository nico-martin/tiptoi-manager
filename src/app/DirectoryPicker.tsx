import { Button, Notification } from '@theme';
import React from 'react';
import { useIntl } from 'react-intl';

import { useDirHandle } from '@app/FilesContext';

import { getDirectoryEntries, getDirectoryHandle } from '@utils/fileSystem';

import styles from './DirectoryPicker.module.css';

const DirectoryPicker: React.FC = () => {
  const [, setDirHandle] = useDirHandle();
  const { formatMessage } = useIntl();
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
                    setError(
                      formatMessage({ id: 'directory.picker.error.dir' })
                    );
                  } else {
                    setDirHandle(handle);
                  }
                }
              );
            })
            .catch((e) => {
              setError(formatMessage({ id: '_error' }));
              console.error(e);
            })
            .finally(() => setPending(false));
        }}
        disabled={pendig}
      >
        {formatMessage({ id: 'directory.picker.connect' })}
      </Button>
    </div>
  );
};

export default DirectoryPicker;
