import React from 'react';
import { Button, ContentModal, ButtonGroup } from '@theme';
import { writeFile } from '@utils/fileSystem';
import { useDirHandle, usePenFiles } from '@app/FilesContext';
import { ProductI } from '@app/database';
import styles from './FileFinderInstall.css';

const FileFinderInstall = ({
  onClose,
  product,
}: {
  onClose: () => void;
  product: ProductI;
}) => {
  const [dirHandle] = useDirHandle();
  const { reloadFiles } = usePenFiles();
  const [pending, setPending] = React.useState<boolean>(false);
  const [done, setDone] = React.useState<boolean>(false);
  const [downloaded, setDownloaded] = React.useState<string>('');

  const gameFile = React.useMemo(
    () => (product.gameFiles.length >= 1 ? product.gameFiles[0] : null),
    [product.gameFiles]
  );

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

  const downloadFile = () => {
    setPending(true);
    fetch(`https://cors.nico.dev/?url=${encodeURI(gameFile.url)}&mode=native`)
      .then(res => res.toString())
      .then(str => setDownloaded(str))
      .catch(e => {
        console.error(e);
        alert('File could not be downloaded');
      })
      .finally(() => setPending(false));
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
              <Button
                onClick={() => write()}
                icon="mdi/save"
                loading={pending}
                disabled={downloaded === ''}
              >
                Install
              </Button>
            </ButtonGroup>
          </React.Fragment>
        )}
      </div>
    </ContentModal>
  );
};

export default FileFinderInstall;
