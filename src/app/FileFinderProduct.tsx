import React from 'react';
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
              layout="ghost"
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
              layout="ghost"
              onClick={() => {
                setPending(true);
                fetch(gameFile.url).then((res) =>
                  res.text().then((fileString) => {
                    setPending(false);
                    setDownloaded(fileString);
                  })
                );
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
