import React from 'react';
import { Button, ContentModal, Loader } from '@theme';
import { ProductI } from '@app/database';
import { writeFile } from '@utils/fileSystem';
import axios from 'axios';

const FileFinderProductInstallModal = ({
  onClose,
  product,
  dirHandle,
}: {
  onClose: () => void;
  product: ProductI;
  dirHandle: FileSystemDirectoryHandle;
}) => {
  const [pending, setPending] = React.useState<boolean>(false);
  const [downloaded, setDownloaded] = React.useState<string>('');
  const [progress, setProgress] = React.useState<number>(0);
  const [progressTotal, setProgressTotal] = React.useState<number>(0);

  const gameFile = React.useMemo(
    () => (product.gameFiles.length >= 1 ? product.gameFiles[0] : null),
    [product.gameFiles]
  );

  React.useEffect(() => {
    gameFile?.url && progress === 0 && downloadFile();
  }, [gameFile.url]);

  const write = () => writeFile(dirHandle, gameFile.fileName, downloaded);

  const downloadFile = () => {
    setPending(true);
    axios
      .get(
        `https://cors.nico.dev/?url=${encodeURI(gameFile.url)}&mode=native`,
        {
          onDownloadProgress: (p) => {
            setProgress(p.loaded);
            setProgressTotal(p.total);
          },
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
  };

  return (
    <ContentModal
      title="Install"
      onClose={onClose}
      full={false}
      preventClose={true}
    >
      <div className="install-modal">
        {!downloaded ? (
          <React.Fragment>
            <p>Download is in progress.</p>
            {progressTotal === 0 ? <Loader /> : <p>Bar</p>}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p>File downloaded. You can now install the file.</p>
            <Button onClick={() => write()} icon="mdi/save">
              Install
            </Button>
          </React.Fragment>
        )}
      </div>
    </ContentModal>
  );
};

export default FileFinderProductInstallModal;
