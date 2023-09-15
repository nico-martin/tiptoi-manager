import { Button, Tooltip } from '@theme';
import React from 'react';

import FileFinderInstall from '@app/FileFinderInstall';
import { useDirHandle, usePenFiles } from '@app/FilesContext';
import { ProductI } from '@app/database';

import cn from '@utils/classnames';

import styles from './FileFinderProduct.module.css';

const FileFinderProduct: React.FC<{
  className?: string;
  product: ProductI;
}> = ({ className = '', product }) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const { files } = usePenFiles();
  const [dirHandle] = useDirHandle();
  const tooltipRef = React.useRef<HTMLSpanElement>(null);

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
      {!dirHandle && (
        <Tooltip tooltipRef={tooltipRef} maxWidth={200}>
          Please connect your pen to download files.
        </Tooltip>
      )}
      {gameFile && (
        <span ref={tooltipRef} className={styles.download}>
          <Button
            icon="download"
            size="small"
            onClick={() => setShowModal(true)}
            disabled={alreadyInstalled || !dirHandle}
          >
            {alreadyInstalled ? 'Installed' : 'Download'}
          </Button>
        </span>
      )}
    </div>
  );
};

export default FileFinderProduct;
