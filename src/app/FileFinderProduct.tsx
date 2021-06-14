import React from 'react';

import cn from '@utils/classnames';
import { ProductI } from '@app/database';
import { Button } from '@theme';
import FileFinderInstall from '@app/FileFinderInstall';

import './FileFinderProduct.css';
import { usePenFiles } from '@app/FilesContext';

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
    <div className={cn(className, 'file-finder-product')}>
      {product.images.length !== 0 && (
        <img
          className="file-finder-product__img"
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
      <p className="file-finder-product__title">{product.name}</p>
      {gameFile && (
        <Button
          icon="mdi/download"
          size="small"
          onClick={() => setShowModal(true)}
          className="file-finder-product__download"
          disabled={alreadyInstalled}
        >
          {alreadyInstalled ? 'Installed' : 'Download'}
        </Button>
      )}
    </div>
  );
};

export default FileFinderProduct;
