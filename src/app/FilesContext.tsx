import React from 'react';

import { getDirectoryEntries } from '@utils/fileSystem';

interface ContextI {
  files: Array<FileSystemFileHandle>;
  setFiles: (files: Array<FileSystemFileHandle>) => void;
  dirHandle: FileSystemDirectoryHandle;
  setDirHandle: (handle: FileSystemDirectoryHandle) => void;
}

const FilesContext = React.createContext<ContextI>({
  files: [],
  setFiles: () => {},
  dirHandle: null,
  setDirHandle: () => {},
});

export const FilesContextProvider = ({ children }: { children?: any }) => {
  const [dirHandle, setDirHandle] =
    React.useState<FileSystemDirectoryHandle>(null);
  const [files, setFiles] = React.useState<Array<FileSystemFileHandle>>([]);
  return (
    <FilesContext.Provider
      value={{
        files,
        setFiles,
        dirHandle,
        setDirHandle,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export const usePenFiles = (): {
  files: Array<FileSystemFileHandle>;
  reloadFiles: () => void;
} => {
  const { files, setFiles, dirHandle } = React.useContext(FilesContext);
  return {
    files,
    reloadFiles: () => {
      dirHandle &&
        getDirectoryEntries(dirHandle).then((entries) => {
          const gmeFiles = entries.filter(
            (entry) =>
              entry.kind === 'file' &&
              entry.name.split('.').pop() === 'gme' &&
              entry.name !== 'Stickerbogen_Starterset.gme' &&
              entry.name !== 'Schnellstart-Anleitung.gme'
          ) as Array<FileSystemFileHandle>;
          setFiles(gmeFiles);
        });
    },
  };
};

export const useDirHandle = (): [
  FileSystemDirectoryHandle,
  (handle: FileSystemDirectoryHandle) => void
] => {
  const { dirHandle, setDirHandle } = React.useContext(FilesContext);
  return [dirHandle, setDirHandle];
};
