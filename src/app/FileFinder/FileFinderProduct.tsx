import {
  Button,
  /* Tooltip*/
} from '@theme';
import React from 'react';

import FileFinderInstall from '@app/FileFinder/FileFinderInstall.tsx';
import {
  /*useDirHandle,*/
  usePenFiles,
} from '@app/FilesContext.tsx';
import { ProductI } from '@app/catalog/types.ts';

import cn from '@utils/classnames.ts';

import styles from './FileFinderProduct.module.css';

const FileFinderProduct: React.FC<{
  className?: string;
  product: ProductI;
}> = ({ className = '', product }) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const { files } = usePenFiles();

  const gameFile = React.useMemo(
    () => (product.gameFiles.length >= 1 ? product.gameFiles[0] : null),
    [product.gameFiles]
  );

  const alreadyInstalled = React.useMemo<boolean>(() => {
    if (!gameFile) {
      return false;
    }
    const parts = gameFile.url.split('/');
    const gameFileName = parts[parts.length - 1];
    const installedFiles = files.reduce(
      (acc, file) => [...acc, encodeURI(file.name)],
      []
    );
    return installedFiles.indexOf(gameFileName) !== -1;
  }, [gameFile, files]);

  return (
    <div className={cn(className, styles.root)}>
      {product.images.length !== 0 && (
        <img
          className={styles.img}
          src={product.images[product.images.length - 1].url}
          alt={product.name}
          loading="lazy"
        />
      )}
      {showModal && (
        <FileFinderInstall
          onClose={() => setShowModal(false)}
          product={product}
        />
      )}
      <p className={styles.title}>{product.name}</p>

      {gameFile && (
        <Button
          className={styles.download}
          icon="download"
          size="small"
          onClick={() => setShowModal(true)}
          disabled={alreadyInstalled}
        >
          {alreadyInstalled ? 'Installed' : 'Download'}
        </Button>
      )}
    </div>
  );
};

export default FileFinderProduct;
