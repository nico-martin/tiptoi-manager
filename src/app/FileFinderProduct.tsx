import React from 'react';
import axios from 'axios';

import cn from '@utils/classnames';
import { ProductI } from '@app/database';
import { Button } from '@theme';
import { writeFile } from '@utils/fileSystem';

const FileFinderProduct = ({
  className = '',
  product,
  dirHandle,
}: {
  className?: string;
  product: ProductI;
  dirHandle: FileSystemDirectoryHandle;
}) => {
  const [pending, setPending] = React.useState<boolean>(false);
  const [downloaded, setDownloaded] = React.useState<string>('');

  const gameFile = React.useMemo(
    () => (product.gameFiles.length >= 1 ? product.gameFiles[0] : null),
    [product.gameFiles]
  );

  return (
    <div className={cn(className)}>
      {product.images.length !== 0 && <img src={product.images[0].url} />}
      <p>{product.name}</p>
      {gameFile && (
        <React.Fragment>
          <p>{gameFile.fileName}</p>
          {downloaded ? (
            <Button
              onClick={() => {
                writeFile(dirHandle, gameFile.fileName, downloaded);
              }}
              disabled={pending}
              loading={pending}
            >
              install
            </Button>
          ) : (
            <Button
              onClick={() => {
                setPending(true);
                axios
                  .get(
                    `https://cors.nico.dev/?url=${encodeURI(
                      gameFile.url
                    )}&mode=native`,
                    {
                      onDownloadProgress: (p) => console.log(p),
                    }
                  )
                  .then((str) => {
                    setDownloaded(str.data);
                    setPending(false);
                  })
                  .catch((e) => {
                    console.error(e);
                    alert('File could not be downloaded');
                  })
                  .finally(() => setPending(false));
              }}
              disabled={pending}
              loading={pending}
            >
              download
            </Button>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default FileFinderProduct;
