import React from 'react';

import { Button, Notification } from '@theme';
import { DirHandleI } from '../@types/nativeFileSystemAPI';

const DirectoryPicker = ({
  setDirHandle,
}: {
  setDirHandle: (handle: DirHandleI) => void;
}) => {
  const [pendig, setPending] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  return (
    <div>
      {error && <Notification>{error}</Notification>}
      <Button
        onClick={async () => {
          const handle = await window.showDirectoryPicker();
          setDirHandle(handle);
        }}
        disabled={pendig}
      >
        select pen
      </Button>
    </div>
  );
};

export default DirectoryPicker;
