import { Button, ButtonGroup, ContentModal, Tooltip } from '@theme';
import React from 'react';

import { useDirHandle, usePenFiles } from '@app/FilesContext.tsx';
import { ProductI } from '@app/catalog/types.ts';
import { useGmeFileStore } from '@app/storage/StorageContext.tsx';

import { API_BASE } from '@utils/api/constants.ts';
import { writeFile } from '@utils/fileSystem.ts';
import { blobToString } from '@utils/functions.ts';

import styles from './FileFinderInstall.module.css';

const FileFinderInstall: React.FC<{
  onClose: () => void;
  product: ProductI;
}> = ({ onClose, product }) => {
  const [dirHandle] = useDirHandle();
  const { reloadFiles } = usePenFiles();
  const [pending, setPending] = React.useState<boolean>(false);
  const [done, setDone] = React.useState<boolean>(false);
  const [downloaded, setDownloaded] = React.useState<Blob>(null);
  const { setFile } = useGmeFileStore();
  const gameFile = React.useMemo(() => {
    const files = product.gameFiles.sort((a, b) =>
      a.version > b.version ? -1 : 1
    );
    return files.length >= 1 ? files[0] : null;
  }, [product.gameFiles]);
  const tooltipRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    gameFile?.url && !pending && downloadFile();
  }, [gameFile.url]);

  const write = () => {
    setPending(true);
    writeFile(dirHandle, gameFile.fileName, downloaded)
      .then(() => {
        setDone(true);
        reloadFiles();
      })
      .catch(() =>
        alert('something went wrong. Please close the modal and try again')
      )
      .finally(() => setPending(false));
  };

  const downloadFile = async () => {
    setPending(true);
    try {
      const res = await fetch(
        `${API_BASE}api/getFile.php?url=${encodeURI(gameFile.url)}`
      );
      const blob = await res.blob();
      const text = await blobToString(blob);
      await setFile(product.id, {
        name: product.name,
        images: product.images,
        audioFile: {
          fileName: gameFile.fileName,
          fileContent: text,
          url: gameFile.url,
          version: gameFile.version,
        },
      });
      setDownloaded(blob);
    } catch (e) {
      console.log(e);
      alert('File could not be downloaded');
    }
    setPending(false);
  };

  return (
    <ContentModal
      title="Install"
      onClose={onClose}
      full={false}
      preventClose={pending}
    >
      <div className={styles.root}>
        {done ? (
          <p>
            The audio file has been installed successfully. You can now close
            the app and disconnect the pen.
          </p>
        ) : (
          <React.Fragment>
            <p>
              Please wait a minute so we can download and prepare the file.
              After that you will be abe to install it.
            </p>
            <ButtonGroup align="center">
              {!dirHandle && (
                <Tooltip tooltipRef={tooltipRef} maxWidth={300}>
                  Please connect your pen to install files.
                </Tooltip>
              )}
              <span
                ref={tooltipRef}
                style={{ display: 'inline-block', marginBottom: '1rem' }}
              >
                <Button
                  onClick={() => write()}
                  icon="save"
                  loading={pending}
                  disabled={!Boolean(downloaded) || !Boolean(dirHandle)}
                >
                  Install
                </Button>
              </span>
            </ButtonGroup>
          </React.Fragment>
        )}
      </div>
    </ContentModal>
  );
};

export default FileFinderInstall;
