import { Badge, Button, PortalBox, ProgressBar } from '@theme';
import React from 'react';
import { useIntl } from 'react-intl';

import cn from '@utils/classnames.ts';
import { formatBytes } from '@utils/functions.ts';

import { useGmeFileStore, usePersistedSpace } from '../StorageContext.tsx';
import styles from './AvailableSpace.module.css';

const AvailableSpace: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const { usedSpace, totalSpace, persisted, persist } = usePersistedSpace();
  const [modal, setModal] = React.useState<boolean>(false);
  const { formatMessage } = useIntl();
  const percentage = (100 - (usedSpace / totalSpace) * 100).toFixed(2);
  const { fileKeys } = useGmeFileStore();

  return (
    <div className={cn(className, styles.root)}>
      {modal && (
        <PortalBox
          title={formatMessage({ id: 'storage.title' })}
          close={() => setModal(false)}
          size="small"
        >
          <p className={styles.status}>
            {formatMessage(
              { id: 'storage.status' },
              {
                status: (
                  <React.Fragment>
                    <Badge
                      type={persisted ? 'success' : 'error'}
                      text={persisted ? 'Persisted' : 'not persisted'}
                    />
                    {!persisted && (
                      <span>
                        (
                        <Button
                          layout="ghost"
                          onClick={() => persist()}
                          color="black"
                        >
                          {formatMessage({ id: 'storage.persist' })}
                        </Button>
                        )
                      </span>
                    )}
                  </React.Fragment>
                ),
              }
            )}
          </p>
          <div className={styles.progressBarContainer}>
            <ProgressBar
              progress={(usedSpace / totalSpace) * 100}
              tooltip={formatMessage(
                { id: 'storage.available' },
                {
                  absolute: formatBytes(totalSpace - usedSpace),
                  relative: `${percentage}%`,
                }
              )}
            />
            <p className={styles.progressBarText}>
              {fileKeys.length === 1
                ? formatMessage(
                    { id: 'storage.filesSaved' },
                    { filesCount: fileKeys.length }
                  )
                : formatMessage(
                    { id: 'storage.filesSaved.plural' },
                    { filesCount: fileKeys.length }
                  )}
            </p>
          </div>
        </PortalBox>
      )}
      <Button
        icon={persisted ? null : 'alert-outline'}
        iconRight
        color="black"
        layout="ghost"
        onClick={() => setModal(true)}
        className={styles.button}
      >
        {formatMessage(
          { id: 'storage.available' },
          {
            absolute: formatBytes(totalSpace - usedSpace),
            relative: `${percentage}%`,
          }
        )}
      </Button>
    </div>
  );
};

export default AvailableSpace;
