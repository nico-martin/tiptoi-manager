import { h, render, Fragment } from 'preact';
import { useEffect, useState, useMemo } from 'preact/hooks';
import DirectoryPicker from '@app/DirectoryPicker';
import FileFinder from '@app/FileFinder';
import Pen from '@app/Pen';
import './App.css';

const AppElement = document.querySelector(`#app`);

const App = () => {
  const [dirHandle, setDirHandle] = useState<any>(null);
  const [files, setFiles] = useState<Array<any>>([]);

  return (
    <div className="app">
      {!dirHandle ? (
        <DirectoryPicker setDirHandle={setDirHandle} />
      ) : (
        <div>
          qwertz
          <Pen />
          <FileFinder />
        </div>
      )}
    </div>
  );

  /*

  const getDirHandle = async () => {
    if (dirHandle) {
      return dirHandle;
    }

    const handle = await window.showDirectoryPicker();
    setDirHandle(handle);
    return handle;
  };

  const selectFolder = async () => {
    try {
      const dirHandle = await getDirHandle();
      console.log(typeof ['test']);
      console.log(typeof dirHandle.values());
      //const values = await dirHandle.values();
      for await (const entry of dirHandle.values()) {
        console.log(entry.kind, entry.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const writeFile = async () => {
    const directoryHandle = await getDirHandle();

    const newFileHandle = await directoryHandle.getFileHandle('My Notes.txt', {
      create: true,
    });
  };

  return (
    <div>
      <Button onClick={selectFolder}>connect pen</Button>
      <Button onClick={writeFile}>save file</Button>
    </div>
  );*/
};

if (AppElement) {
  render(<App />, AppElement);
}
