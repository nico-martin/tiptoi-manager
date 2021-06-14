import React from 'react';

import cn from '@utils/classnames';
import { ProductI } from '@app/database';
import { Button } from '@theme';
import FileFinderInstall from '@app/FileFinderInstall';

import './FileFinderProduct.css';

const FileFinderProduct = ({
  className = '',
  product,
}: {
  className?: string;
  product: ProductI;
}) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const gameFile = React.useMemo(
    () => (product.gameFiles.length >= 1 ? product.gameFiles[0] : null),
    [product.gameFiles]
  );

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
        >
          Download
        </Button>
      )}
    </div>
  );
};

export default FileFinderProduct;
