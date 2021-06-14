import React from 'react';
import ReactDOM from 'react-dom';

import DirectoryPicker from '@app/DirectoryPicker';
import FileFinder from '@app/FileFinder';
import Pen from '@app/Pen';
import Header from '@app/Header';
import { FilesContextProvider, useDirHandle } from '@app/FilesContext';

import './App.css';

const AppElement = document.querySelector(`#app`);

const App = () => {
  const [dirHandle] = useDirHandle();
  return (
    <article className="app">
      <Header className="app__header" />
      <main className="app__main">
        {!dirHandle ? (
          <DirectoryPicker />
        ) : (
          <React.Fragment>
            <Pen className="app__pen" />
            <FileFinder className="app__filefinder" />
          </React.Fragment>
        )}
      </main>
    </article>
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
  ReactDOM.render(
    <FilesContextProvider>
      <App />
    </FilesContextProvider>,
    AppElement
  );
}
