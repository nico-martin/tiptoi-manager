import { Button, ButtonGroup, ContentModal } from '@theme';
import React from 'react';
import { useIntl } from 'react-intl';

import { useDirHandle, usePenFiles } from '@app/FilesContext.tsx';
import { useCatalog } from '@app/catalog/CatalogContext.tsx';
import { ProductI } from '@app/catalog/types.ts';

import cn from '@utils/classnames.ts';
import { deleteFile } from '@utils/fileSystem.ts';

import styles from './PenFile.module.css';

const PenFiles: React.FC<{
  className?: string;
  file: FileSystemFileHandle;
}> = ({ className = '', file }) => {
  const [dirHandle] = useDirHandle();
  const { reloadFiles } = usePenFiles();
  const { gmeFilesIndices, products } = useCatalog();
  const product: ProductI = products[gmeFilesIndices[file.name]] || null;
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);
  const [deletePending, setDeletePending] = React.useState<boolean>(false);
  const { formatMessage } = useIntl();
  return (
    <div className={cn(className, styles.root)}>
      {deleteModal && (
        <ContentModal
          title={formatMessage({ id: 'pen.file.delete' })}
          onClose={() => setDeleteModal(false)}
          full={false}
        >
          <div className={styles.deleteDesc}>
            <p>{formatMessage({ id: 'pen.file.delete.confirm' })}</p>
            <p>{file.name}</p>
          </div>
          <ButtonGroup align="center">
            <Button
              loading={deletePending}
              onClick={() => {
                setDeletePending(true);
                deleteFile(dirHandle, file.name).then(() => {
                  setDeletePending(false);
                  reloadFiles();
                  setDeleteModal(false);
                });
              }}
            >
              {formatMessage({ id: 'pen.file.delete.confirmed' })}
            </Button>
          </ButtonGroup>
        </ContentModal>
      )}
      {product?.name || file.name.replace('.gme', '')}
      <button onClick={() => setDeleteModal(true)} className={styles.delete}>
        {formatMessage({ id: 'pen.file.delete.action' })}
      </button>
    </div>
  );
};

export default PenFiles;
