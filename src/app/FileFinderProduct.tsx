import React from 'react';
import { Button } from '@theme';
import cn from '@utils/classnames';
import FileFinderInstall from '@app/FileFinderInstall';
import { usePenFiles } from '@app/FilesContext';
import { ProductI } from '@app/database';
import styles from './FileFinderProduct.css';

const FileFinderProduct = ({
  className = '',
  product,
}: {
  className?: string;
  product: ProductI;
}) => {
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
          icon="mdi/download"
          size="small"
          onClick={() => setShowModal(true)}
          className={styles.download}
          disabled={alreadyInstalled}
        >
          {alreadyInstalled ? 'Installed' : 'Download'}
        </Button>
      )}
    </div>
  );
};

export default FileFinderProduct;
