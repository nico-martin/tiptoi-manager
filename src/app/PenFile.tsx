import { Button, ButtonGroup, ContentModal } from '@theme';
import React from 'react';

import { useDirHandle, usePenFiles } from '@app/FilesContext';
import { ProductI, gmeFilesIndices, products } from '@app/database';

import cn from '@utils/classnames';
import { deleteFile } from '@utils/fileSystem';

import styles from './PenFile.module.css';

const PenFiles: React.FC<{
  className?: string;
  file: FileSystemFileHandle;
}> = ({ className = '', file }) => {
  const [dirHandle] = useDirHandle();
  const { reloadFiles } = usePenFiles();
  const product: ProductI = products[gmeFilesIndices[file.name]] || null;
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);
  const [deletePending, setDeletePending] = React.useState<boolean>(false);

  return (
    <div className={cn(className, styles.root)}>
      {deleteModal && (
        <ContentModal
          title="Delete file"
          onClose={() => setDeleteModal(false)}
          full={false}
        >
          <div className={styles.deleteDesc}>
            <p>Are you sure you want to delete the following file?</p>
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
              Yes, delete file
            </Button>
          </ButtonGroup>
        </ContentModal>
      )}
      {product?.name || file.name.replace('.gme', '')}
      <button onClick={() => setDeleteModal(true)} className={styles.delete}>
        delete
      </button>
    </div>
  );
};

export default PenFiles;
